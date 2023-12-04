const btn = document.querySelector("#send");

async function fazGet() {
  const url = 'http://localhost:5000/usuarioAtivo'; // Substitua pela URL da sua API

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }
    
    const data = await response.json(); // ou response.text() para dados de texto
    // Ou realize alguma operação com os dados aqui
    JSON.stringify(data);
    return data["0"]["userActive"]
     // Exemplo de uso dos dados aqui // Se precisar retornar os dados para uso externo à função
  } catch (error) { 
    console.error('Erro:', error);
    return null; // Ou trate o erro de outra maneira, retornando um valor padrão, por exemplo
  }
}


btn.addEventListener("click", async function(e) {
    e.preventDefault();
    const url = "http://localhost:5000/agendamentos";
    const data = document.querySelector("#data");
    const hora = document.querySelector("#horario");
    const dataHora = data.value + " " + hora.value;
    const servico= document.querySelector("#servicos");
    Number(servico);
   
    const id = await fazGet()
    
    
    const dados = {"cliente_id": id,  "servico_id": servico.value,"data": dataHora,};

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dados)
    };

    fetch(url, options)
        .then(function(response) {
            if (response.ok) {
                return response.json();
                alert("Dados cadastrados com sucesso!")
            }
        })
        .then(function(data) {
            console.log(data); // Dados da resposta
          })
        .catch(error => {
          // Lidando com erros durante a requisição
          console.log('Erro ao obter dados da API:', error);
        });
});

function agendado(){
  fetch(apiUrl)
  .then(response => {
    // Verificando se a resposta da API foi bem-sucedida (status 200)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    // Convertendo a resposta para JSON
    return response.json();
  })
  .then(data => {
    // Manipulando os dados obtidos da API
    console.log(data);
    // Faça o que precisar com os dados aqui
  })
  .catch(error => {
    // Lidando com erros durante a requisição
    console.error('Erro ao obter dados da API:', error);
  });
}

window.addEventListener('beforeunload', async function(e) {
  // Aqui você pode executar ações quando a página está  sendo descarregada
  // É importante notar que as ações aqui são limitadas e não garantem execução completa
  e.preventDefault()
  const id = await fazGet()
  
  const requestOptions = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json', // Se necessário, ajuste o tipo de conteúdo
      // Outros cabeçalhos necessários podem ser adicionados aqui
    },
  };
  
  // Faz a requisição DELETE usando fetch
  fetch("http://localhost:5000/usuarioAtivo"+"/"+id, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Não foi possível excluir o recurso');
      }
      return response.json();
    })
    .then(data => {
      console.log('Recurso excluído:', data); // Exibe os dados do recurso excluído
      // Faça algo com a resposta, se necessário
    })
    .catch(error => {
      console.error('Erro ao excluir recurso:', error);
      // Trate o erro adequadamente
    });
  // Por exemplo, você pode registrar dados de rastreamento ou limpar algo
});

