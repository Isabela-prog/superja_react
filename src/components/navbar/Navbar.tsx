import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext, useState } from "react"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {
    const navigate = useNavigate()
    const { handleLogout } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)

    function logout() {
        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
        setMenuOpen(false)
    }

    return (
        <nav className="bg-[#FB6822] text-white font-poppins font-bold py-4 px-5">
            {/* Container principal da navbar */}
            <div className="flex items-center justify-between max-w-screen-xl mx-auto relative">
                {/* Logo mais à esquerda */}
                <Link to='/home' className="text-2xl font-bold leading-none mr-auto">SuperJa</Link>

                {/* Menu links - centralizados no desktop */}
                <div className="hidden md:flex items-center gap-6 text-lg absolute left-1/2 transform -translate-x-1/2">
                    <Link to='/categorias' className='hover:underline'>Categorias</Link>
                    <Link to='/produtos' className='hover:underline'>Produtos</Link>
                    <Link to='/sobre' className='hover:underline'>Sobre Nós</Link>
                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                    <Link to='/login' onClick={logout} className='hover:underline'>Sair</Link>
                </div>

                {/* Botão do menu - só no mobile */}
                <button
                    className="text-2xl md:hidden ml-auto"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir ou fechar menu"
                >
                    ☰
                </button>
            </div>

            {/* Menu mobile - aparece abaixo no mobile quando menuOpen = true */}
            {menuOpen && (
                <div className="flex flex-col items-center gap-3 text-lg mt-4 md:hidden">
                    <Link to='/categorias' className='hover:underline' onClick={() => setMenuOpen(false)}>Categorias</Link>
                    <Link to='/produtos' className='hover:underline' onClick={() => setMenuOpen(false)}>Produtos</Link>
                    <Link to='/sobre' className='hover:underline' onClick={() => setMenuOpen(false)}>Sobre Nós</Link>
                    <Link to='/perfil' className='hover:underline' onClick={() => setMenuOpen(false)}>Perfil</Link>
                    <Link to='/login' onClick={logout} className='hover:underline'>Sair</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar