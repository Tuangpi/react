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
} from "react-admin";

const CategoryList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <EditButton basePath="/Categorys" />
        <DeleteButton basePath="/Categorys" />
      </Datagrid>
    </List>
  );
};
const CategoryShow = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
const CategoryCreate = (props) => (
    <Create title="Create a Category" {...props}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );

const CategoryEdit = (props) => (
  <Edit title='Edit a Category' {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export { CategoryEdit, CategoryCreate, CategoryList, CategoryShow };
