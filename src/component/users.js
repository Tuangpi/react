import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  EmailField,
  NumberField,
  DateField,
  Show,
  SimpleShowLayout,
  ReferenceField,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  PasswordInput,
} from "react-admin";

const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid
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
          label="Business Name"
          source="name"
          reference="businesses"
        >
          <TextField source="businessName" />
        </ReferenceField>
        <TextField source="name" />
        <NumberField source="phone" />
        <EmailField source="email" />
        <ShowButton basePath="/users" />
        {/* <EditButton basePath="/users" />
        <DeleteButton basePath="/users" /> */}
      </Datagrid>
    </List>
  );
};

const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="id" reference="businesses">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="phone" />
      <EmailField source="email" />
      <DateField label="Create Date" source="createdate" />
    </SimpleShowLayout>
  </Show>
);

const UserCreate = (props) => (
  <Create title="Create a User" {...props}>
    <SimpleForm>
      <ReferenceInput
        source="business_id"
        reference="businesses"
        sort={{ field: "name", order: "ASC" }}
      >
        <SelectInput
          parse={(value) => (value === "not defined" ? undefined : value)}
        />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="email" />
      <NumberInput source="phone" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);

export { UserList, UserShow, UserCreate };
