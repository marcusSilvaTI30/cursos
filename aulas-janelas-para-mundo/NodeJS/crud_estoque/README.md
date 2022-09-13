# Microsserviço  de estoque com NodeJS #

Este é um projeto desenvolvido em sala de aula com os alunos do curso Let´s Code oferecido pelos Centros de Educação Janela para o Mundo. Ele tem como objetivo a disseminação de conhecimento sobre Node e outras tecnologias relacionadas.

Este  projeto almeja a criação de um microsserviço.

# Composição dos serviços que serão disponibilizados nesta API #
No presente projeto temos disponibilizados os seguintes  endpoints:

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
* Execute o seguinte comando para realizar a instalação das dependências necessárias para a execução do projeto:
    npm install
* Execute o seguinte comando para iniciar o servidor:
    npm run dev
* Acesse a seguinte URL numa ferramenta de teste de API REST de sua preferência   
    http://localhost:3000/categorias
