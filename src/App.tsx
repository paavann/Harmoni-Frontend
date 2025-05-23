import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './components/Layout'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />

        {/* Protected Routes   */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App