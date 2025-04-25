import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

interface DevasSobre {
    nome: string;
    imagem: string;
    sobre: string;
    github: string;
    linkedin: string;
}

function Sobre() {
    const devas: DevasSobre[] = [
        {
            nome: 'Evelyn Santos',
            imagem: 'https://i.postimg.cc/KY3hmQBp/Design-sem-nome-5.png',
            sobre: 'Desenvolvedora Fullstack Java',
            github: 'https://github.com/EvelynSantos6',
            linkedin: 'https://www.linkedin.com/in/evelyn-santos-devti/'
        },
        {
            nome: 'Hellen Gleice',
            imagem: 'https://i.postimg.cc/CLnGHqCT/Design-sem-nome-9.png',
            sobre: 'Desenvolvedora Fullstack Java',
            github: 'https://github.com/hellengleice',
            linkedin: 'https://www.linkedin.com/in/hellenjr'
        },
        {
            nome: 'Thainara Cruz',
            imagem: 'https://i.postimg.cc/x8CRSpbc/Design-sem-nome-7.png',
            sobre: 'Desenvolvedora Fullstack Java',
            github: 'https://github.com/ThainaraCruz',
            linkedin: 'http://www.linkedin.com/in/thainara-acruz'
        },
        {
            nome: 'Isabela Santos',
            imagem: 'https://i.postimg.cc/RZXZWP3M/Design-sem-nome-4.png',
            sobre: 'Desenvolvedora Fullstack Java',
            github: 'https://github.com/Isabela-prog',
            linkedin: 'https://www.linkedin.com/in/isabela-santos-837541351/'
        },
        {
            nome: 'Maytê Araujo',
            imagem: 'https://i.postimg.cc/3RLX9jb7/Design-sem-nome-8.png',
            sobre: 'Desenvolvedora Fullstack Java',
            github: 'https://github.com/maytearaujo',
            linkedin: 'https://www.linkedin.com/in/maytearaujo/'
        },
        {
            nome: 'Abiqueila Souza',
            imagem: 'https://i.postimg.cc/pLygBkGV/Design-sem-nome-6.png',
            sobre: 'Desenvolvedora Fullstack Java',
            github: 'https://github.com/Abilafora',
            linkedin: 'https://www.linkedin.com/in/abiqueila-souza/'
        }
    ];

    return (
        <div className="p-10">
            <div className='text-[#1D907D] text-lg text-justify font-serif p-10 bg-[#f7c98f] rounded-xl shadow-md'>
            Esta plataforma foi desenvolvida para facilitar o gerenciamento de produtos e funcionários da empresa. 
            Com ela, é possível cadastrar e acompanhar os produtos, verificando detalhes como validade, estoque e categorias. 
            Além disso, permite o controle eficiente dos funcionários, mantendo um registro organizado e acessível.
            O objetivo é tornar a administração interna mais simples, rápida e prática, proporcionando uma navegação intuitiva 
            para que todos possam utilizar sem dificuldades.
                <p className="mt-4 font-bold text-[#d97667] text-center">✨ Seja bem-vindo à nova era do SuperJá.</p>
            </div>
            
            <div className='rounded-2xl p-6 flex flex-col items-center gap-4'>
            <h3 className="text-3xl text-center font-bold text-[#FB6822] mb-6">Desenvolvedoras do Produto</h3>
                </div>
            <div className="flex flex-wrap justify-center gap-6">
                
                {devas.map((deva) => (
                    <div className='w-72 border border-[#d0b75c] bg-[#fdf9f6] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-md'>
                        <h2 className='text-[#1D907D] text-xl font-bold text-center font-serif'>{deva.nome}</h2>
                        <p className='text-[#448476] text-center font-serif'>{deva.sobre}</p>
                        <img
                            src={deva.imagem}
                            alt={deva.nome}
                            className='w-2/3 mx-auto rounded-full border-2 border-[#f7c98f]'
                        />
                        <div className='flex gap-4 text-[#d97667]'>
                            <a href={deva.linkedin} target="_blank">
                                <LinkedinLogo size={32} weight='bold' />
                            </a>
                            <a href={deva.github} target="_blank">
                                <GithubLogo size={32} weight='bold' />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sobre;