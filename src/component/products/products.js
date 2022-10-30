import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  SimpleForm,
  NumberInput,
  ReferenceField,
  EditButton,
  DeleteButton,
  TextInput,
  Create,
  ReferenceInput
} from "react-admin";

const ProductList = (props) => {
  return (
    <List filters={postFilters} {...props}>
      <Datagrid>
        <ReferenceField source="category_id" reference="categories" />
        <TextField source="name" />
        <NumberField source="price" />
        <NumberField source="rating" />
        <EditButton basePath="/products" />
        <DeleteButton basePath="/products" />
      </Datagrid>
    </List>
  );
};
const ProductShow = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
const ProductCreate = (props) => (
    <Create title="Create a product" {...props}>
      <SimpleForm>
        <ReferenceInput source="category_id" reference="categories" />
        <TextInput source="name" />
        <NumberInput source="price" />
        <NumberInput source="rating" />
      </SimpleForm>
    </Create>
  );

const ProductEdit = (props) => (
  <Edit title='Edit a product' {...props}>
    <SimpleForm>
      <ReferenceInput source="category_id" reference="categories" />
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <NumberInput source="price" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Edit>
);

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="category_id" label="Category" reference="categories" />,
];

export { ProductEdit, ProductCreate, ProductList, ProductShow };
