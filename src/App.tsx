import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import ListarUsuarios from './components/usuarios/listarUsuarios/ListarUsuarios'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import ListaCategorias from './components/categoria/listacategorias/ListaCategoria'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
import ListaProduto from './components/produto/ListaProduto/listaProduto'
import FormProduto from './components/produto/formproduto/FormProduto'
import DeletarProduto from './components/produto/deletarproduto/DeletarProduto'

function App() {
  return (
    <>
    
    <AuthProvider>
    <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/listarusuarios" element={<ListarUsuarios />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/listarusuarios" element={<ListarUsuarios />} />
              <Route path="/produtos" element={<ListaProduto />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />

              
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App