import {
  SavedQueriesList,
  FilterLiveSearch,
  FilterList,
  FilterListItem,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const BraFilter = () => (
  <FilterList label="Subscribed to newsletter" icon={<MailIcon />}>
    <FilterListItem label="Yes" value={{ has_newsletter: true }} />
    <FilterListItem label="NoF" value={{ has_newsletter: false }} />
  </FilterList>
);
