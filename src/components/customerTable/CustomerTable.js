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
    <div className="container mx-auto">
      {/* start filter */}
      <div className="w-full bg-green-50 my-5 py-3">
        <input
          className="mx-5 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Filter by amount"
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
        />
      </div>
      {/* end filter */}

      <table className="w-full border-2 border-red-500">
        <thead>
          <tr>
            <th>Name</th>
            <th>Transactions</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {/* {customersToShow?.map((customer) => ( */}
          {dataToShow?.map(({ customerInfo, customerTransactions }) => (
            <tr
              key={customerInfo.id}
              onClick={() => setSelectedCustomer(customerInfo)}
              className="border-b border-red-500 duration-300 hover:bg-green-300 hover:cursor-pointer"
            >
              <td>{customerInfo.name}</td>
              <td>
                {customerTransactions.map((transaction) => (
                  <div key={transaction.id}>${transaction.amount}</div>
                ))}
              </td>
              <td>
                {customerTransactions.map((transaction, index) => (
                  <div key={transaction.id + index}>{transaction.date}</div>
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
