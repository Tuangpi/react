import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  ShowButton,
  TextField,
} from "react-admin";

export const InvoiceList = () => {
  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {/* {isSmall ? (
          <SimpleList
            primaryText={(record) => record.name}
            secondaryText={(record) => record.address}
            
          />
        ) : ( */}
      <Datagrid rowClick="show">
        <DateField source="invoice_date" label="Generate Date" />
        <TextField source="month" label="Invoice For" />
        <TextField source="paid_customer" label="Paid" />
        <TextField source="unpaid_customer" label="Unpaid" />
        <ShowButton basePath="/invoices" />
        <DeleteButton basePath="/invoices" />
      </Datagrid>
      {/* )} */}
    </List>
  );
};
