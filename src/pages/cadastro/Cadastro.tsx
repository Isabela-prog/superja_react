import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { RotatingLines } from 'react-loader-spinner'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmaSenha, setConfirmaSenha] = useState<string>("")
    const [usuario, setUsuario] = useState<Usuario>({
        id: null,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (usuario.id !== 0 && usuario.id != null){
            retornar()
        }
    }, [usuario]);

    function retornar(){
        navigate('/login')
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
        setConfirmaSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){
            setIsLoading(true)
            try{
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
                ToastAlerta('Usuário cadastrado com sucesso!',"sucesso")
            }catch(error){
                ToastAlerta('Erro ao cadastrar o usuário!', "erro")
            }
        }else{
            ToastAlerta('Dados do usuário inconsistentes! Verifique as informações do cadastro.', 'info')
            setUsuario({...usuario, senha: ''})
            setConfirmaSenha('')
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6" onSubmit={cadastrarNovoUsuario}>
                <h2 className="text-3xl font-bold text-gray-800 text-center">Cadastrar</h2>

                <div className="flex flex-col gap-3">
                    <label htmlFor="nome" className="text-sm text-gray-600">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Digite seu nome"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={usuario.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="usuario" className="text-sm text-gray-600">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Digite seu usuário"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={usuario.usuario}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="foto" className="text-sm text-gray-600">Foto</label>
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        placeholder="URL da foto (opcional)"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={usuario.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="senha" className="text-sm text-gray-600">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={usuario.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="confirmarSenha" className="text-sm text-gray-600">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        placeholder="Confirme sua senha"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={confirmaSenha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <button 
                        type='reset'
                        className="bg-red-400 hover:bg-red-700 text-white font-semibold rounded-md w-1/2 py-2"
                        onClick={retornar}
                    >
                        Cancelar
                    </button>
                    <button 
                        type='submit'
                        className="bg-indigo-400 hover:bg-indigo-600 text-white font-semibold rounded-md w-1/2 py-2 flex justify-center"
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
                            <span>Cadastrar</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Cadastro