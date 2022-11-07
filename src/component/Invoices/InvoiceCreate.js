import {
  choices,
  Create,
  DateInput,
  NumberInput,
  SaveButton,
  SelectInput,
  Show,
  SimpleForm,
  TextInput,
  Toolbar,
  useCreate,
  useCreateContext,
  useCreateController,
  useInput,
  useNotify,
  useRedirect,
} from "react-admin";
import { auth, db } from "../../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { Card, CardContent, CardHeader } from "@mui/material";
import GenerateIcon from "@mui/icons-material/SettingsSuggest";
import "./generate.css";
import "./invoice.scss";

const forSelect = [
  { id: "January", name: "January" },
  { id: "February", name: "February" },
  { id: "March", name: "March" },
  { id: "April", name: "April" },
  { id: "May", name: "May" },
  { id: "June", name: "June" },
  { id: "July", name: "July" },
  { id: "August", name: "August" },
  { id: "September", name: "September" },
  { id: "October", name: "October" },
  { id: "November", name: "November" },
  { id: "December", name: "December" },
];

export const InvoiceCreate = (forSelect, props) => {
  const notify = useNotify();
  const [create] = useCreate();
  const [invoicePaidData, setInvoicePaidData] = useState([]);
  const [invoiceUnPaidData, setInvoiceUnPaidData] = useState([]);
  const [date, setDate] = useState("01/01/1997");
  const redirect = useRedirect();
  const myTodayDate = new Date();

  const month12 = [
    { id: "January", name: "January" },
    { id: "February", name: "February" },
    { id: "March", name: "March" },
    { id: "April", name: "April" },
    { id: "May", name: "May" },
    { id: "June", name: "June" },
    { id: "July", name: "July" },
    { id: "August", name: "August" },
    { id: "September", name: "September" },
    { id: "October", name: "October" },
    { id: "November", name: "November" },
    { id: "December", name: "December" },
  ];
  const todayMonth = month12[myTodayDate.getMonth()].name;
  const [month, setMonth] = useState(todayMonth);

  useEffect(() => {
    const myTodayDat = new Date();
    const d = myTodayDat.toLocaleDateString();
    setDate(d);
  }, [date]);

  useEffect(() => {
    let paidArr = [];
    let unPaidArr = [];
    const invoice = async () => {
      console.log(month);
      try {
        const recordsRef = collection(db, "records");
        const q1 = query(recordsRef, where("month", "==", month));
        console.log(q1);
        const querySnapshot = await getDocs(q1);

        let tmpPaid = 0;
        let tmpUnPaid = 0;
        querySnapshot.forEach((r) => {
          if (r.data().paid === true) {
            tmpPaid += r.data().amount;
            paidArr.push(r.data().customer_id);
          } else {
            tmpUnPaid += r.data().amount;
            unPaidArr.push(r.data().customer_id);
          }
        });
        paidArr.push(tmpPaid);
        unPaidArr.push(tmpUnPaid);
        setInvoicePaidData(paidArr);
        setInvoiceUnPaidData(unPaidArr);
        // navigate(-1);
      } catch (err) {
        console.log(err);
      }
    };
    invoice();
  }, [month]);

  // const GenerateToolbar = (props) => (
  //   <Toolbar {...props}>
  //     <SaveButton
  //       alwaysEnable
  //       label="Generate Invoicesss"
  //       icon={<GenerateIcon />}
  //     />
  //   </Toolbar>
  // );
  const handleGenerator = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "invoices"), {
      month: e.target[0].value,
      user_id: e.target[1].value,
      invoice_date: e.target[2].value,
      paid_customer: e.target[3].value,
      paid_amount_total: e.target[4].value,
      unpaid_customer: e.target[5].value,
      unpaid_amount_total: e.target[6].value,
    });
    notify("Invoice Generate Successfully !", {
      type: "success",
      undoable: false,
    });
    redirect("/invoices");
  };
  const handleSelect = (e) => {
    e.preventDefault();
    setMonth(e.target.value);
  };
  return (
    // <Create title="Generate Invoice" {...props} redirect="list">
    <form onSubmit={handleGenerator}>
      <br />
      <select onChange={handleSelect}>
        {month12.map((label) =>
          label.id == month ? (
            <option value={label.id} selected>
              {label.name}
            </option>
          ) : (
            <option value={label.id}>{label.name}</option>
          )
        )}
      </select>
      <br />
      <div className="my-container">
        <div className="wrapper">
          <div className="top-header">
            <div className="business-address">
              <div className="bold">Business Name</div>
              <div>Address</div>
              <div>Address</div>
            </div>
            <div className="bold">Invoice Number</div>
          </div>
          <div className="middle-header">
            <div>
              <div className="date-container">
                <div className="bold">Date</div>
                <div>{date}</div>
              </div>
            </div>
            <div>
              <div className="date-container">
                <div className="bold">Invoice For {month}</div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <th className="light">Status</th>
                <th className="light">Customers</th>
                <th className="light">Amount Total</th>
              </thead>
              <tbody>
                <tr>
                  <td>Paid</td>
                  <td>{invoicePaidData.length - 1}</td>
                  <td>{invoicePaidData[invoicePaidData.length - 1]}</td>
                </tr>
                <tr>
                  <td>Unpaid</td>
                  <td>{invoiceUnPaidData.length - 1}</td>
                  <td>{invoiceUnPaidData[invoiceUnPaidData.length - 1]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <input type="hidden" value={auth.currentUser.uid} />
      <input type="hidden" value={date} />
      <input type="hidden" value={invoicePaidData.length - 1} />
      <input
        type="hidden"
        value={invoicePaidData[invoicePaidData.length - 1]}
      />
      <input type="hidden" value={invoiceUnPaidData.length - 1} />
      <input
        type="hidden"
        value={invoiceUnPaidData[invoiceUnPaidData.length - 1]}
      />
      <button className="my-button" type="submit">
        Generate
      </button>
    </form>
  );
};
