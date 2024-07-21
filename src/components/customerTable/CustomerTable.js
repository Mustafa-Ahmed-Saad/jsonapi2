import { useEffect, useState } from "react";
import { filterData } from "../../helper/filter";

function CustomerTable({ customers, transactions, setSelectedCustomer }) {
  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [targetData, setTargetData] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);

  useEffect(() => {
    const data = customers.map((customer) => {
      const transactionsData = transactions.filter(
        (transaction) => transaction?.customer_id === customer?.id
      );
      return { customerInfo: customer, customerTransactions: transactionsData };
    });

    setTargetData(data);
    setDataToShow(data);
  }, [customers, transactions]);

  useEffect(() => {
    filterData(filterName, filterAmount, targetData, setDataToShow);
  }, [filterName, filterAmount, targetData]);

  return (
    <div className="container mx-auto p-4">
      {/* Start filter */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow mb-6">
        <input
          className="mx-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Filter by amount"
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
        />
      </div>
      {/* End filter */}

      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Transactions</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {dataToShow?.map(({ customerInfo, customerTransactions }) => (
            <tr
              key={customerInfo.id}
              onClick={() => setSelectedCustomer(customerInfo)}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-4 py-2">{customerInfo.name}</td>
              <td className="px-4 py-2">
                {customerTransactions.map((transaction) => (
                  <div key={transaction.id} className="py-1">${transaction.amount}</div>
                ))}
              </td>
              <td className="px-4 py-2">
                {customerTransactions.map((transaction, index) => (
                  <div key={transaction.id + index} className="py-1">{transaction.date}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
