import { useRef, useState } from "react";
import './formCadastroCliente.css';

export default function FormCadastroCliente(){
  const cadastroClienteRef = useRef();
  const [cadastrar, setCadastrar] = useState(false);

  function cadastrarCliente(){
    fetch("http://127.0.0.1:3001/clientes", {
      method: "POST",
      body: JSON.stringify({
        "nome": cadastroClienteRef.current.nome.value,
        "email": cadastroClienteRef.current.email.value,
        "telefone": cadastroClienteRef.current.telefone.value,
        "coord_x": cadastroClienteRef.current.coord_x.value,
        "coord_y": cadastroClienteRef.current.coord_y.value,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((data) => data.json())
    .then((json) => {
      alert(json);
    })
    .catch((err) => {
      alert(err);
    })
  }

  return(
    <div>
      {
        cadastrar === false ?

        <button onClick={() => setCadastrar(true)}>Cadastrar Novo Cliente</button>

        :
        <div className="formContainer">
        <button onClick={() => setCadastrar(false)} className="btnCancelar">x</button>
        <h4>Cadastro de Cliente</h4>
        <form ref={cadastroClienteRef} onSubmit={cadastrarCliente}>
          <label>
            Nome: 
            <input required type="text" name="nome"/>
          </label>
          <label>
            Email: 
            <input required type="text" name="email"/>
          </label>
          <label>
            Telefone: 
            <input required type="text" name="telefone"/>
          </label>
          <label>
            Coordenada X: 
            <input required type="text" name="coord_x"/>
          </label>
          <label>
            Coordenada Y: 
            <input required type="text" name="coord_y"/>
          </label>
          <button type="submit" className="btnConfirmar">Confirmar</button>  
        </form>
       </div>
      }
      
    </div>
    
  )
}