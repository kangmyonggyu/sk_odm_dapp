var abi = [
              {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                  }
                ],
                "name": "Approval",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                  }
                ],
                "name": "Transfer",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": false,
                    "internalType": "string",
                    "name": "tx",
                    "type": "string"
                  },
                  {
                    "indexed": false,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "token",
                    "type": "uint256"
                  }
                ],
                "name": "event_transfer",
                "type": "event"
              },
              {
                "constant": true,
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                  }
                ],
                "name": "allowance",
                "outputs": [
                  {
                    "internalType": "uint256",
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
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "approve",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                  }
                ],
                "name": "balanceOf",
                "outputs": [
                  {
                    "internalType": "uint256",
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
                "name": "decimals",
                "outputs": [
                  {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
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
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                  }
                ],
                "name": "decreaseAllowance",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                  }
                ],
                "name": "increaseAllowance",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "lowest_1st_token_index",
                "outputs": [
                  {
                    "internalType": "uint256",
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
                "name": "lowest_2nd_token_amount",
                "outputs": [
                  {
                    "internalType": "uint256",
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
                "name": "lowest_2nd_token_index",
                "outputs": [
                  {
                    "internalType": "uint256",
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
                "name": "name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                  {
                    "internalType": "uint256",
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
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "transfer",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "transferFrom",
                "outputs": [
                  {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "winner",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "company_name",
                    "type": "string"
                  },
                  {
                    "internalType": "address",
                    "name": "company_address",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "token_amount",
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
                "name": "reset_auction",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_token",
                    "type": "uint256"
                  }
                ],
                "name": "api_brandowner_to_paymentguarantee",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "_token",
                    "type": "uint256"
                  }
                ],
                "name": "api_bidding_company_to_paymentguarantee",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": false,
                "inputs": [],
                "name": "api_bidding_processing",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "get_winner_company_name",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "get_winner_company_address",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "get_winner_payment_token_amount",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              }
            ]