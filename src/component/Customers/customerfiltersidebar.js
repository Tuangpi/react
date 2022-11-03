import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import MyCustomerIcon from "@mui/icons-material/PeopleAlt";
import { auth } from "../../firebase";

export const CustomerFilterSideBar = () => (
  <Card sx={{ order: -1, mr: 2, mt: 0, width: 230 }}>
    <CardContent>
      <SavedQueriesList />
      <FilterLiveSearch source="name" />
      <FilterList label="Customer Paid/Unpaid" icon={<PaidIcon />}>
        <FilterListItem label="Paid" value={{ paid: true }} />
        <FilterListItem label="Unpaid" value={{ paid: false }} />
      </FilterList>
      <FilterList label="Customers" icon={<MyCustomerIcon />}>
        <FilterListItem label="My Customers" value={{ user_id: auth.currentUser.uid }} />
      </FilterList>
    </CardContent>
  </Card>
);
