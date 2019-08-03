export default {
	address: '0x8f069ac8499c1c5c20c1bc8a0834d0b294efe6bf',
	abi: [
		{
			"constant": true,
			"inputs": [],
			"name": "ownershipCost",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "takeOwnership",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "withdrawAsOwner",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "affiliateCost",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newAffiliateCost",
					"type": "uint256"
				}
			],
			"name": "setAffiliateCost",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newCostToPlay",
					"type": "uint256"
				}
			],
			"name": "setCostToPlay",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "costToPlay",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "costToSetPlayerName",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "playerName",
					"type": "string"
				}
			],
			"name": "setPlayerName",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "playerAddress",
					"type": "address"
				}
			],
			"name": "getPlayerName",
			"outputs": [
				{
					"name": "playerName",
					"type": "bytes32"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "createAffiliate",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "affiliateAddress",
					"type": "address"
				}
			],
			"name": "spin",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"name": "_costToPlay",
					"type": "uint256"
				},
				{
					"name": "_costToSetPlayerName",
					"type": "uint256"
				},
				{
					"name": "_affiliateCost",
					"type": "uint256"
				},
				{
					"name": "_ownershipCost",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"payable": true,
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "_player",
					"type": "address"
				},
				{
					"indexed": true,
					"name": "_status",
					"type": "bytes32"
				},
				{
					"indexed": false,
					"name": "_amountWon",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "_slot1",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "_slot2",
					"type": "uint256"
				},
				{
					"indexed": false,
					"name": "_slot3",
					"type": "uint256"
				}
			],
			"name": "OnSpin",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"name": "_playerAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"name": "_playerName",
					"type": "bytes32"
				}
			],
			"name": "OnPlayerName",
			"type": "event"
		}
	]
}