pragma solidity 0.5.10;

/*
*
* Slot machine played with ETH
*
* [x] Provably Fair
* [x] Open Source
*
*/

contract Slots {
    event OnSpin(
        address indexed _player,
        bytes32 indexed _status,
        uint256 _cost,
        uint256 _amountWon,
        uint256 _slot1,
        uint256 _slot2,
        uint256 _slot3
    );

    // Cost to play
    uint256 public cost;

    // Cost to set player name
    uint256 public vanityCost;

    // Cost to become an affiliate
    uint256 public affiliateCost;

    // Cost to take ownership
    uint256 public ownershipCost;

    // Affiliates
    mapping (address => bool) affiliates;

    // Playerbook
    mapping (address => bytes32) playerBook;

    address payable private owner;

    // Ether sent directly to the contract
    function ()
        external
        payable
    {}

    constructor(uint256 _cost, uint256 _vanityCost, uint256 _affiliateCost, uint256 _ownershipCost)
        public
    {
        owner = msg.sender;
        cost = _cost;
        vanityCost = _vanityCost;
        affiliateCost = _affiliateCost;
        ownershipCost = _ownershipCost;
    }

    function transferOwnership(address payable newOwner)
        public
    {
        if (msg.sender == owner) {
            owner = newOwner;
        }
    }

    function takeOwnership()
        public
        payable
    {
        require(msg.value >= ownershipCost, "Amount sent too low");

        owner.transfer(ownershipCost);

        owner = msg.sender;
    }

    function setCost(uint256 newCost)
        public
    {
        if (msg.sender == owner) {
            cost = newCost;
        }
    }

    function setAffiliateCost(uint256 newAffiliateCost)
        public
    {
        if (msg.sender == owner) {
            affiliateCost = newAffiliateCost;
        }
    }

    function withdraw(uint256 amount)
        public
    {
        if (msg.sender == owner) {
            address(owner).transfer(amount);
        }
    }

    function setAffiliate()
        public
        payable
    {
        // Attempt to prevent contracts from interacting
        require(msg.sender == tx.origin, "Sender not authorized");

        affiliates[msg.sender] = true;
    }

    function setPlayerName(string memory vanityName)
        public
        payable
    {
        // Require minimum amount sent
        require(msg.value >= vanityCost, "Amount sent too low");

        // Check if vanity name is valid
        require(Helpers.isValidVanityName(vanityName) == true, "Invalid vanity name");

        // Convert to bytes32 for smaller storage
        bytes32 vanity32;
        assembly {
            vanity32 := mload(add(vanityName, 32))
        }

        playerBook[msg.sender] = vanity32;

        // emit OnVanity(msg.sender, vanity32);
    }

    function spin(address payable affiliateAddress)
        public
        payable
    {
        // Attempt to prevent contracts from interacting
        require(msg.sender == tx.origin, "Sender not authorized");

        require(msg.value >= cost, "Amount sent too low");

        uint256 spins = msg.value / cost;
        uint256 totalWon;
        uint256 seed;

        while(spins > 0) {
            uint256 slot1 = Helpers.getRandom(10, seed);
            uint256 slot2 = Helpers.getRandom(10, seed + 1);
            uint256 slot3 = Helpers.getRandom(10, seed + 2);

            if (slot1 == slot2 && slot2 == slot3) {
                uint256 amount = cost * 50;
                totalWon = totalWon + amount;
                emit OnSpin(msg.sender, 'jackpot', cost, amount, slot1, slot2, slot3);
            }
            else if (slot1 == slot2 || slot1 == slot3 || slot2 == slot3) {
                uint256 amount = cost * 2;
                totalWon = totalWon + amount;
                emit OnSpin(msg.sender, 'win', cost, amount, slot1, slot2, slot3);
            } else {
                emit OnSpin(msg.sender, 'lose', cost, 0, slot1, slot2, slot3);
            }

            spins = spins - 1;
            if (spins > 0) {
                seed = seed + 3;
            }
        }

        if (totalWon > 0) {
            msg.sender.transfer(totalWon);
        }

        if (affiliates[affiliateAddress]) {
            affiliateAddress.transfer(msg.value / 10);
        }
    }
}

library Helpers {
    function getRandom(uint256 max, uint256 seed)
        internal
        view
        returns(uint256)
    {
        uint256 blockhash_ = uint256(blockhash(block.number-1));
        uint256 balance = address(this).balance;

        uint256 random = uint256(keccak256(abi.encodePacked(
            now,
            block.coinbase,
            block.difficulty,
            blockhash_,
            balance,
            seed
        ))) % max;

        return random;
    }

    // Checks if vanity name is valid
    function isValidVanityName(string memory vanityString)
        internal
        pure
        returns (bool)
    {
        bytes memory vanityBytes = bytes(vanityString);
        uint256 stringLength = vanityBytes.length;

        // Name must be between 1 and 32 characters
        if (stringLength < 1 || stringLength > 32) {
            return false;
        }

        // Can not begin or end with a space
        if (vanityBytes[0] == 0x20 || vanityBytes[stringLength - 1] == 0x20) {
            return false;
        }

        // Can not begin with the number 0
        if (vanityBytes[0] == 0x30) {
            return false;
        }

        // Validate each character in the name
        for (uint i; i < vanityBytes.length; i++) {
            byte char = vanityBytes[i];

            if (
                !(char >= 0x30 && char <= 0x39) && //0-9
                !(char >= 0x61 && char <= 0x7A) && //a-z
                !(char >= 0x41 && char <= 0x5A) && //A-Z
                !(char == 0x20) && //space
                !(char == 0x5F) && //_
                !(char == 0x2E) //.
            ) {
                return false;
            }
        }

        return true;
    }
}