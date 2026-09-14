import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Usuarios from "../pages/Usuarios/Usuarios";
import Productos from "../pages/Productos/Productos";
import Clientes from "../pages/Clientes/Clientes";
import Layout from "../components/Layout";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/usuarios"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Usuarios soyUnProp={1}/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/productos"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Productos />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/clientes"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Clientes />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;