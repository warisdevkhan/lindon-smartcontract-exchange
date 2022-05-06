import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ico from './frontend/Ico2';
import Home from './frontend/Home';
import Login from './frontend/Login';
import Register from './frontend/Register';
import Aboutus from './frontend/Aboutus';
import Dashboard from "./frontend/dashboard/admin/dashboard";
import Payments from './frontend/dashboard/admin/Payments';
import PurchaseToken from './frontend/dashboard/admin/PurchaseToken';
import Wallet from './frontend/dashboard/admin/Wallet';
import Transaction from './frontend/dashboard/admin/Transaction';
import Term_of_use from './frontend/Term_of_use';
import Privacy_policy from './frontend/privacy-policy';
import Frequntely_asked_question from './frontend/Frequntely-asked-question';
import Xcash from './frontend/Xcash/Xcash';
import Bitcash from './frontend/Bitcash/Bitcash';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ico" element={<Ico />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/purchase-token" element={<PurchaseToken />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/term-of-use" element={<Term_of_use />} />
        <Route path="/privacy-policy" element={<Privacy_policy />} />
        <Route path="/faq" element={<Frequntely_asked_question />} />
        <Route path="/Xcash" element={<Xcash />} />
        <Route path="/Bitcash" element={<Bitcash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
