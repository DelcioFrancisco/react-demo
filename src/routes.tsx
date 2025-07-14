import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import FormPage from "./pages/FormPage";
import OpportunitiesListPage from "./pages/OpportunitiesListPage";
import InsertTokenPage from "./pages/InsertTokenPage";


export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/form" element={<FormPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/list" element={<OpportunitiesListPage/>} />
                <Route path="/token" element={<InsertTokenPage/>} />
            </Routes>
        </Router>
    )
}