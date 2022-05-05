const Bitcash = artifacts.require("Bitcash.sol");
const IUniswapV2Router02 = artifacts.require("IUniswapV2Router02.sol");
const IERC20 = artifacts.require("IERC20.sol");
const timeMachine = require("ganache-time-traveler");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const MAX_SUPPLY = 8000000000;

contract("Bitcash Unit Test", (accounts) => {
  let bitcash;
  let uniswapPair;
  let owner;
  let routerAddress;
  let iUniswapV2Router02;
  let WBCHContract;
  let MISTContract;
  let LAWContract;

  beforeEach(async () => {
    routerAddress = "0x5d0bF8d8c8b054080E2131D8b260a5c6959411B8";
    bitcash = await Bitcash.new();
    owner = await bitcash.owner();
    iUniswapV2Router02 = new IUniswapV2Router02(routerAddress);
    uniV2Contract = new IERC20(await bitcash.uniswapV2Pair.call());
    WBCHContract = new IERC20("0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04");
    MISTContract = new IERC20("0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129");
    LAWContract = new IERC20("0x0b00366fBF7037E9d75E4A569ab27dAB84759302");
  });

  it("Test Basic Function", async () => {
    let [owner, name, symbol, totalSupply, ownerBalance] = await Promise.all([
      bitcash.owner(),
      bitcash.name(),
      bitcash.symbol(),
      bitcash.totalSupply(),
      bitcash.balanceOf(accounts[0]),
    ]);

    assert(owner === accounts[0]);
    assert(bitcash.address !== "");
    assert(name === "BitCash");
    assert(symbol === "BitCa$h");
    assert(totalSupply == web3.utils.toWei(MAX_SUPPLY.toString(), "ether"));
    assert(ownerBalance == web3.utils.toWei(MAX_SUPPLY.toString(), "ether"));
  });

  it("Test Allowance Functions", async () => {
    let [
      allowanceBeforeApproval,
      ,
      allowanceAfterApproval,
      ,
      allowanceAfterIncrease,
      ,
      allowanceAfterDecrease,
    ] = await Promise.all([
      bitcash.allowance(accounts[0], accounts[1]),
      await bitcash.approve(accounts[1], web3.utils.toWei("10000", "ether")),
      bitcash.allowance(accounts[0], accounts[1]),
      await bitcash.increaseAllowance(
        accounts[1],
        web3.utils.toWei("1000", "ether")
      ),
      bitcash.allowance(accounts[0], accounts[1]),
      await bitcash.decreaseAllowance(
        accounts[1],
        web3.utils.toWei("5000", "ether")
      ),
      bitcash.allowance(accounts[0], accounts[1]),
    ]);

    assert(web3.utils.fromWei(allowanceBeforeApproval, "ether") == 0);
    assert(web3.utils.fromWei(allowanceAfterApproval, "ether") == 10000);
    assert(web3.utils.fromWei(allowanceAfterIncrease, "ether") == 11000);
    assert(web3.utils.fromWei(allowanceAfterDecrease, "ether") == 6000);
  });

  it("Test Transfer Function", async () => {
    let [initialOwnerBalance, , ownerBalanceAfterTransfer, account1Balance] =
      await Promise.all([
        bitcash.balanceOf(accounts[0]),
        await bitcash.transfer(accounts[1], web3.utils.toWei("10000", "ether")),
        bitcash.balanceOf(accounts[0]),
        bitcash.balanceOf(accounts[1]),
      ]);

    try {
      await bitcash.transfer(accounts[2], web3.utils.toWei("10000", "ether"), {
        from: accounts[3],
      });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    assert(
      initialOwnerBalance == web3.utils.toWei(MAX_SUPPLY.toString(), "ether")
    );
    assert(
      ownerBalanceAfterTransfer ==
        web3.utils.toWei((MAX_SUPPLY - 10000).toString(), "ether")
    );
    assert(account1Balance == web3.utils.toWei("10000", "ether"));
  });

  it("Test TransferFrom Function", async () => {
    try {
      await bitcash.TransferFrom(
        accounts[0],
        accounts[2],
        web3.utils.toWei("10000", "ether"),
        { from: accounts[1] }
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    await bitcash.approve(accounts[1], web3.utils.toWei("10000", "ether"));

    try {
      await bitcash.TransferFrom(
        accounts[0],
        accounts[2],
        web3.utils.toWei("100000", "ether"),
        { from: accounts[1] }
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    await bitcash.transferFrom(
      accounts[0],
      accounts[2],
      web3.utils.toWei("9000", "ether"),
      { from: accounts[1] }
    );

    assert(
      web3.utils.fromWei(await bitcash.balanceOf(accounts[2]), "ether") == 9000
    );
  });

  it("Test Freeze Account Feature", async () => {
    await bitcash.transfer(accounts[2], web3.utils.toWei("10000", "ether"));

    await bitcash.freezeMultipleAccount([accounts[2]], true, {
      from: accounts[1],
    });

    try {
      await bitcash.transfer(accounts[3], web3.utils.toWei("5000", "ether"), {
        from: accounts[2],
      });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    await bitcash.freezeMultipleAccount([accounts[2]], false, {
      from: accounts[1],
    });

    await bitcash.transfer(accounts[3], web3.utils.toWei("5000", "ether"), {
      from: accounts[2],
    });

    assert(
      (await bitcash.balanceOf(accounts[3])) ==
        web3.utils.toWei("4750", "ether")
    );

    await bitcash.freezeMultipleAccount([accounts[2]], true, {
      from: accounts[1],
    });

    assert(
      (await bitcash.balanceOf(accounts[2])) ==
        web3.utils.toWei("5000", "ether")
    );

    await bitcash.withdrawAllFundsFromFrozenAccount(accounts[2]);

    assert(
      (await bitcash.balanceOf(accounts[2])) == web3.utils.toWei("0", "ether")
    );

    assert(
      (await bitcash.balanceOf(await bitcash.owner())) ==
        web3.utils.toWei((MAX_SUPPLY - 5000).toString(), "ether")
    );
  });

  it("Test Fee Collection", async () => {
    await bitcash.setSwapAndLiquifyEnabled(false);

    let [
      ,
      ,
      ,
      txFeeAfter1Tx,
      reflectionFeeAfter1Tx,
      liquidityAfter1Tx,
      ,
      txFeeAfter2Tx,
      reflectionFeeAfter2Tx,
      liquidityAfter2Tx,
      account1Balance,
      account2Balance,
    ] = await Promise.all([
      await bitcash.transfer(accounts[1], web3.utils.toWei("100000", "ether")),
      await bitcash.transfer(accounts[2], web3.utils.toWei("100000", "ether")),
      await bitcash.transfer(accounts[1], web3.utils.toWei("50000", "ether"), {
        from: accounts[2],
      }),
      bitcash.txFeeTotal.call(),
      bitcash.reflectionFeeTotal.call(),
      bitcash.liquidityFeeTotal.call(),
      await bitcash.transfer(accounts[2], web3.utils.toWei("25000", "ether"), {
        from: accounts[1],
      }),
      bitcash.txFeeTotal.call(),
      bitcash.reflectionFeeTotal.call(),
      bitcash.liquidityFeeTotal.call(),
      await bitcash.balanceOf(accounts[1]),
      await bitcash.balanceOf(accounts[2]),
    ]);

    assert(web3.utils.fromWei(txFeeAfter1Tx.toString(), "ether") == 500);
    assert(
      web3.utils.fromWei(reflectionFeeAfter1Tx.toString(), "ether") == 1500
    );
    assert(web3.utils.fromWei(liquidityAfter1Tx.toString(), "ether") == 500);

    assert(web3.utils.fromWei(txFeeAfter2Tx.toString(), "ether") == 750);
    assert(
      web3.utils.fromWei(reflectionFeeAfter2Tx.toString(), "ether") == 2250
    );
    assert(web3.utils.fromWei(liquidityAfter2Tx.toString(), "ether") == 750);

    assert(web3.utils.fromWei(account1Balance, "ether") == 122500);
    assert(web3.utils.fromWei(account2Balance, "ether") == 73750);
  });

  it("Test Multiple small transfer amount", async () => {
    await bitcash.transfer(accounts[1], web3.utils.toWei("10000000", "ether"));

    let txFee = 0;
    let reflectionFee = 0;
    let liquidityFee = 0;

    for (let i = 1; i < 20; i++) {
      await bitcash.transfer(
        accounts[2],
        web3.utils.toWei(i.toString(), "ether"),
        { from: accounts[1] }
      );

      txFee = txFee + i * 0.01;
      reflectionFee = reflectionFee + i * 0.03;
      liquidityFee = liquidityFee + i * 0.01;
    }

    let [totalTxFee, totalReflectionFee, totalLiquidityFee] = await Promise.all(
      [
        bitcash.txFeeTotal.call(),
        bitcash.reflectionFeeTotal.call(),
        bitcash.liquidityFeeTotal.call(),
      ]
    );

    assert(
      web3.utils.fromWei(totalTxFee, "ether") == Math.round(txFee * 10) / 10
    );
    assert(
      web3.utils.fromWei(totalReflectionFee, "ether") ==
        Math.round(reflectionFee * 10) / 10
    );
    assert(
      web3.utils.fromWei(totalLiquidityFee, "ether") ==
        Math.round(liquidityFee * 10) / 10
    );
  });

  it("Test Reflection Rewards", async () => {
    await bitcash.transfer(accounts[1], web3.utils.toWei("100000000", "ether"));
    await bitcash.setSwapAndLiquifyEnabled(true);

    await bitcash.approve(
      routerAddress,
      web3.utils.toWei("100000010", "ether")
    );

    console.log(
      "Before LP UniV2 Balance: " +
        web3.utils.fromWei(
          (await uniV2Contract.balanceOf(accounts[0])).toString(),
          "ether"
        )
    );

    console.log("Native Token Address:" + (await iUniswapV2Router02.WETH()));

    await iUniswapV2Router02.addLiquidityETH(
      bitcash.address,
      web3.utils.toWei("100000000", "ether"),
      0,
      0,
      await bitcash.owner(),
      Date.now(),
      {
        value: web3.utils.toWei("10", "ether"),
      }
    );

    console.log(
      "Before Tx UniV2 Balance: " +
        web3.utils.fromWei(
          (await uniV2Contract.balanceOf(accounts[0])).toString(),
          "ether"
        )
    );

    for (let i = 2; i < 10; i++) {
      await bitcash.transfer(accounts[i], web3.utils.toWei("60000", "ether"), {
        from: accounts[1],
      });
    }

    console.log(
      "After UniV2 Balance: " +
        web3.utils.fromWei(
          (await uniV2Contract.balanceOf(accounts[0])).toString(),
          "ether"
        )
    );

    console.log(
      "Tax:" +
        web3.utils.fromWei(
          (await bitcash.txFeeAccumulated.call()).toString(),
          "ether"
        )
    );

    console.log(
      "Reflection Fee: " +
        web3.utils.fromWei(
          (await bitcash.reflectionFeeAccumulated.call()).toString(),
          "ether"
        )
    );

    console.log(
      "Liquidity Fee: " +
        web3.utils.fromWei(
          (await bitcash.liquidityFeeAccumulated.call()).toString(),
          "ether"
        )
    );

    let dividends = await bitcash.getTotalDividendsDistributed();
    console.log(
      "Total WBCH Dividend Distributed: " +
        web3.utils.fromWei(dividends[0], "ether") +
        "\n" +
        "Total MIST Dividend Distributed: " +
        web3.utils.fromWei(dividends[1], "ether") +
        "\n" +
        "Total LAW Dividend Distributed: " +
        web3.utils.fromWei(dividends[2], "ether") +
        "\n"
    );

    console.log(
      "\nBalance Of account 1: \n" +
        web3.utils.fromWei(await bitcash.balanceOf(accounts[1]), "ether") +
        " Bitcash\n" +
        web3.utils.fromWei(
          await await web3.eth.getBalance(accounts[1]),
          "ether"
        ) +
        " WBCH\n" +
        web3.utils.fromWei(await MISTContract.balanceOf(accounts[1]), "ether") +
        " MIST\n" +
        web3.utils.fromWei(await LAWContract.balanceOf(accounts[1]), "ether") +
        " LAW\n"
    );

    console.log(
      "Contract BCH balance: " +
        web3.utils.fromWei(await web3.eth.getBalance(bitcash.address), "ether")
    );

    assert(
      (await bitcash.balanceOf(accounts[1])) ==
        web3.utils.toWei("99520000", "ether")
    );
  });

  it("Test updateOxygenPrice function", async () => {
    let [beforeOxyPrice, , afterOxyPrice] = await Promise.all([
      bitcash.oxygenPrice.call(),
      await bitcash.updateOxygenRate(web3.utils.toWei("10", "ether")),
      bitcash.oxygenPrice.call(),
    ]);

    assert(web3.utils.fromWei(beforeOxyPrice, "ether") == 0);
    assert(web3.utils.fromWei(afterOxyPrice, "ether") == 10);

    try {
      await bitcash.updateOxygenRate(web3.utils.toWei("10", "ether"));
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    try {
      await bitcash.updateOxygenRate(web3.utils.toWei("-1", "ether"));
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  });
});
