import { useEffect, useContext, useState } from "react";

// Import style
import "../../pagestyles/bank/TransactionList.css";

// Importing bank context
import BankContext from "../../context/BankContext";
import dayjs from "dayjs";

const AllTransactionList = () => {
  const [fromDate, setfromDate] = useState(null);
  const [toDate, settoDate] = useState(null);
  let { listTrans, getTransactionList } = useContext(BankContext);

  useEffect(() => {
    getTransactionList(fromDate, toDate);
  }, [fromDate, toDate]);

  console.log({ fromDate, toDate });
  console.log(listTrans);
  const rows = listTrans.map((item, index) => (
    <tr key={index}>
      <td
        style={{
          textAlign: "center",
          border: "1px solid #ccc",
          color: "rgb(17 24 39)",
          fontWeight: 500,
          fontSize: "15px",
          padding: "18px 0",
        }}
      >
        {item.id}
      </td>
      <td
        style={{
          textAlign: "center",
          border: "1px solid #ccc",
          color: "rgb(17 24 39)",
          fontWeight: 500,
          fontSize: "15px",
          padding: "18px 0",
        }}
      >
        {item.Card}
      </td>
      <td
        style={{
          textAlign: "center",
          border: "1px solid #ccc",
          color: "rgb(17 24 39)",
          fontWeight: 500,
          fontSize: "15px",
          padding: "18px 0",
        }}
      >
        {item.transactionName}
      </td>
      <td
        style={{
          textAlign: "center",
          border: "1px solid #ccc",
          color: "rgb(17 24 39)",
          fontWeight: 500,
          fontSize: "15px",
          padding: "18px 0",
        }}
      >
        {dayjs(item.Tcreation).format("HH:MM:ss DD/MM/YYYY")}
      </td>
      <td
        style={{
          textAlign: "center",
          border: "1px solid #ccc",
          color: "rgb(17 24 39)",
          fontWeight: 500,
          fontSize: "15px",
          padding: "18px 0",
        }}
      >
        {item.amount}
      </td>
    </tr>
  ));

  return !listTrans ? (
    <div> No transactions </div>
  ) : (
    <div
      style={{
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        overflow: "hidden",
        margin: "20px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 12px",
          backgroundColor: "#f9fafb",
          borderTopRightRadius: "12px",
          borderTopLeftRadius: "12px",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Transaction list
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{}}>From</p>
          <input
            value={fromDate}
            onChange={(e) => {
              setfromDate(dayjs(e.target.value).format("YYYY-MM-DDTHH:mm"));
            }}
            type="datetime-local"
            style={{
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />
          <p>to</p>
          <input
            value={toDate}
            onChange={(e) => {
              settoDate(dayjs(e.target.value).format("YYYY-MM-DDTHH:mm"));
            }}
            type="datetime-local"
            style={{
              marginRight: "10px",
              marginLeft: "10px",
            }}
          />
        </div>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderBottomRightRadius: "12px",
          borderBottomLeftRadius: "12px",
        }}
      >
        <tr>
          <th
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "rgb(55 65 81)",
              fontWeight: 600,
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "16px 0",
            }}
          >
            Transaction Id
          </th>
          <th
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "rgb(55 65 81)",
              fontWeight: 600,
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "16px 0",
            }}
          >
            Card Id
          </th>
          <th
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "rgb(55 65 81)",
              fontWeight: 600,
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "16px 0",
            }}
          >
            Transaction name
          </th>
          <th
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "rgb(55 65 81)",
              fontWeight: 600,
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "16px 0",
            }}
          >
            Time
          </th>
          <th
            style={{
              fontSize: "15px",
              lineHeight: "24px",
              color: "rgb(55 65 81)",
              fontWeight: 600,
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "16px 0",
            }}
          >
            Amount
          </th>
        </tr>
        {rows}
      </table>
    </div>
  );
};

export default AllTransactionList;
