import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const TransactionGraph = ({ transactions }) => {
  const data = transactions.map((transaction) => ({
    date: moment(transaction.date).format("YYYY-MM-DD"),
    amount: transaction.amount,
  }));

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 my-10">
        No transactions available for the selected customer.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Transaction History</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
