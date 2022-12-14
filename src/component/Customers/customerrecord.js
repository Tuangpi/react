import {
  Datagrid,
  DeleteButton,
  List,
  ReferenceField,
  ShowButton,
  TextField,
  EditButton,
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
  BooleanField,
  NumberField,
  TextInput,
  Show,
  SimpleShowLayout,
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  useRecordContext,
} from "react-admin";
import * as React from "react";
import { auth } from "../../firebase";
import { Card, CardContent } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import MyCustomerIcon from "@mui/icons-material/PeopleAlt";

// export const CustomerRecordCreate = (props) => (
//   <Create title="Create a Record" {...props} redirect="list">
//     <SimpleForm>
//       <ReferenceInput source="customer_id" reference="customers" />
//       <ArrayInput source="paid_month">
//         <SimpleFormIterator inline>
//           <DateInput source="from" helperText={false} />
//           <DateInput source="to" helperText={false} />
//           <NumberInput source="amount" helperText={false} />
//         </SimpleFormIterator>
//       </ArrayInput>
//       <BooleanInput source="paid" />
//     </SimpleForm>
//   </Create>
// );

// const RecordsPanel = () => {
//   const record = useRecordContext();
//   return (
//     <ArrayField source="paid_month">
//       <Datagrid>
//         <ChipField source="from" />
//         <ChipField source="amount" />
//       </Datagrid>
//     </ArrayField>
//   );
// };

const CustomerRecordsFilterSideBar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 0, width: 230 }}>
    <CardContent>
      {/* <SavedQueriesList />
      <FilterLiveSearch source="name" /> */}
      <FilterList label="Customer Paid/Unpaid" icon={<PaidIcon />}>
        <FilterListItem label="Paid" value={{ paid: true }} />
        <FilterListItem label="Unpaid" value={{ paid: false }} />
      </FilterList>
      <FilterList label="Customers" icon={<MyCustomerIcon />}>
        <FilterListItem
          label="My Customers"
          value={{ user_id: auth.currentUser.uid }}
        />
      </FilterList>
    </CardContent>
  </Card>
);

const customerFilters = [
  // <TextInput label="Search" source="month" alwaysOn />,
  // <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const RecordPanel = () => {
  const record = useRecordContext();
  const today = new Date().toLocaleDateString();
  return (
    <>
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
                <div>{today}</div>
              </div>
            </div>
            <div>
              <div className="date-container">
                <div className="bold">Invoice For {record.month}</div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <table>
              <thead style={{ textAlign: "center" }}>
                <th className="light">Status</th>
                <th className="light">Amount</th>
              </thead>
              <tbody>
                <tr>
                  <td>{record.paid == true ? "Paid" : "Unpaid"}</td>
                  <td>{record.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const CustomerRecordList = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let name = months[d.getMonth()];
  let mytitle = "Customer Records For " + name;
  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List
      title={mytitle}
      aside={<CustomerRecordsFilterSideBar />}
      filter={{ month: name }}
      // filters={customerFilters}
    >
      {/* {isSmall ? (
          <SimpleList
            primaryText={(record) => record.name}
            secondaryText={(record) => record.address}
            expand={RecordsPanel}
          />
        ) : ( */}
      <Datagrid
        expand={RecordPanel}
        sx={{
          backgroundColor: "#fff",
          "& .RaDatagrid-headerCell": {
            textAlign: "center",
            backgroundColor: "#efefef",
          },
          "& .RaDatagrid-rowCell": {
            textAlign: "center",
          },
        }}
      >
        <ReferenceField
          label="Customer Name"
          source="customer_id"
          reference="customers"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          label="Address"
          source="customer_id"
          reference="customers"
        >
          <TextField source="address" />
        </ReferenceField>
        {/* <NumberField source="amount" /> */}
        {/* <ReferenceArrayField
          label="Month"
          reference="months"
          source="month_id"
        /> */}
        {/* <ArrayField source="paid_month">
          <SingleFieldList>
            <ChipField source="from" />
          </SingleFieldList>
        </ArrayField> */}
        <BooleanField source="paid" />
        <NumberField source="amount" />
        <ShowButton basePath="/records" />
        <EditButton basePath="/records" />
        <DeleteButton basePath="/records" />
      </Datagrid>
      {/* )} */}
    </List>
  );
};

export const CustomerRecordEdit = (props) => (
  <Edit title="Edit a Record" {...props} redirect="list">
    <SimpleForm>
      <BooleanInput source="paid" />
      <NumberInput source="amount" />
    </SimpleForm>
  </Edit>
);

export const CustomerRecordShow = (props) => <div>Show Customer Records</div>;
