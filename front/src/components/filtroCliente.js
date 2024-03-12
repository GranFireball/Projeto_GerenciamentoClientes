import { useRef } from "react";
import './filtroCliente.css';

export default function FiltroCliente({ setClientes }){
  const dadosCliente = ["nome", "email", "telefone", "coord_x", "coord_y"];
  const filtroTipoRef = useRef(dadosCliente[0]);
  const filtroConteudoRef = useRef();

  
  function filtrarClientes(){
    if(filtroConteudoRef.current.value.trim() !== ''){
      fetch("http://127.0.0.1:3001/filtroClientes", {
        method: "POST",
        body: JSON.stringify({"tipoDado": filtroTipoRef.current.value, "dado": filtroConteudoRef.current.value}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((data) => data.json())
      .then((json) => {
        if(json.length < 1){
          alert("Cliente não encontrado!");
        }
        else{
          setClientes(json);
        }
      })
      .catch((err) => {
        alert(err);
      })
    }
    
  }

  return(
    <div>
      <label>Filtrar por: </label>
          <select ref={filtroTipoRef}>
            {
              dadosCliente.map((dado) => {
                return(
                <option key={dado} value={dado}>{dado}</option>
                )
              })
            }
          </select>
          <input type="text" ref={filtroConteudoRef}/>
          <button onClick={filtrarClientes}>Pesquisar</button>
    </div>
  ) 
}