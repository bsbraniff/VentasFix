import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

function Layout({ children }) {

    return (
        <div className="layout-ventasfix">

            <Navbar />

            <div className="d-flex layout-content">

                <Sidebar />

                <main className="layout-main">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;