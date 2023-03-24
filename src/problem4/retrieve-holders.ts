import { ethers, JsonRpcProvider } from "ethers";

const CONTRACT_ADDRESS = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";
const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Not sure whether if I can use the Binance Smart Chain public node
const BSC_NODE_URL = "https://bsc-dataseed.binance.org";

const ADDRESSES = [
  "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
];

async function main() {
  const provider = new JsonRpcProvider(BSC_NODE_URL);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    provider
  );

  for (const address of ADDRESSES) {
    const balance = await contract.balanceOf(address);
    console.log(`Balance of ${address}: ${balance.toString()}`);
  }
}

main().catch(console.error);
