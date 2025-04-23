import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import './App.css'

function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[70vh] bg-[#ea7566]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App