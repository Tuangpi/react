import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  DeleteButton,
  TextInput,
  Create,
  SimpleShowLayout,
  Show,
  ShowButton,
  DateInput,
  DateField,
} from "react-admin";

const BusinessList = () => {
  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <List queryOptions={{ businesses: { name: "IT books" } }}>
      {/* {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.address}
          
        />
      ) : ( */}
      <Datagrid>
        <TextField source="name" />
        <DateField source="subscriptionEndDate" />
        <ShowButton basePath="/businesses" />
        <EditButton basePath="/businesses" />
        <DeleteButton basePath="/businesses" />
      </Datagrid>
      {/* )} */}
    </List>
  );
};
const BusinessShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="subscriptionEndDate" />
    </SimpleShowLayout>
  </Show>
);
const BusinessCreate = (props) => (
  <Create title="Create a Business" {...props} redirect="list">
    <SimpleForm>
      <TextInput source="name" />
      <DateInput source="subscriptionEndDate" />
    </SimpleForm>
  </Create>
);

const BusinessEdit = (props) => (
  <Edit title="Edit a Business" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <DateInput source="subscriptionEndDate" />
    </SimpleForm>
  </Edit>
);

export { BusinessEdit, BusinessCreate, BusinessList, BusinessShow };
