import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardAdmin from './pages/DashboardAdmin';
import BillDetails from './pages/BillDetails';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard-admin' element={<DashboardAdmin />} />
          <Route path='/bill-details' element={<BillDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
