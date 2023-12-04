

const btn = document.querySelector("#login");

const email = document.querySelector("#email")
const password = document.querySelector("#password")

btn.addEventListener("click", function(e){
    e.preventDefault();

    fazGet()

})

function fazGet(){
    let cont 
    cont = 0
    let data

    const login = email.value
    const key = password.value
    toString(key)
    console.log(key)
    const url = "http://localhost:5000/clientes"
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
            if (dados[c]["email"] === login)
                var userId = dados[c]["id"]
                let senha = dados[c]["senha"]
                if (senha == key) {
                    fazPost(userId)
                    alert("Login efetuado com sucesso!")
                    window.location.href = "./agendar.html"
                }    
                cont ++      
        }
        
    })
    .catch(error => {
        // Lidando com erros durante a requisição
        console.error('Erro ao obter dados da API:', error);
    });
}
 function fazPost(id) {
    const url = 'http://localhost:5000/usuarioAtivo';
    const data = {
    "id": id
    };

    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro ao fazer POST');
        }
        return response.json();
    })
    .then(data => {
        console.log('POST bem-sucedido:', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}
