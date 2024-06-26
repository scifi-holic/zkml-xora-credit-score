interface Transaction {
  asset: string;
  value: number;
  hash: string;
  category: string;
}

interface Transfers {
  transfers: Transaction[];
}

interface TransactionData {
  from_transactions: Transfers;
  to_transactions: Transfers;
}

interface Transactions {
  transactions: TransactionData;
}

const validTransaction = (transaction: Transaction): boolean => {
  return transaction.asset === "MATIC" && transaction.category === "external";
};

interface AggregatedTransactionData {
  expenses: number;
  earnings: number;
  balanceRatio: number;
  averageExpense: number;
  averageEarning: number;
}

/**
 * Rounds a number to a given precision and, if needed, prepares the number for circuit calculations
 * @param x value to round
 * @param precision precision to round to
 * @param circuit True if the number is to be used in a circuit, false otherwise
 * @returns
 */
function round(x: number): number {
  return Math.round(x);
}

/**
 * Get real time ETH price in USD
 * @returns
 */
const ethToUSD = async (): Promise<number> => {
  const url =
    "https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD";
  const response = await fetch(url);
  const data = await response.json();
  return data.USD;
};

/**
 * Aggregates transaction data into a single object containing the following fields:
 * expenses: total amount of money spent
 * earnings: total amount of money earned
 * balanceRatio: ratio of earnings to expenses
 * averageExpense: average amount of money spent per transaction
 * averageEarning: average amount of money earned per transaction
 * @param transactions the transaction data to aggregate
 * @param precision precision to round to
 * @param circuit True if the data is to be used in a circuit, false otherwise
 * @returns {AggregatedTransactionData}
 */
export const aggregateTransactionData = (
  transactions: Transactions,
  usdRate: number,
  precision: number = 2,
  circuit: boolean = true
): AggregatedTransactionData => {
  // const { from_transactions, to_transactions } = transactions.transactions;
  // const from_transfers = from_transactions.transfers;
  // const to_transfers = to_transactions.transfers;
  // const from_values = from_transfers
  //   .filter((v) => validTransaction(v))
  //   .map((v) => v.value);
  // const expenses = (from_values.reduce((acc, v) => acc + v, 0) * usdRate) * 10 ** 4;
  // const to_values = to_transfers
  //   .filter((v) => validTransaction(v))
  //   .map((v) => v.value);
  // const earnings = (to_values.reduce((acc, v) => acc + v, 0) * usdRate) * 10 ** 4;
  // const balanceRatio = earnings / expenses;
  // const averageExpense = expenses / from_values.length;
  // const averageEarning = earnings / to_values.length;
  return {
    expenses: round(0),
    earnings: round(0),
    balanceRatio: round(0 * 10 ** 4),
    averageEarning: round(0),
    averageExpense: round(0),
  };
};

export const getAggregatedWeb2Data = (
  ccavg: number,
  income: number,
  loan: number
): [[string, string, string, string], string] => {
  const monthlyIncome = income / 12;
  const balanceRatio = income / ccavg;
  return [
    [
      round(income).toFixed(0),
      round(monthlyIncome).toFixed(0),
      round(ccavg).toFixed(0),
      round(balanceRatio * 10 ** 4).toFixed(0),
    ],
    round(loan).toFixed(0),
  ];
};

const getTransactions = async (address: string) => {
  const usdRate = await ethToUSD();
  const rawResponse = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address }),
  });
  const content = await rawResponse.json();
  const aggregations = aggregateTransactionData(content, usdRate);
  console.log(aggregations);
  return aggregations;
};

export default getTransactions;
