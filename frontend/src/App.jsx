import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import LeadsPage from "./pages/LeadsPage";

import MainLayout from "./layouts/MainLayout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<LoginPage />} />

                <Route element={<MainLayout />}>

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/leads"
                        element={<LeadsPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;