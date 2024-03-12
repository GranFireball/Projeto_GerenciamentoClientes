const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

function combinacoes(clientes) {
  let resultado = [];

  function gerarCombinacoes(atual, restante, inicio, fim) {
      if (restante.length === 0) {
          resultado.push([clientes[0]].concat(atual).concat([clientes[clientes.length - 1]])); // Mantém o primeiro e o último elemento
      } else {
          for (let i = 0; i < restante.length; i++) {
              let proxAtual = atual.concat([restante[i]]);
              let proxRestante = restante.slice(0, i).concat(restante.slice(i + 1));
              gerarCombinacoes(proxAtual, proxRestante, inicio, fim);
          }
      }
  }

  let atual = []; // Inicia com clientesay vazio
  let restante = clientes.slice(1, clientes.length - 1); // Ignora o primeiro e o último elemento
  gerarCombinacoes(atual, restante, 1, clientes.length - 1);
  
  return resultado;
}

function calculaDistanciaRota(combinacao) {
  let somaX = 0;
  let somaY = 0;
  for (let i = 0; i < combinacao.length - 1; i++) {
      somaX += Math.abs(Number(combinacao[i + 1].coord_x) - Number(combinacao[i].coord_x));
      somaY += Math.abs(Number(combinacao[i + 1].coord_y) - Number(combinacao[i].coord_y));
  }
  return somaX + somaY;
}

function melhorCaminho(clientes){
  let melhorCaminho;
  let menorDistancia;
  let combinacoesGeradas = combinacoes(clientes);
  for (let i = 0; i < combinacoesGeradas.length; i++) {
    let combinacao = combinacoesGeradas[i];
    let distancia = calculaDistanciaRota(combinacao);
    if(i == 0){
      menorDistancia = distancia;
      melhorCaminho = combinacao;
    }
    if(distancia < menorDistancia){
      menorDistancia = distancia;
      melhorCaminho = combinacao;
    } 
  }
  return melhorCaminho;
}

app.get("/clientes", (req, res) => {
  const clientes = "SELECT * FROM clientes";
  pool.query(clientes).then((result) =>{
    res.send(result.rows);
  })
  .catch((err) => {
    res.send(err);
  })
})

app.get("/clientesOrdenados", (req, res) => {
  const clientes = "SELECT * FROM clientes";

  pool.query(clientes).then((result) => {
    let clientesNaoOrdenados = result.rows;
    clientesNaoOrdenados.push({coord_x: '0', coord_y: '0'});
    clientesNaoOrdenados.splice(0,0,{coord_x: '0', coord_y: '0'});

    let clientesOrdenados = melhorCaminho(clientesNaoOrdenados);
    clientesOrdenados.pop();
    clientesOrdenados.shift();

    res.send(clientesOrdenados);
  })
  .catch((err) => {
    res.send(err);
  })

})

app.post("/clientes", (req, res) => {
  const nome = req.body["nome"];
  const email = req.body["email"];
  const telefone = req.body["telefone"];
  const coord_x = req.body["coord_x"];
  const coord_y = req.body["coord_y"];

  const inserirCliente = `INSERT INTO clientes (nome, email, telefone, coord_x, coord_y) VALUES ('${nome}', '${email}', '${telefone}', '${coord_x}', '${coord_y}');`;

  pool.query(inserirCliente).then(() => {
    res.send("Cliente Cadastrado!");
  })
  .catch((err) => {
    res.send(err);
  })
})

app.post("/filtroClientes", (req, res) => {
  const tipoDado = req.body["tipoDado"];
  const dado = req.body["dado"];

  const filtrarClientes = `SELECT * FROM clientes WHERE ${tipoDado} = '${dado}';`;

  pool.query(filtrarClientes).then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    res.send(err);
  })
})

app.listen(3001, () => console.log("Server on localhost:3001"));