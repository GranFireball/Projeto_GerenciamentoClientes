import './App.css';
import { useEffect, useState } from "react";
import ListaCliente from './components/listaCliente';
import FiltroCliente from './components/filtroCliente';
import FormCadastroCliente from './components/formCadastroCliente';
import MelhorRota from './components/melhorRota';

function App() {
  const [clientes, setClientes] = useState();
  const [listaClientes, setListaClientes] = useState();
  const [clientesOrdenados, setClientesOrdenados] = useState();
  const [calculandoRota, setCalculandoRota] = useState(false);

  useEffect(() => {
    obterClientes();
    obterClientesOrdenados();
  }, [])

 

  function obterClientes(){
    fetch("http://127.0.0.1:3001/clientes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      setClientes(json);
      setListaClientes(json);
    })
    .catch((err) => {
      alert(err);
    })
  }

  function obterClientesOrdenados(){
    setCalculandoRota(true);
    fetch("http://127.0.0.1:3001/clientesOrdenados", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      setClientesOrdenados(json);
      setCalculandoRota(false);
    })
    .catch((err) => {
      alert(err);
    })
  }

  return (
    <div className='containerGeral'>
      <header>
        <h2>Sistema de Gerenciamento de Clientes</h2>
      </header>
      <main>
        <FormCadastroCliente/>
        <FiltroCliente setClientes={setClientes}/>
        <ListaCliente clientes={clientes} setClientes={setClientes} listaClientes={listaClientes}/>
        <MelhorRota clientesOrdenados={clientesOrdenados} calculandoRota={calculandoRota}/>
      </main>
    </div>
  );
}

export default App;
