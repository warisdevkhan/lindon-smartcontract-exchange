// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LAWTracker.sol";
import "./MISTTracker.sol";
import "./WBCHTracker.sol";
import "./IterableMapping.sol";

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
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

/// @title Bitca$h
/// @author Akshay N A (CIS2459)

/* solium-disable-next-line */
contract Bitcash is Context, IERC20, Ownable {
    using SafeMath for uint256;
    using Address for address;

    // Account Variables
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) public _isFrozen;

    // Basic Variable Decleration
    uint256 private _totalSupply = 800000000000 * 10**18;
    string private _symbol = "XCA$H";
    string private _name = "Bitca$h";
    uint8 private _decimals = 18;

    mapping(address => bool) private _isExcludedFromFee;

    // Fee Variables (x% of respectice Fee will be deducted during transaction)
    uint8 public txFee = 1; // 1.5% is taken as bank Fee
    uint8 public reflectionFee = 3; // 3% is taken as Reflection Fee
    uint8 public liquidityFee = 1; // 0.5% is taken as Auto Liquidity Fee

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
        LAW,
        MIST,
        WBCH
    }

    LAWTracker public dividendTrackerLAW;
    MISTTracker public dividendTrackerMIST;
    WBCHTracker public dividendTrackerWBCH;

    address private LAW = address(0x0b00366fBF7037E9d75E4A569ab27dAB84759302);
    address private MIST = address(0x5fA664f69c2A4A3ec94FaC3cBf7049BD9CA73129);
    address private WBCH = address(0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04);

    address[] public reflectionTokensAddresses = [LAW, MIST, WBCH];

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

    event TakeFees(uint256 TxAmount, uint256 TotalFeeTaken);

    event UpdateDividendTracker(address newAddress, address oldAddress);

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
        dividendTrackerLAW = new LAWTracker();
        dividendTrackerMIST = new MISTTracker();
        dividendTrackerWBCH = new WBCHTracker();

        // mint token to owner
        _balances[_msgSender()] = _totalSupply;

        // Initiate Pairing with MistSwap
        IUniswapV2Router02 _uniswapRouter02 = IUniswapV2Router02(
            0x5d0bF8d8c8b054080E2131D8b260a5c6959411B8
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

        dividendTrackerLAW.excludeFromDividends(address(dividendTrackerLAW));
        dividendTrackerLAW.excludeFromDividends(address(this));
        dividendTrackerLAW.excludeFromDividends(address(0));
        dividendTrackerLAW.excludeFromDividends(owner());
        dividendTrackerLAW.excludeFromDividends(address(uniswapV2Router02));
        dividendTrackerLAW.excludeFromDividends(_masterWallet);
        dividendTrackerLAW.excludeFromDividends(_teamWallet);

        dividendTrackerMIST.excludeFromDividends(address(dividendTrackerMIST));
        dividendTrackerMIST.excludeFromDividends(address(this));
        dividendTrackerMIST.excludeFromDividends(address(0));
        dividendTrackerMIST.excludeFromDividends(owner());
        dividendTrackerMIST.excludeFromDividends(address(uniswapV2Router02));
        dividendTrackerMIST.excludeFromDividends(_masterWallet);
        dividendTrackerMIST.excludeFromDividends(_teamWallet);

        dividendTrackerWBCH.excludeFromDividends(address(dividendTrackerWBCH));
        dividendTrackerWBCH.excludeFromDividends(address(this));
        dividendTrackerWBCH.excludeFromDividends(address(0));
        dividendTrackerWBCH.excludeFromDividends(owner());
        dividendTrackerWBCH.excludeFromDividends(address(uniswapV2Router02));
        dividendTrackerWBCH.excludeFromDividends(_masterWallet);
        dividendTrackerWBCH.excludeFromDividends(_teamWallet);

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
        dividendTrackerMIST.excludeFromDividends(_masterWallet);
        dividendTrackerLAW.excludeFromDividends(_masterWallet);
        dividendTrackerWBCH.excludeFromDividends(_masterWallet);

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
        dividendTrackerMIST.excludeFromDividends(_teamWallet);
        dividendTrackerLAW.excludeFromDividends(_teamWallet);
        dividendTrackerWBCH.excludeFromDividends(_teamWallet);

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

    function updateGasForProcessing(uint256 newValue) public onlyOwner {
        require(
            newValue >= 200000 && newValue <= 500000,
            "BitcashTokens: gasForProcessing must be between 200,000 and 500,000"
        );
        require(
            newValue != gasForProcessing,
            "BitcashTokens: Cannot update gasForProcessing to same value"
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

    function setSwapAndLiquifyEnabled(bool enabled) external onlyOwner {
        swapAndLiquifyEnabled = enabled;
        emit SwapAndLiquifyEnabledUpdated(enabled);
    }

    function getTotalDividendsDistributed()
        external
        view
        returns (
            uint256 law,
            uint256 mist,
            uint256 wbch
        )
    {
        law = dividendTrackerLAW.totalDividendsDistributed();
        mist = dividendTrackerMIST.totalDividendsDistributed();
        wbch = dividendTrackerWBCH.totalDividendsDistributed();
    }

    function withdrawableividendOf(address account)
        public
        view
        returns (
            uint256 law,
            uint256 mist,
            uint256 wbch
        )
    {
        law = dividendTrackerLAW.withdrawableDividendOf(account);
        mist = dividendTrackerMIST.withdrawableDividendOf(account);
        wbch = dividendTrackerWBCH.withdrawableDividendOf(account);
    }

    function withdrawnDividendOf(address account)
        public
        view
        returns (
            uint256 law,
            uint256 mist,
            uint256 wbch
        )
    {
        law = dividendTrackerLAW.withdrawnDividendOf(account);
        mist = dividendTrackerMIST.withdrawnDividendOf(account);
        wbch = dividendTrackerWBCH.withdrawnDividendOf(account);
    }

    function excludeFromDividends(address account) external onlyOwner {
        dividendTrackerLAW.excludeFromDividends(account);
        dividendTrackerMIST.excludeFromDividends(account);
        dividendTrackerWBCH.excludeFromDividends(account);
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
        if (reflectionToken == ReflectionToken.LAW) {
            return dividendTrackerLAW.getAccount(account);
        } else if (reflectionToken == ReflectionToken.MIST) {
            return dividendTrackerMIST.getAccount(account);
        } else {
            return dividendTrackerWBCH.getAccount(account);
        }
    }

    function processDividendTracker(uint256 gas) external {
        (
            uint256 iterationsMIST,
            uint256 claimsMIST,
            uint256 lastProcessedIndexMIST
        ) = dividendTrackerMIST.process(gas);
        emit ProcessedDividendTracker(
            iterationsMIST,
            claimsMIST,
            lastProcessedIndexMIST,
            false,
            gas,
            msg.sender
        );

        (
            uint256 iterationsLAW,
            uint256 claimsLAW,
            uint256 lastProcessedIndexLAW
        ) = dividendTrackerLAW.process(gas);
        emit ProcessedDividendTracker(
            iterationsLAW,
            claimsLAW,
            lastProcessedIndexLAW,
            false,
            gas,
            msg.sender
        );

        (
            uint256 iterationsWBCH,
            uint256 claimsWBCH,
            uint256 lastProcessedIndexWBCH
        ) = dividendTrackerWBCH.process(gas);
        emit ProcessedDividendTracker(
            iterationsWBCH,
            claimsWBCH,
            lastProcessedIndexWBCH,
            false,
            gas,
            msg.sender
        );
    }

    function claim() external {
        dividendTrackerLAW.processAccount(payable(msg.sender), false);
        dividendTrackerMIST.processAccount(payable(msg.sender), false);
        dividendTrackerWBCH.processAccount(payable(msg.sender), false);
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
            "BitcashTokens:: approve from the zero address"
        );
        require(
            spender != address(0),
            "BitcashTokens:: approve to the zero address"
        );

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) private {
        require(from != address(0), "BitcashTokens: Cannot be zero address");
        require(to != address(0), "BitcashTokens: Cannot be zero address");
        require(amount > 0, " BitcashTokens: Amount cannot be zero");
        require(
            !_isFrozen[from] && !_isFrozen[to],
            "BitcashTokens: Frozen Account Detected"
        );

        bool takeFee = true;

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
            uint256 depositAmount = amount.sub(taxFee[0]).sub(taxFee[1]).sub(
                taxFee[2]
            );

            _balances[from] = _balances[from].sub(amount);
            _balances[to] = _balances[to].add(depositAmount);

            uint256 totalFees = taxFee[0].add(taxFee[1]).add(taxFee[2]);

            takeFees(taxFee[0], taxFee[1], taxFee[2]);
            emit TakeFees(amount, totalFees);
        } else {
            _balances[from] = _balances[from].sub(amount);
            _balances[to] = _balances[to].add(amount);
        }

        emit Transfer(from, to, amount);

        try
            dividendTrackerLAW.setBalance(payable(from), balanceOf(from))
        {} catch {}
        try
            dividendTrackerLAW.setBalance(payable(to), balanceOf(to))
        {} catch {}

        try
            dividendTrackerMIST.setBalance(payable(from), balanceOf(from))
        {} catch {}
        try
            dividendTrackerMIST.setBalance(payable(to), balanceOf(to))
        {} catch {}

        try
            dividendTrackerWBCH.setBalance(payable(from), balanceOf(from))
        {} catch {}
        try
            dividendTrackerWBCH.setBalance(payable(to), balanceOf(to))
        {} catch {}

        if (!_isSwapAndLiquify) {
            uint256 gas = gasForProcessing;

            try dividendTrackerLAW.process(gas) returns (
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

            try dividendTrackerMIST.process(gas) returns (
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

            try dividendTrackerWBCH.process(gas) returns (
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
        uint256 initialBalance = address(this).balance;

        _approve(address(this), address(uniswapV2Router02), tokenAmount);

        swapTokensForEth(tokenAmount);

        // How much ETH did the code just swapped
        uint256 newBalance = address(this).balance.sub(initialBalance);

        return payable(_teamWallet).send(newBalance);
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
        uint256 LAWTokens = tokens.div(reflectionTokensAddresses.length);
        uint256 MISTTokens = tokens.div(reflectionTokensAddresses.length);
        uint256 WBCHTokens = tokens.sub(LAWTokens).sub(MISTTokens);

        uint256 initialBalance = address(this).balance;

        // Swap tokens for ETH
        swapTokensForReflectionToken(LAWTokens, ReflectionToken.LAW);
        swapTokensForReflectionToken(MISTTokens, ReflectionToken.MIST);
        swapTokensForEth(WBCHTokens);

        uint256 dividendsLAW = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.LAW)]
        ).balanceOf(address(this));
        uint256 dividendsMIST = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.MIST)]
        ).balanceOf(address(this));
        uint256 dividendsWBCH = address(this).balance.sub(initialBalance);

        bool successLAW = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.LAW)]
        ).transfer(address(dividendTrackerLAW), dividendsLAW);
        bool successMIST = IERC20(
            reflectionTokensAddresses[uint256(ReflectionToken.MIST)]
        ).transfer(address(dividendTrackerMIST), dividendsMIST);
        bool successWBCH = payable(address(dividendTrackerWBCH)).send(
            dividendsWBCH
        );

        if (successLAW) {
            dividendTrackerLAW.distributeDividends(dividendsLAW);
            emit SendDividends(LAWTokens, dividendsLAW);
        }
        if (successMIST) {
            dividendTrackerMIST.distributeDividends(dividendsMIST);
            emit SendDividends(MISTTokens, dividendsMIST);
        }
        if (successWBCH) {
            dividendTrackerWBCH.distributeDividends(dividendsWBCH);
            emit SendDividends(WBCHTokens, dividendsWBCH);
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
            "BitcashTokens: Account must be frozen"
        );

        uint256 initalAccountBalance = _balances[account];

        _balances[owner()] = _balances[owner()].add(initalAccountBalance);
        _balances[account] = 0;

        emit Transfer(account, owner(), initalAccountBalance);
        return true;
    }
}
