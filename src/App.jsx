import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Statistics from './pages/Statistics';
import Attachments from './pages/Attachments';
import Profile from './pages/Profile';
import Support from './pages/Support';
import DashboardAdminUsers from './pages/DashboardAdminUsers';
import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './context/PrivateRoute';
import AdminRoute from './context/AdminRoute';
function App() {

  return (
    <>
      <BrowserRouter>
       <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/statistics' element={<PrivateRoute><Statistics /></PrivateRoute>} />
          <Route path='/attachments' element={<PrivateRoute><Attachments /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/support' element={<PrivateRoute><Support /></PrivateRoute>} />
          <Route path='/dashboard-admin/users' element={<AdminRoute><DashboardAdminUsers /></AdminRoute>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
