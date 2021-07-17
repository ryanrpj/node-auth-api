[![codebeat badge](https://codebeat.co/badges/03f96f99-38ae-4fde-ab5b-434c72933951)](https://codebeat.co/projects/github-com-esan2019-node-auth-api-main)

# 🔐 Auth API
> Uma API segura, altamente escalável.

Este é um projeto pessoal onde mostro uma arquitetura robusta e flexível de uma API RESTful em Node.js. Várias tecnologias em alta demanda no mercado foram utilizadas, como JWT para validação de identidade, argon2 para hash de senhas, MongoDB e Mongoose para persistência de dados.

# 🚀 Executando o projeto
Antes de tudo, é necessário criar um arquivo ```.env``` no diretório raiz do projeto, seguindo a mesma estrutura do [arquivo .env.example](/.env.example), que também se encontra no diretório raiz.

Após criar o arquivo e preencher os dados necessários, é hora de baixar as dependências utilizando ```npm --install``` ou ```yarn```.

Com as dependências instaladas, o projeto já está pronto para ser executado. Há duas formas de fazer isso: executar em modo de produção, utilizando ```npm start``` ou ```yarn run start```, ou em modo de desenvolvimento utilizando ```npm run dev``` ou ```yarn run dev```. Executar em modo de desenvolvimento irá mostrar algumas informações úteis no console, como por exemplo, o status de conexão com o banco de dados.

# 🧪 Testando
O projeto contém uma bateria de 20 testes unitários que podem ser executados com ```npm test``` ou ```yarn run test```. Lembrando que antes de rodar os testes, é necessário compilar o código fonte utilizando ```tsc``` ou ```yarn run tsc```.

# 📃 Documentação dos endpoints
A documentação segue a seguinte convenção: rotas públicas que não requerem autenticação são prefixadas com (✅). Rotas protegidas requerem um cabeçalho de autenticação no estilo ```Bearer <token>```, e são prefixadas com (🔒).

---
### ✅ **POST** ```/auth```

Autentica o usuário, e retorna um ```Bearer token``` que deverá ser utilizado nos endpoints protegidos.

Parâmetros obrigatórios no corpo da requisição:
- email: ```string``` | E-mail do usuário
- password: ```string``` | Senha do usuário

Exemplo de resposta:
```json
{
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjM0YzYzNjgwYTU4NTlmZWQ5MGZhNCIsImZpcnN0TmFtZSI6IkVzYW4iLCJsYXN0TmFtZSI6IkRldmVsb3BlciIsImVtYWlsIjoiZXNhbmRldmVsb3BlckBwcm90b25tYWlsLmNvbSIsImlhdCI6MTYyNjU1NzU1NH0.U66KyYM1wvptjompOCq6caPuP4GQ4uUHBWfCvRL5n01nS-87NsXeQ9TlbyXdRaqFSinmlMAb1Bi5PTAy1pF7JQ"
}
```
---
### ✅ **GET** ```/user/<userId>```
>```userId``` ID válido de um usuário

Retorna os dados de um único usuário.

Exemplo de resposta:
```json
{
    "id": "60f1b00153b295422764528f",
    "firstName": "Esan",
    "lastName": "Developer",
    "email": "esandeveloper@protonmail.com",
}
```
---
### ✅ **GET** ```/users```

Retorna um array contendo todos os usuários. Um array vazio é retornado caso não haja nenhum usuário cadastrado.

Exemplo de resposta:
```json
[
    {
        "id": "60f1b00153b295422764528f",
        "firstName": "Esan",
        "lastName": "Developer",
        "email": "esandeveloper@protonmail.com",
    },
    ...
]
```
---
### ✅ **POST** ```/users```

Cadastra um novo usuário no sistema, e retorna o ID do novo usuário cadastrado.

Parâmetros obrigatórios no corpo da requisição:
- firstName: ```string``` | Nome do usuário
- lastName: ```string``` | Sobrenome do usuário
- email: ```string``` | E-mail do usuário
- password: ```string``` | Senha do usuário

Exemplo de resposta:
```json
{
    "created": "60f1b00153b295422764528f"
}
```
---
### 🔒 **PATCH** ```/user/<userId>```
>```userId``` ID válido de um usuário

Edita as informações de um determinado usuário, e retorna o usuário atualizado. Um usuário só pode alterar as próprias informações. Qualquer tentativa de alterar informações de outros usuário será em vão.

Parâmetros opcionais no corpo da requisição:
- firstName: ```string``` | Nome do usuário
- lastName: ```string``` | Sobrenome do usuário
- email: ```string``` | E-mail do usuário
- password: ```string``` | Senha do usuário

Todos os parâmetros acima são opcionais, sendo assim, apenas um deles, todos, ou nenhum podem ser enviados.

Exemplo de resposta:
```json
{
    "id": "60f1b00153b295422764528f",
    "firstName": "Esan",
    "lastName": "Smith",
    "email": "esandeveloper@protonmail.com",
}
```
---
### 🔒 **PUT** ```/user/<userId>```
>```userId``` ID válido de um usuário

Edita todas as informações de um determinado usuário, e retorna o usuário atualizado. Um usuário só pode alterar as próprias informações. Qualquer tentativa de alterar informações de outro usuário será em vão.

Parâmetros obrigatórios no corpo da requisição:
- firstName: ```string``` | Nome do usuário
- lastName: ```string``` | Sobrenome do usuário
- email: ```string``` | E-mail do usuário
- password: ```string``` | Senha do usuário

Exemplo de resposta:
```json
{
    "id": "60f1b00153b295422764528f",
    "firstName": "Esan",
    "lastName": "Woelfel",
    "email": "esandeveloper@protonmail.com",
}
```
---
### 🔒 **DELETE** ```/user/<userId>```
>```userId``` ID válido de um usuário

Deleta permanentemente um usuário do sistema, e retorna o ID do usuário deletado. Um usuário só pode deletar a si mesmo. Qualquer tentativa de deletar outro usuário será em vão.

Exemplo de resposta:
```json
{
    "deleted": "60f1b00153b295422764528f",
}
```
---