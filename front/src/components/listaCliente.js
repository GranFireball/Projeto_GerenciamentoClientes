import "./listaCliente.css";

export default function ListaCliente({ clientes, setClientes, listaClientes }){

  return(
    <div>
      <button onClick={() => setClientes(listaClientes)}>Listar todos os Clientes</button>
        <h3>Lista de Clientes</h3>
        <ul className="listaClientes">
          {
            clientes && 
            clientes.map((cliente, index) => {
              return(
                <li className="cliente" key={index}>Nome: {cliente.nome} - X: {cliente.coord_x}, Y: {cliente.coord_y}</li>
              )
            })
          }
        </ul>
    </div>
  )
}