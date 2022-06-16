// components
import Header from "../Header";
import { styled } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar, { DrawerHeader } from "../Sidebar";

import { useLayoutContext, ILayoutContext, drawerWidth } from "../../contexts/LayoutContext";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

const Layout = () => {
    const {isSidebarOpen} = useLayoutContext() as ILayoutContext;

    return (
       
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <Sidebar />
            <Main open={isSidebarOpen}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    )
}

export default Layout;