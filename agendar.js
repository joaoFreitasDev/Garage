const btn = document.querySelector("#send");

//function fazPost(url, dados) {
//    let request = new XMLHttpRequest();
//    request.open("POST", url, true);
  //  request.setRequestHeader("Content-type", "aplication/json");
    //console.log(JSON.stringify(dados));
    //request.send(JSON.stringify(dados));

    //request.onload = function() {
    //    console.log(this.responseText);
    //};

    //return alert(request.responseText);
//};

btn.addEventListener("click", function(e) {
    e.preventDefault();
    const url = "http://localhost:5000/agendamentos";
    const data = document.querySelector("#data");
    const hora = document.querySelector("#horario");
    const dataHora = data.value + " " + hora.value;
    const servico= document.querySelector("#servicos");
    Number(servico);

    const dados = {"cliente_id": 15, "data": `${dataHora}`, "servico_id": servico.value};

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