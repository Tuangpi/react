import {
  Loading,
  Show,
  useGetOne,
  useRedirect,
  useShowContext,
} from "react-admin";
import { useParams } from "react-router-dom";
import "./invoice.scss";

export const InvoiceShow = (props) => {
  const { id } = useParams();
  const redirect = useRedirect();
  const { data, isLoading } = useGetOne(
    "invoices",
    { id },
    { onError: () => redirect("/invoices") }
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Show title="Invoice" {...props}>
      <div className="container-show">
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
                <div>{data.invoice_date}</div>
              </div>
            </div>
            <div>
              <div className="date-container">
                <div className="bold">Invoice For {data.month}</div>
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
                  <td>{data.paid_customer}</td>
                  <td>{data.paid_amount_total}</td>
                </tr>
                <tr>
                  <td>Unpaid</td>
                  <td>{data.unpaid_customer}</td>
                  <td>{data.unpaid_amount_total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Show>
  );
};
