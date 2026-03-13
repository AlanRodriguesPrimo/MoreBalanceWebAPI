import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </div>)
}

export default App
