import { Menu } from 'react-admin';

import ProductIcon from '@mui/icons-material/List';
import Category from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import LabelIcon from '@mui/icons-material/Label';

export const MyMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.Item to="/products" primaryText="Product" leftIcon={<ProductIcon />}/>
        <Menu.Item to="/categories" primaryText="Category" leftIcon={<Category />}/>
        <Menu.Item to="/users" primaryText="Users" leftIcon={<PeopleIcon />}/>
        <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/>
    </Menu>
);