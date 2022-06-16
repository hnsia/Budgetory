import { Routes, Route } from "react-router-dom";
import HomePage from '../screens/HomePage/HomePage';
import ExpensePage from '../screens/Expenses';
import ProfilePage from "../screens/Profile/ProfilePage";
import SettingsPage from "../screens/Settings/SettingsPage";

// components
import Layout from '../components/Layout/Layout'

const MainRouter = () => (

    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="expenses" element={<ExpensePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
        </Route>
    </Routes>

);

export default MainRouter;