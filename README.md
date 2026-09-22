# Objetivo do projeto
Criar uma API REST para registro de usuários com autenticação JWT e controle de acesso por perfis. 
_Desenvolvido para a disciplina de Sistemas Web Seguros._

# Documentação da API
A documentação detalhada dos endpoints, autenticação JWT, OAuth 2.0 e análise de segurança está em [docs/API.md](docs/API.md).

# Tecnologias Utilizadas
- Node.js
- Express
- Mongo DB
- Mongoose
- Docker

# Como instalar

> **Pré-requisito:** Node.js 20+ (verifique com `node -v`). O projeto inclui um arquivo `.nvmrc`; se você usa `nvm`, rode `nvm use` antes de instalar as dependências.

0. Selecionar a versão do node (se usar nvm) 
```bash
nvm use
```

1. Instalar as dependências do projeto
``` bash
npm install 
```

2. Copiar o arquivo `.env` 
```bash
cp .env.example .env
```

3. Substituir as variáveis
```text
DATABASE_URL=mongodb://admin:senha@127.0.0.1:27017/registro_usuarios?authSource=admin
JWT_TOKEN_SECRET=troque_por_uma_chave_secreta
```
**MongoDB no Docker + API local:** `mongodb://admin:senha@127.0.0.1:27017/registro_usuarios?authSource=admin`

**MongoDB + API no Docker:** `mongodb://admin:senha@mongodb:27017/registro_usuarios?authSource=admin`


# Como executar

### MongoDB no Docker + API local:

1. Subir o banco (Docker) 
```bash
docker run -d --name mongodb-registro-usuarios -p 127.0.0.1:27017:27017 -v ${PWD}/data/mongo:/data/db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senha mongo:latest
```
> O Docker criará automaticamente a pasta `data/mongo` se ela não existir.


2. Popular o banco de dados digitando o comando no terminal (dentro da pasta do projeto)
```bash
npm run seed
```

3. Subir a API com o seguinte comando
```bash
npm start
```
> **(!) É essencial que o banco esteja disponível antes dos passos 2 e 3.**


# Como testar
O banco irá subir com 3 usuários padrão pré-configurados:

| Email              | Senha    | Perfil   |
|--------------------|----------|----------|
| admin@teste.com    | senha123 | Admin    |
| operator@teste.com | senha123 | Operator |
| client@teste.com   | senha123 | Client   |

[Mais informações sobre as permissões](docs/API.md)


### Endpoints
Você poderá testar cada perfil (e criar um novo) através dos seguintes endpoints:

| Método | Endpoint         | Objetivo                      |
| ------ | ---------------- | ----------------------------- |
| POST   | `/users/register`| Cadastrar nova conta          |
| POST   | `/users/login`   | Login                         |
| POST   | `/users`         | Criar novo usuário            |
| GET    | `/users`         | Listar todos os usuários      |
| GET    | `/users/{id}`    | Visualizar usuário específico |
| PUT    | `/users/{id}`    | Atualizar usuário específico  |
| DELETE | `/users/{id}`    | Deletar usuário específico    |


### Autenticação
Cada vez que você fizer login, será gerado um novo token JWT. Esse token tem duração de 1h, e guarda as informações do id da sua conta e o seu tipo de perfil. 
Antes de acessar cada um dos endpoints listados com as suas credenciais, você precisa copiar esse token e colar no `Authentication → Bearer Token`.

**Fluxo de teste sugerido:**
1. Faça login com um dos usuários acima em `POST /users/login` para obter o token JWT.
2. Use o token nas rotas protegidas no header `Authorization: Bearer <token>`.
3. Para testar o registro público, use `POST /users/register` (o perfil criado será sempre `client`).


# Evidências
- Vídeo de demonstração: [link](https://youtu.be/eaJ63HldOcM)

> **Nota:** esta entrega contempla apenas o back-end. A demonstração das funcionalidades é feita via vídeo, e os endpoints estão documentados em [docs/API.md](docs/API.md).
