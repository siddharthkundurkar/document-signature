import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DocumentViewer from "./pages/DocumentViewer";
import PublicSigner from "./pages/PublicSigner";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/document/:id"
  element={<DocumentViewer />}
/>
        <Route
  path="/sign/:token"
  element={<PublicSigner />}
/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;