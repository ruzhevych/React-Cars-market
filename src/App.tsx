import './App.css'
import AppLayout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import CarTable from './components/CarsTable'
import CarInfo from './components/CarInfo'
import CreateCar from './components/CreateCar'
import EditCar from './components/EditCar'
import Login from './components/Login'
import Register from './components/Register'
import { ProtectedRoute } from './security/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<p>Home Page!</p>} />
        <Route path='/cars' element={<CarTable />} />
        <Route path='/cars/:id' element={<CarInfo />} />
        <Route path='/create' element={
          <ProtectedRoute>
            <CreateCar />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<EditCar />} />
        <Route path='*' element={<p>Page Not Found!</p>} />
      </Route>
    </Routes>
  )
}

export default App
