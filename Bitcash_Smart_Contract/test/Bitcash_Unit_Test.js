const Bitcash = artifacts.require("Bitcash.sol");
const IUniswapV2Router02 = artifacts.require("IUniswapV2Router02.sol");
const IERC20 = artifacts.require("IERC20.sol");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const MAX_SUPPLY = 800000000000;

contract("Bitcash Unit Test", (accounts) => {
  let bitcash;
  let uniswapPair;
  let owner;
  let routerAddress;
  let iUniswapV2Router02;
  let LAWContract;
  let MISTContract;
  let WBCHContract;
  let teamWallet;
  let masterWallet;

  beforeEach(async () => {
    routerAddress = "0x5d0bF8d8c8b054080E2131D8b260a5c6959411B8";
    teamWallet = "0xd3484298560C2dC216ab9A3d95c472c739a4170F";
    masterWallet = "0xe121Ecd9C7b1c2e40cC16595e36782A8afD088E4";
    bitcash = await Bitcash.new();
    owner = await bitcash.owner();
    iUniswapV2Router02 = new IUniswapV2Router02(routerAddress);
    uniV2Contract = new IERC20(await bitcash.uniswapV2Pair.call());
    LAWContract = new IERC20("0x0b00366fBF7037E9d75E4A569ab27dAB84759302");
    MISTContract = new IERC20("0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129");
    WBCHContract = new IERC20("0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04");
  });

  it("Test Basic Function", async () => {
    await bitcash.updateAutoPop(false);
    let [owner, name, symbol, totalSupply, ownerBalance] = await Promise.all([
      bitcash.owner(),
      bitcash.name(),
      bitcash.symbol(),
      bitcash.totalSupply(),
      bitcash.balanceOf(accounts[0]),
    ]);

    assert(owner === accounts[0]);
    assert(bitcash.address !== "");
    assert(name === "Bitca$h");
    assert(symbol === "XCA$H");
    assert(totalSupply == web3.utils.toWei(MAX_SUPPLY.toString(), "ether"));
    assert(ownerBalance == web3.utils.toWei(MAX_SUPPLY.toString(), "ether"));
  });

  it("Test Allowance Functions", async () => {
    await bitcash.updateAutoPop(false);
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
    await bitcash.updateAutoPop(false);
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
    await bitcash.updateAutoPop(false);
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
    await bitcash.updateAutoPop(false);
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: masterWallet,
      value: web3.utils.toWei("1", "ether"),
    });
    await bitcash.transfer(accounts[2], web3.utils.toWei("10000", "ether"));

    await bitcash.freezeMultipleAccount([accounts[2]], true, {
      from: masterWallet,
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
      from: masterWallet,
    });

    await bitcash.transfer(accounts[3], web3.utils.toWei("5000", "ether"), {
      from: accounts[2],
    });

    assert(
      (await bitcash.balanceOf(accounts[3])) ==
        web3.utils.toWei("4500", "ether")
    );

    await bitcash.freezeMultipleAccount([accounts[2]], true, {
      from: masterWallet,
    });

    assert(
      (await bitcash.balanceOf(accounts[2])) ==
        web3.utils.toWei("5000", "ether")
    );

    await bitcash.withdrawAllFundsFromFrozenAccount(accounts[2], {
      from: masterWallet,
    });

    assert(
      (await bitcash.balanceOf(accounts[2])) == web3.utils.toWei("0", "ether")
    );

    assert(
      (await bitcash.balanceOf(await bitcash.owner())) ==
        web3.utils.toWei((MAX_SUPPLY - 5000).toString(), "ether")
    );
  });

  it("Test Fee Collection", async () => {
    await bitcash.updateAutoPop(false);
    await bitcash.setSwapAndLiquifyEnabled(false);

    let [
      initialTotalSupply,
      ,
      ,
      ,
      totalSupplyAfter1Tx,
      txFeeAfter1Tx,
      reflectionFeeAfter1Tx,
      liquidityAfter1Tx,
      burnFeeAfter1Tx,
      ,
      totalSupplyAfter2Tx,
      txFeeAfter2Tx,
      reflectionFeeAfter2Tx,
      liquidityAfter2Tx,
      burnFeeAfter2Tx,
      account1Balance,
      account2Balance,
    ] = await Promise.all([
      bitcash.totalSupply(),
      await bitcash.transfer(accounts[1], web3.utils.toWei("100000", "ether")),
      await bitcash.transfer(accounts[2], web3.utils.toWei("100000", "ether")),
      await bitcash.transfer(accounts[1], web3.utils.toWei("50000", "ether"), {
        from: accounts[2],
      }),
      bitcash.totalSupply(),
      bitcash.txFeeAccumulated.call(),
      bitcash.reflectionFeeAccumulated.call(),
      bitcash.liquidityFeeAccumulated.call(),
      bitcash.totalBurntFee.call(),
      await bitcash.transfer(accounts[2], web3.utils.toWei("25000", "ether"), {
        from: accounts[1],
      }),
      bitcash.totalSupply(),
      bitcash.txFeeAccumulated.call(),
      bitcash.reflectionFeeAccumulated.call(),
      bitcash.liquidityFeeAccumulated.call(),
      bitcash.totalBurntFee.call(),
      await bitcash.balanceOf(accounts[1]),
      await bitcash.balanceOf(accounts[2]),
    ]);

    assert(
      web3.utils.fromWei(initialTotalSupply.toString(), "ether") == MAX_SUPPLY
    );

    assert(web3.utils.fromWei(txFeeAfter1Tx.toString(), "ether") == 500);
    assert(
      web3.utils.fromWei(reflectionFeeAfter1Tx.toString(), "ether") == 1500
    );
    assert(web3.utils.fromWei(liquidityAfter1Tx.toString(), "ether") == 500);
    assert(web3.utils.fromWei(burnFeeAfter1Tx.toString(), "ether") == 2500);

    assert(
      web3.utils.fromWei(totalSupplyAfter1Tx.toString(), "ether") ==
        MAX_SUPPLY - 2500
    );

    assert(web3.utils.fromWei(txFeeAfter2Tx.toString(), "ether") == 750);
    assert(
      web3.utils.fromWei(reflectionFeeAfter2Tx.toString(), "ether") == 2250
    );
    assert(web3.utils.fromWei(liquidityAfter2Tx.toString(), "ether") == 750);
    assert(web3.utils.fromWei(burnFeeAfter2Tx.toString(), "ether") == 3750);

    assert(
      web3.utils.fromWei(totalSupplyAfter2Tx.toString(), "ether") ==
        MAX_SUPPLY - 3750
    );

    assert(web3.utils.fromWei(account1Balance, "ether") == 120000);
    assert(web3.utils.fromWei(account2Balance, "ether") == 72500);
  });

  // it("Test Auto Balance Supply", async () => {
  // await bitcash.updateAutoPop(false)
  //   await bitcash.setSwapAndLiquifyEnabled(false);

  //   let [initialSupply, , , , , , lastSupply, tokenBurnt, tokenMinted] =
  //     await Promise.all([
  //       bitcash.totalSupply(),
  //       await bitcash.transfer(
  //         accounts[1],
  //         web3.utils.toWei("100000", "ether")
  //       ),
  //       await bitcash.transfer(
  //         accounts[2],
  //         web3.utils.toWei("100000", "ether")
  //       ),
  //       await bitcash.transfer(
  //         accounts[1],
  //         web3.utils.toWei("50000", "ether"),
  //         {
  //           from: accounts[2],
  //         }
  //       ),
  //       await bitcash.changeSupply(web3.utils.toWei("7000000000", "ether")),
  //       await bitcash.transfer(
  //         accounts[2],
  //         web3.utils.toWei("25000", "ether"),
  //         {
  //           from: accounts[1],
  //         }
  //       ),
  //       await bitcash.totalSupply(),
  //       await bitcash.totalBurntFee.call(),
  //       await bitcash.totalTokenMinted.call(),
  //     ]);

  //   assert(web3.utils.fromWei(initialSupply, "ether") == MAX_SUPPLY);
  //   assert(web3.utils.fromWei(lastSupply, "ether") == 8000000000);
  //   assert(web3.utils.fromWei(tokenMinted, "ether") == 1000000000);
  //   assert(web3.utils.fromWei(tokenBurnt, "ether") == 2500);
  // });

  it("Test Multiple small transfer amount", async () => {
    await bitcash.updateAutoPop(false);
    await bitcash.transfer(accounts[1], web3.utils.toWei("10000000", "ether"));

    let txFee = 0;
    let reflectionFee = 0;
    let liquidityFee = 0;
    let burnFee = 0;

    for (let i = 1; i < 20; i++) {
      await bitcash.transfer(
        accounts[2],
        web3.utils.toWei(i.toString(), "ether"),
        { from: accounts[1] }
      );

      txFee = txFee + i * 0.01;
      reflectionFee = reflectionFee + i * 0.03;
      liquidityFee = liquidityFee + i * 0.01;
      burnFee = burnFee + i * 0.05;
    }

    let [totalTxFee, totalReflectionFee, totalLiquidityFee, totalBurntFee] =
      await Promise.all([
        bitcash.txFeeAccumulated.call(),
        bitcash.reflectionFeeAccumulated.call(),
        bitcash.liquidityFeeAccumulated.call(),
        bitcash.totalBurntFee.call(),
      ]);

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
    assert(
      web3.utils.fromWei(totalBurntFee, "ether") ==
        Math.round(burnFee * 10) / 10
    );
  });

  it("Test Reflection Rewards", async () => {
    await bitcash.updateAutoPop(false);
    await bitcash.setSwapAndLiquifyEnabled(true);

    // await bitcash.setWorldPopulationContract(
    //   // prettier-ignore
    //   0x5547908107434AD6b5e5396A719d92e2199462d6
    // );

    await bitcash.transfer(
      accounts[1],
      web3.utils.toWei("1000000000", "ether")
    );

    await bitcash.approve(
      routerAddress,
      web3.utils.toWei("1000000010", "ether")
    );

    console.log(
      "Before LP UniV2 Balance: " +
        web3.utils.fromWei(
          (await uniV2Contract.balanceOf(accounts[0])).toString(),
          "ether"
        )
    );

    await iUniswapV2Router02.addLiquidityETH(
      bitcash.address,
      web3.utils.toWei("1000000000", "ether"),
      0,
      0,
      await bitcash.owner(),
      Date.now(),
      {
        value: web3.utils.toWei("100", "ether"),
      }
    );

    console.log(
      "Before Tx UniV2 Balance: " +
        web3.utils.fromWei(
          (await uniV2Contract.balanceOf(accounts[0])).toString(),
          "ether"
        )
    );

    await bitcash.transfer(accounts[2], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[3], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[4], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[5], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[6], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[7], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[8], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await bitcash.transfer(accounts[9], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });

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
      "Total WBNB Dividend Distributed: " +
        web3.utils.fromWei(dividends[0], "ether") +
        "\n" +
        "Total BTCB Dividend Distributed: " +
        web3.utils.fromWei(dividends[1], "ether") +
        "\n" +
        "Total ETHB Dividend Distributed: " +
        web3.utils.fromWei(dividends[2], "ether") +
        "\n"
    );

    console.log(
      "\nBalance Of account 1: \n" +
        web3.utils.fromWei(await bitcash.balanceOf(accounts[1]), "ether") +
        " Bitcash\n" +
        web3.utils.fromWei(await LAWContract.balanceOf(accounts[1]), "ether") +
        " LAW\n" +
        web3.utils.fromWei(await MISTContract.balanceOf(accounts[1]), "ether") +
        " MIST\n" +
        web3.utils.fromWei(await web3.eth.getBalance(accounts[1]), "ether") +
        " WBCH\n"
    );

    console.log(
      "\nTeam Wallet Balance: " +
        web3.utils.fromWei(await web3.eth.getBalance(teamWallet), "ether") +
        "WBCH"
    );
  });

  it("Test updateWorldPopulation function", async () => {
    let [, beforeOxyPrice, , afterOxyPrice] = await Promise.all([
      await bitcash.updateAutoPop(false),
      bitcash.worldPopulation.call(),
      await bitcash.updateWorldPopulation(
        web3.utils.toWei("100000000", "ether")
      ),
      bitcash.worldPopulation.call(),
    ]);

    assert(web3.utils.fromWei(beforeOxyPrice, "ether") == 8000000000);
    assert(web3.utils.fromWei(afterOxyPrice, "ether") == 100000000);

    try {
      await bitcash.updateWorldPopulation(
        web3.utils.toWei("100000000", "ether")
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    try {
      await bitcash.updateWorldPopulation(web3.utils.toWei("-1", "ether"));
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  });
});
