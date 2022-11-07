import { Show, SimpleShowLayout, BooleanField, TextField } from "react-admin";

export const UserList = (users) => {
  return (
    <Show>
      <SimpleShowLayout>
        <BooleanField
          source="paid"
          valueLabelTrue="Paid"
          valueLabelFalse="Unpaid"
        />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="address" />
      </SimpleShowLayout>
    </Show>
  );
};
