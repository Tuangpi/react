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
  ReferenceInput,
  DateField,
  SimpleShowLayout,
  Show,
  ShowButton,
} from "react-admin";

const ProductList = () => {
  return (
    <List>
      <Datagrid>
        <ReferenceField source="category_id" reference="categories" />
        <TextField source="name" />
        <NumberField source="price" />
        <NumberField source="rating" />
        <ShowButton basePath="/products" />
        <EditButton basePath="/products" />
        <DeleteButton basePath="/products" />
      </Datagrid>
    </List>
  );
};

const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" />
      <NumberField source="rating" />
      <DateField label="Create Date" source="createdate" />
      <DateField label="Update Date" source="lastdate" />
      <TextField label="Create By" source="createdby" />
    </SimpleShowLayout>
  </Show>
);

const ProductCreate = () => (
  <Create title="Create a product">
    <SimpleForm>
      <ReferenceInput source="category_id" reference="categories" />
      <TextInput source="name" />
      <NumberInput source="price" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Create>
);

const ProductEdit = () => (
  <Edit title="Edit a product">
    <SimpleForm>
      <ReferenceInput source="category_id" reference="categories" />
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <NumberInput source="price" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Edit>
);

export { ProductEdit, ProductCreate, ProductList, ProductShow };
