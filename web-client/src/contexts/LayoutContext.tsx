import {FC, createContext, useState, useContext, ReactNode, Dispatch, SetStateAction} from 'react';
export interface ILayoutContext {
    currentPage: string;
    isSidebarOpen: boolean;
    setCurrentPage: Dispatch<SetStateAction<string>>;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}

interface LayoutPageProps {
    children: ReactNode;
}

export const drawerWidth = 240;

const LayoutContext = createContext<ILayoutContext | null>(null);

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if(context === undefined){
        throw new Error("useLayoutContext must be used within a LayoutProvider");
    }
    return context;
}

const LayoutContextProvider: FC<LayoutPageProps> = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("Home");

    const handleDrawerOpen = () => {
        setSidebarOpen(true);
      };
    
    const handleDrawerClose = () => {
        setSidebarOpen(false);
    };

    return (
        <LayoutContext.Provider value={{currentPage, isSidebarOpen, setCurrentPage, handleDrawerOpen, handleDrawerClose}}>
            {children}
        </LayoutContext.Provider>
    );
}

export default LayoutContextProvider;
