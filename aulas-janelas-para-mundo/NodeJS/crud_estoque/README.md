# Microsserviço  de estoque com NodeJS #

Este é um projeto desenvolvido ministrado em sala de aula junto com os alunos do curso oferecido pela Janelas para o Mundo. Tendo como objetivo a dissiminação de conhecimento sobre Node e outras tecnologias relacionadas.

Neste projeto tem como objetivo a criação de um microsserviço.

# Composição dos serviços que serão disponibilizados nesta API #
No presente projeto temos disponibilizados os seguintes # endpoints #:

# Categoria #
* GET /categorias
* GET /categorias/:id
* POST /categorias
* PUT /categorias/:id
* DELETE /categorias/:id
* Modelo de objeto: 
    {     
        "descricao": "exemplo_descricao"
    }
    
#  #

# Execução do projeto #
* Execute o seguinte comando para realizar a intalação das dependências necessárias para a execução do projeto:
    npm install
* Execute o seguinte comando para iniciar o servidor:
    npm run dev
* Acesse a seguinte URL numa ferramenta de teste de API REST de sua preferência   
    http://localhost:3000/categorias
