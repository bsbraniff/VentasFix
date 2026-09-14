import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Debes ingresar correo y contraseña.");
            return;
        }

        try {

            setCargando(true);

            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { token, usuario } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            navigate("/dashboard");

        } catch (error) {

            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Credenciales inválidas."
                );

            } else {

                setError(
                    "No se pudo conectar con el servidor."
                );
            }

        } finally {

            setCargando(false);
        }
    };

    return (
    <div className="login-page">

        <div className="container">
            <div className="row justify-content-center">

                <div className="col-11 col-sm-8 col-md-6 col-lg-4">

                    <div className="login-card">

                        <div className="login-content">

                            <div className="text-center">

                                <div className="login-logo">
                                    Ventas<span>Fix</span>
                                </div>

                                <p className="login-subtitle">
                                    Sistema de gestión empresarial
                                </p>

                            </div>

                            <h4 className="text-center mb-4">
                                Iniciar sesión
                            </h4>

                            {error && (
                                <div
                                    className="alert alert-danger login-error"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                    >
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control login-input"
                                        placeholder="usuario@ventasfix.cl"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold"
                                    >
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control login-input"
                                        placeholder="Ingrese su contraseña"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary login-button w-100"
                                    disabled={cargando}
                                >
                                    {cargando
                                        ? "Ingresando..."
                                        : "Iniciar sesión"}
                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <small className="text-muted">
                                    Acceso exclusivo para trabajadores de VentasFix
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    </div>
    );
}

export default Login;