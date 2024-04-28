// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// Setup: npm install alchemy-sdk
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import QuickNode from '@quicknode/sdk';
// if you are using ESM style imports, use this line instead:
// import QuickNode from '@quicknode/sdk';

const get_from_transactions = async (address: string) => {

  const data: never[] = [];
  return data;
};

const get_to_transactions = async (address: string) => {
  // const config = {
  //   apiKey: process.env.ALCHEMY_API_KEY,
  //   network: Network.MATIC_MUMBAI,
  // };
  // const alchemy = new Alchemy(config);

  // const data = await alchemy.core.getAssetTransfers({
  //   fromBlock: "0x0",
  //   toAddress: address,
  //   category: [AssetTransfersCategory.EXTERNAL],
  // });
  // console.log(data);
  const data: never[] = [];
  return data;
};

const get_all_transactions = async (address: string) => {
  const from_transactions = await get_from_transactions(address);
  const to_transactions = await get_to_transactions(address);
  return { from_transactions, to_transactions };
};

type Data = {
  transactions: any;
  error: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { address } = req.body;
    const transactions: never[] = [];
    return res.status(200).json({ transactions, error: undefined });
  }
  return res
    .status(200)
    .json({ transactions: undefined, error: "Method not allowed" });
}
