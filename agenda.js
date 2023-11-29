function criaLinha(dados){
    linha = document.createElemen("tr")
    tdNome = document.createElement("td")
    tdData = document.createElement("td")
    tdData.innerHTML = dados.nome
    tdNome.innerHTML = dados.data

    linha.appendChild(tdNome)
    linha.appendChild(tdData)
}

function fazGet(){
    let cont 
    cont = 0
    let data
    const user = "Jhon Wick"
    const url = "http://localhost:5000/agendamentos"
    fetch(url)
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
        let dados
        dados = data
        for(let c in dados){
            if (dados[c]["nome"] === user)
                console.log(dados[c])
                cont ++      
        }
    })
    .catch(error => {
        // Lidando com erros durante a requisição
        console.error('Erro ao obter dados da API:', error);
    });
}


fazGet()