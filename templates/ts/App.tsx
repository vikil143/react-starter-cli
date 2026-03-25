import "./styles/app.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <AppRoutes />
      </main>
    </div>
  );
}