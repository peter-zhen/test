import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { PaymentProvider } from './providers/PaymentProvider'
import { WagmiConfigProvider } from './providers/WagmiConfigProvider'
import { ConnectionTypeProvider } from './providers/ConnectionTypeProvider'

import PaymentPage from './pages/Payment/PaymentPage'
import HomePage from './pages/Homepage/HomePage'
////11111
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <WagmiConfigProvider>
        <ConnectionTypeProvider>
          <PaymentProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/payment' element={<PaymentPage />} />
            </Routes>
          </PaymentProvider>
        </ConnectionTypeProvider>
      </WagmiConfigProvider>
    </Router>
  )
}

export default App
