import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/background-login.jpg')] bg-cover bg-center opacity-10 blur-sm"></div>

            <form
                className="z-10 backdrop-blur-lg bg-white/10 border border-white/30 shadow-xl rounded-xl p-10 w-[90%] max-w-md flex flex-col gap-6 text-white"
                onSubmit={login}
            >
                <h2 className="text-4xl font-extrabold text-center mb-2">Bem-vindo 👋</h2>
                <p className="text-center text-slate-200 text-sm mb-4">Faça login para continuar</p>

                <div className="flex flex-col gap-1">
                    <label htmlFor="usuario" className="text-sm">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Digite seu usuário"
                        className="bg-white/20 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-slate-300 text-white"
                        value={usuarioLogin.usuario}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="senha" className="text-sm">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="••••••••"
                        className="bg-white/20 border border-white/30 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all placeholder-slate-300 text-white"
                        value={usuarioLogin.senha}
                        onChange={atualizarEstado}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition-all flex justify-center items-center"
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>Entrar</span>
                    )}
                </button>

                <hr className="border-slate-600" />

                <p className="text-center text-sm">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-orange-300 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;