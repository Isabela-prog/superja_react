import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ToastAlerta } from '../../../utils/ToastAlerta';

interface Usuario {
  id: number;
  name: string;
}

function ListarUsuarios() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  async function consultarUsuarios() {

    try {
      await consultar('/users', setUsuarios);
    } catch (error: any) {
      ToastAlerta('Erro!', 'erro')
    }
    
  }

  useEffect(() => {
    consultarUsuarios();
  }, []);

  return (
    <div className='lista'>
      <h1>Lista de usuários - Gerada pelo Axios</h1>
      <ul>
        {usuarios.map( (usuario) => (
          <li key={usuario.id}>{usuario.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListarUsuarios;

function consultar(_arg0: string, _setUsuarios: Dispatch<SetStateAction<Usuario[]>>) {
    throw new Error('Function not implemented.');
}
