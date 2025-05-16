import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Attachments from './pages/Attachments';
import Profile from './pages/Profile';
import Support from './pages/Support';
import DashboardAdmin from './pages/DashboardAdmin';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/attachments' element={<Attachments />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/support' element={<Support />} />
          <Route path='/dashboard-admin' element={<DashboardAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
