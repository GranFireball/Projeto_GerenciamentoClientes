import { useState } from "react";
import "./melhorRota.css";

export default function MelhorRota({ clientesOrdenados, calculandoRota }){
  const [mostraCaminho, setMostraCaminho] = useState(false);
  return(
    <div>
      {
        mostraCaminho === true ?
        <dialog open={mostraCaminho}>
          <button onClick={() => setMostraCaminho(false)} className="btnCancelar">x</button>
          <h3 className="titleMelhorRota">Melhor Rota</h3>
          {
            calculandoRota === true ?
            <p>Calculando Rota...</p>
            :
            <ol>
            {
              clientesOrdenados   && 
              clientesOrdenados.map((cliente, index) => {
                return(
                  <li key={index}>
                    <span>Nome: {cliente.nome}</span>
                    <div>
                      <p>X: {cliente.coord_x}</p>
                      <p>Y: {cliente.coord_y}</p>
                    </div>
                  </li>
                )
              })
            }
          </ol>
          }
         
        </dialog>
        :
        <button onClick={() => setMostraCaminho(true)}>Melhor Rota</button>
      }
    </div>
  )
}