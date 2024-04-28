import { type FC } from "react";
import { useMetamask } from "../hooks/useMetamask";
import Link from "next/link";
export const CTA: FC = () => {
  const { state } = useMetamask();
  return (
    <div className="flex justify-center flex-col pt-20 w-full">
      <p className="font-bold text-3xl text-center text-gray-700 break-words lg:px-32 pt-7">
        Hello
      </p>
      {state.wallet ? (
        <div className="flex justify-center py-10 flex-row space-x-3">
          <Link
            className="hover:opacity-50 text-gray-700 underline text-xl animate-pulse"
            href="/loan"
          >
            Request a credit score
          </Link>
          <Link
            className="hover:opacity-50 text-gray-700 underline text-xl animate-pulse"
            href="/score"
          >
            View my score history
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center py-10  space-x-3 black">
          <p className="font-bold text-xl text-center text-gray-800 break-words lg:px-32 pt-7">
            First, connect your polygon wallet (SCROLL TESTNET).
          </p>
          <p className="font-bold text-xl text-center text-gray-800 break-words lg:px-32 pt-2">
            Its important that you have balance and used your wallet in the last
            few weeks.
          </p>
        </div>
      )}
    </div>
  );
};
