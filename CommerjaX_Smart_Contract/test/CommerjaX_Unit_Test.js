const CommerjaX = artifacts.require("CommerjaX.sol");
const IUniswapV2Router02 = artifacts.require("IUniswapV2Router02.sol");
const IERC20 = artifacts.require("IERC20.sol");

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const MAX_SUPPLY = 800000000000;

contract("CommerjaX Unit Test", (accounts) => {
  let commerjaX;
  let uniswapPair;
  let owner;
  let routerAddress;
  let iUniswapV2Router02;
  let WBNBContract;
  let BTCBContract;
  let ETHBContract;
  let teamWallet;
  let masterWallet;
  let teamWalletWBCHContract;

  beforeEach(async () => {
    routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    teamWallet = "0xd3484298560C2dC216ab9A3d95c472c739a4170F";
    masterWallet = "0xe121Ecd9C7b1c2e40cC16595e36782A8afD088E4";
    commerjaX = await CommerjaX.new();
    owner = await commerjaX.owner();
    iUniswapV2Router02 = new IUniswapV2Router02(routerAddress);
    uniV2Contract = new IERC20(await commerjaX.uniswapV2Pair.call());
    WBNBContract = new IERC20("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");
    BTCBContract = new IERC20("0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c");
    ETHBContract = new IERC20("0x2170Ed0880ac9A755fd29B2688956BD959F933F8");
    teamWalletWBCHContract = new IERC20(
      "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf"
    );
  });

  it("Test Basic Function", async () => {
    await commerjaX.updateAutoPop(false);
    let [owner, name, symbol, totalSupply, ownerBalance] = await Promise.all([
      commerjaX.owner(),
      commerjaX.name(),
      commerjaX.symbol(),
      commerjaX.totalSupply(),
      commerjaX.balanceOf(accounts[0]),
    ]);

    assert(owner === accounts[0]);
    assert(commerjaX.address !== "");
    assert(name === "Commerja-X");
    assert(symbol === "X$WAPP");
    assert(totalSupply == web3.utils.toWei(MAX_SUPPLY.toString(), "ether"));
    assert(ownerBalance == web3.utils.toWei(MAX_SUPPLY.toString(), "ether"));
  });

  it("Test Allowance Functions", async () => {
    await commerjaX.updateAutoPop(false);
    let [
      allowanceBeforeApproval,
      ,
      allowanceAfterApproval,
      ,
      allowanceAfterIncrease,
      ,
      allowanceAfterDecrease,
    ] = await Promise.all([
      commerjaX.allowance(accounts[0], accounts[1]),
      await commerjaX.approve(accounts[1], web3.utils.toWei("10000", "ether")),
      commerjaX.allowance(accounts[0], accounts[1]),
      await commerjaX.increaseAllowance(
        accounts[1],
        web3.utils.toWei("1000", "ether")
      ),
      commerjaX.allowance(accounts[0], accounts[1]),
      await commerjaX.decreaseAllowance(
        accounts[1],
        web3.utils.toWei("5000", "ether")
      ),
      commerjaX.allowance(accounts[0], accounts[1]),
    ]);

    assert(web3.utils.fromWei(allowanceBeforeApproval, "ether") == 0);
    assert(web3.utils.fromWei(allowanceAfterApproval, "ether") == 10000);
    assert(web3.utils.fromWei(allowanceAfterIncrease, "ether") == 11000);
    assert(web3.utils.fromWei(allowanceAfterDecrease, "ether") == 6000);
  });

  it("Test Transfer Function", async () => {
    await commerjaX.updateAutoPop(false);
    let [initialOwnerBalance, , ownerBalanceAfterTransfer, account1Balance] =
      await Promise.all([
        commerjaX.balanceOf(accounts[0]),
        await commerjaX.transfer(
          accounts[1],
          web3.utils.toWei("10000", "ether")
        ),
        commerjaX.balanceOf(accounts[0]),
        commerjaX.balanceOf(accounts[1]),
      ]);

    try {
      await commerjaX.transfer(
        accounts[2],
        web3.utils.toWei("10000", "ether"),
        {
          from: accounts[3],
        }
      );
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
    await commerjaX.updateAutoPop(false);
    try {
      await commerjaX.TransferFrom(
        accounts[0],
        accounts[2],
        web3.utils.toWei("10000", "ether"),
        { from: accounts[1] }
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    await commerjaX.approve(accounts[1], web3.utils.toWei("10000", "ether"));

    try {
      await commerjaX.TransferFrom(
        accounts[0],
        accounts[2],
        web3.utils.toWei("100000", "ether"),
        { from: accounts[1] }
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    await commerjaX.transferFrom(
      accounts[0],
      accounts[2],
      web3.utils.toWei("9000", "ether"),
      { from: accounts[1] }
    );

    assert(
      web3.utils.fromWei(await commerjaX.balanceOf(accounts[2]), "ether") ==
        9000
    );
  });

  it("Test Freeze Account Feature", async () => {
    await commerjaX.updateAutoPop(false);
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: masterWallet,
      value: web3.utils.toWei("1", "ether"),
    });
    await commerjaX.transfer(accounts[2], web3.utils.toWei("10000", "ether"));

    await commerjaX.freezeMultipleAccount([accounts[2]], true, {
      from: masterWallet,
    });

    try {
      await commerjaX.transfer(accounts[3], web3.utils.toWei("5000", "ether"), {
        from: accounts[2],
      });
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    await commerjaX.freezeMultipleAccount([accounts[2]], false, {
      from: masterWallet,
    });

    await commerjaX.transfer(accounts[3], web3.utils.toWei("5000", "ether"), {
      from: accounts[2],
    });

    assert(
      (await commerjaX.balanceOf(accounts[3])) ==
        web3.utils.toWei("4500", "ether")
    );

    await commerjaX.freezeMultipleAccount([accounts[2]], true, {
      from: masterWallet,
    });

    assert(
      (await commerjaX.balanceOf(accounts[2])) ==
        web3.utils.toWei("5000", "ether")
    );

    await commerjaX.withdrawAllFundsFromFrozenAccount(accounts[2], {
      from: masterWallet,
    });

    assert(
      (await commerjaX.balanceOf(accounts[2])) == web3.utils.toWei("0", "ether")
    );

    assert(
      (await commerjaX.balanceOf(await commerjaX.owner())) ==
        web3.utils.toWei((MAX_SUPPLY - 5000).toString(), "ether")
    );
  });

  it("Test Fee Collection", async () => {
    await commerjaX.updateAutoPop(false);
    await commerjaX.setSwapAndLiquifyEnabled(false);

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
      commerjaX.totalSupply(),
      await commerjaX.transfer(
        accounts[1],
        web3.utils.toWei("100000", "ether")
      ),
      await commerjaX.transfer(
        accounts[2],
        web3.utils.toWei("100000", "ether")
      ),
      await commerjaX.transfer(
        accounts[1],
        web3.utils.toWei("50000", "ether"),
        {
          from: accounts[2],
        }
      ),
      commerjaX.totalSupply(),
      commerjaX.txFeeAccumulated.call(),
      commerjaX.reflectionFeeAccumulated.call(),
      commerjaX.liquidityFeeAccumulated.call(),
      commerjaX.totalBurntFee.call(),
      await commerjaX.transfer(
        accounts[2],
        web3.utils.toWei("25000", "ether"),
        {
          from: accounts[1],
        }
      ),
      commerjaX.totalSupply(),
      commerjaX.txFeeAccumulated.call(),
      commerjaX.reflectionFeeAccumulated.call(),
      commerjaX.liquidityFeeAccumulated.call(),
      commerjaX.totalBurntFee.call(),
      await commerjaX.balanceOf(accounts[1]),
      await commerjaX.balanceOf(accounts[2]),
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
  // await commerjaX.updateAutoPop(false)
  //   await commerjaX.setSwapAndLiquifyEnabled(false);

  //   let [initialSupply, , , , , , lastSupply, tokenBurnt, tokenMinted] =
  //     await Promise.all([
  //       commerjaX.totalSupply(),
  //       await commerjaX.transfer(
  //         accounts[1],
  //         web3.utils.toWei("100000", "ether")
  //       ),
  //       await commerjaX.transfer(
  //         accounts[2],
  //         web3.utils.toWei("100000", "ether")
  //       ),
  //       await commerjaX.transfer(
  //         accounts[1],
  //         web3.utils.toWei("50000", "ether"),
  //         {
  //           from: accounts[2],
  //         }
  //       ),
  //       await commerjaX.changeSupply(web3.utils.toWei("7000000000", "ether")),
  //       await commerjaX.transfer(
  //         accounts[2],
  //         web3.utils.toWei("25000", "ether"),
  //         {
  //           from: accounts[1],
  //         }
  //       ),
  //       await commerjaX.totalSupply(),
  //       await commerjaX.totalBurntFee.call(),
  //       await commerjaX.totalTokenMinted.call(),
  //     ]);

  //   assert(web3.utils.fromWei(initialSupply, "ether") == MAX_SUPPLY);
  //   assert(web3.utils.fromWei(lastSupply, "ether") == 8000000000);
  //   assert(web3.utils.fromWei(tokenMinted, "ether") == 1000000000);
  //   assert(web3.utils.fromWei(tokenBurnt, "ether") == 2500);
  // });

  it("Test Multiple small transfer amount", async () => {
    await commerjaX.updateAutoPop(false);
    await commerjaX.transfer(
      accounts[1],
      web3.utils.toWei("10000000", "ether")
    );

    let txFee = 0;
    let reflectionFee = 0;
    let liquidityFee = 0;
    let burnFee = 0;

    for (let i = 1; i < 20; i++) {
      await commerjaX.transfer(
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
        commerjaX.txFeeAccumulated.call(),
        commerjaX.reflectionFeeAccumulated.call(),
        commerjaX.liquidityFeeAccumulated.call(),
        commerjaX.totalBurntFee.call(),
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
    await commerjaX.updateAutoPop(false);
    await commerjaX.setSwapAndLiquifyEnabled(true);

    // await commerjaX.setWorldPopulationContract(
    //   // prettier-ignore
    //   0x5547908107434AD6b5e5396A719d92e2199462d6
    // );

    await commerjaX.transfer(
      accounts[1],
      web3.utils.toWei("1000000000", "ether")
    );

    await commerjaX.approve(
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
      commerjaX.address,
      web3.utils.toWei("1000000000", "ether"),
      0,
      0,
      await commerjaX.owner(),
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

    await commerjaX.transfer(accounts[2], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[3], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[4], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[5], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[6], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[7], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[8], web3.utils.toWei("60000", "ether"), {
      from: accounts[1],
    });
    await commerjaX.transfer(accounts[9], web3.utils.toWei("60000", "ether"), {
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
          (await commerjaX.txFeeAccumulated.call()).toString(),
          "ether"
        )
    );

    console.log(
      "Reflection Fee: " +
        web3.utils.fromWei(
          (await commerjaX.reflectionFeeAccumulated.call()).toString(),
          "ether"
        )
    );

    console.log(
      "Liquidity Fee: " +
        web3.utils.fromWei(
          (await commerjaX.liquidityFeeAccumulated.call()).toString(),
          "ether"
        )
    );

    let dividends = await commerjaX.getTotalDividendsDistributed();
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
        web3.utils.fromWei(await commerjaX.balanceOf(accounts[1]), "ether") +
        " CommerjaX\n" +
        web3.utils.fromWei(await WBNBContract.balanceOf(accounts[1]), "ether") +
        " WBNB\n" +
        web3.utils.fromWei(await BTCBContract.balanceOf(accounts[1]), "ether") +
        " BTCB\n" +
        web3.utils.fromWei(await ETHBContract.balanceOf(accounts[1]), "ether") +
        " ETHB\n"
    );

    console.log(
      "\nTeam Wallet Balance: " +
        web3.utils.fromWei(
          await teamWalletWBCHContract.balanceOf(teamWallet),
          "ether"
        ) +
        "BCH"
    );
  });

  it("Test updateWorldPopulation function", async () => {
    let [, beforeOxyPrice, , afterOxyPrice] = await Promise.all([
      await commerjaX.updateAutoPop(false),
      commerjaX.worldPopulation.call(),
      await commerjaX.updateWorldPopulation(
        web3.utils.toWei("100000000", "ether")
      ),
      commerjaX.worldPopulation.call(),
    ]);

    assert(web3.utils.fromWei(beforeOxyPrice, "ether") == 8000000000);
    assert(web3.utils.fromWei(afterOxyPrice, "ether") == 100000000);

    try {
      await commerjaX.updateWorldPopulation(
        web3.utils.toWei("100000000", "ether")
      );
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);

    try {
      await commerjaX.updateWorldPopulation(web3.utils.toWei("-1", "ether"));
    } catch (error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  });
});
