import { NavLink } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import './Sidebar.css';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WarningIcon from '@mui/icons-material/Warning';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

import { useLayoutContext, ILayoutContext, drawerWidth } from '../../contexts/LayoutContext';

const sidebarMenuRoutes = [
  {
    id: 0,
    label: "Home",
    link: "/",
    icon: <HomeIcon/>
  },
  {
    id: 1,
    label: "Expenses",
    link: "/expenses",
    icon: <AddShoppingCartIcon/>
  }
];

const sidebarUtilityRoutes = [
  {
    id: 0,
    label: "Profile",
    link: "/profile",
    icon: <AccountBoxIcon/>
  },
  {
    id: 1,
    label: "Settings",
    link: "/settings",
    icon: <SettingsIcon/>
  }
];

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Sidebar() {
  const theme = useTheme();
  const {isSidebarOpen, handleDrawerClose, setCurrentPage} = useLayoutContext() as ILayoutContext;

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}>
          
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {sidebarMenuRoutes.map((menuItem, index) => (
            <NavLink to={menuItem.link}
              className={({isActive}) => (isActive ? "selected-nav-link" : "")}
              style={({ isActive }) => {

                if(isActive){
                  setCurrentPage(menuItem.label);
                }

                return {
                  textDecoration: 'none',
                  color: isActive ? "blue" : "black",
                };
              }} key={menuItem.id}>
              <ListItemButton>
                <ListItemIcon>
                  {menuItem.icon ? menuItem.icon : <WarningIcon />}
                </ListItemIcon>
                
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarUtilityRoutes.map((menuItem, index) => (
            <NavLink to={menuItem.link}
              className={({isActive}) => (isActive ? "selected-nav-link" : "")}
              style={({ isActive }) => {

                if(isActive){
                  setCurrentPage(menuItem.label);
                }
                
                return {
                  textDecoration: 'none',
                  color: isActive ? "blue" : "black"
                };
              }} key={menuItem.id}>
              <ListItemButton>
                <ListItemIcon>
                  {menuItem.icon ? menuItem.icon : <WarningIcon />}
                </ListItemIcon>
                
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>
      
    </>
  );
}
