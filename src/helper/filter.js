export function filterData(
  filterName,
  filterAmount,
  targetData,
  setDataToShow
) {
  let data = [];
  if (filterName !== "" && filterAmount !== "") {
    data = targetData.filter(({ customerInfo, customerTransactions }) => {
      return (
        customerInfo.name.toLowerCase().includes(filterName.toLowerCase()) &&
        customerTransactions.some((transaction) =>
          transaction.amount.toString().includes(filterAmount.toString())
        )
      );
    });
  } else if (filterName !== "" && filterAmount === "") {
    data = targetData.filter(({ customerInfo, customerTransactions }) => {
      return customerInfo.name.toLowerCase().includes(filterName.toLowerCase());
    });
  } else if (filterName === "" && filterAmount !== "") {
    data = targetData.filter(({ customerInfo, customerTransactions }) => {
      return customerTransactions.some((transaction) =>
        transaction.amount.toString().includes(filterAmount.toString())
      );
    });
  } else {
    data = targetData;
  }

  setDataToShow(data);
}
