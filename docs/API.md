# Endpoints + Perfis de acesso

| Método | Endpoint          | Objetivo                                 | Admin  | Operator | Client  | Sem token |
| ------ | ----------------- | ---------------------------------------- | ------ | -------- | ------- | --------- |
| POST   | `/users/register` | Cadastrar nova conta                     | ✅ 201 | ✅ 201    | ✅ 201  | ✅ 201     |
| POST   | `/users/login`    | Login                                    | ✅ 200 | ✅ 200    | ✅ 200  | ✅ 200     |
| POST   | `/users`          | Criar um novo usuário                    | ✅ 201 | ❌ 403    | ❌ 403  | ❌ 401     |
| GET    | `/users`          | Visualizar todos os usuários             | ✅ 200 | ✅ 200    | ❌ 403  | ❌ 401     |
| GET    | `/users/{id}`     | Visualizar o próprio cadastro            | ✅ 200 | ✅ 200    | ✅ 200  | ❌ 401     |
| GET    | `/users/{id}`     | Visualizar o cadastro de outros usuários | ✅ 200 | ✅ 200    | ❌ 403  | ❌ 401     |
| PUT    | `/users/{id}`     | Atualizar o próprio cadastro             | ✅ 200 | ✅ 200    | ✅ 200  | ❌ 401     |
| PUT    | `/users/{id}`     | Atualizar o cadastro de outros usuários  | ✅ 200 | ✅ 200    | ❌ 403  | ❌ 401     |
| DELETE | `/users/{id}`     | Deletar usuários                         | ✅ 204 | ❌ 403    | ❌ 403  | ❌ 401     |


## Códigos de resposta

| Código | Significado           | Quando ocorre                               |
|--------|-----------------------|---------------------------------------------|
| 200    | OK                    | Requisição bem-sucedida (GET, PUT)          |
| 201    | Created               | Recurso criado (POST)                       |
| 204    | No Content            | Recurso removido (DELETE)                   |
| 400    | Bad Request           | Credenciais inválidas, email duplicado      |
| 401    | Unauthorized          | Sem token, token inválido ou expirado       |
| 403    | Forbidden             | Token válido, mas sem permissão para a ação |
| 404    | Not Found             | Recurso não encontrado                      |
| 500    | Internal Server Error | Erro inesperado no servidor                 |


# JWT
**Informações armazenadas no token:**
- Id do usuário (`id`)
- Perfil do usuário (`role`)
- Emitido em (`iat`)
- Expira em (`exp`)

**Algoritmo:** HS256
**Secret:** configurado na variável `JWT_TOKEN_SECRET` no `.env`

**Política de expiração:**
O token tem validade de _1 hora_, equilibrando segurança e usabilidade, já que períodos curtos limitam o risco de vazamento de dados. 
Para renovar o token, basta fazer um novo login.


# OAuth 2.0

O OAuth 2.0 é um protocolo de autorização que permite que aplicações de terceiros acessem recursos protegidos em nome do usuário, _sem que a senha seja compartilhada_.

## Concessão de acesso
No fluxo Authorization Code: 
- A aplicação parceira redireciona o usuário para o provedor de identidade. 
- O usuário autentica e autoriza o acesso. 
- O provedor devolve um _authorization code_ à aplicação, que troca esse code por um **access token**.

## Utilização de tokens
- O **access token** é enviado no header `Authorization: Bearer <token>` em cada requisição à API. 
- Tokens têm tempo de expiração curto e podem ser renovados via _refresh token_, _sem exigir novo login_.

## Benefícios
- **Não compartilhamento de senha**: o usuário autoriza o acesso sem expor suas credenciais.
- **Delegação minuciosa de permissões**: o acesso é limitado por escopos definidos na autorização.
- **Revogação fácil**: é possível remover o acesso de uma aplicação sem alterar a senha da conta.
- **Auditoria**: cada acesso é rastreável ao token e à aplicação que o solicitou.

## Aplicação nesta solução
OAuth 2.0 poderia ser aplicado caso a API fosse consumida por aplicações parceiras (por exemplo, um sistema externo de RH). 
Nesse cenário, a aplicação parceira precisaria ser registrada, e o usuário autorizaria o acesso aos seus dados sem compartilhar a sua senha. 
A API precisaria expor endpoints de autorização (`/authorize`) e para emissão de tokens (`/token`), além de gerenciar permissões de acesso a informações e consentimento de compartilhamento de dados, para poder executar a integração.

# Análise de Segurança

## Implementado
- Hash de senha com bcrypt (10 rounds)
- Campo `password` com `select: false` — para não retornar essa informação em consultas
- JWT com expiração de 1 hora
- Middleware de autenticação (retorna código 401 quando não está autenticado)
- Middleware de autorização por perfil (retorna código 403 quando não possui permissão)
- Cliente não pode alterar qual é o tipo do próprio perfil (impedindo conceder privilégios mais altos)
- Cadastro de nova conta (através de rota pública) força o tipo de perfil `client`(possui apenas permissões básicas)
- Email único por usuário, garantido por índice no banco e validação na aplicação
- Credenciais armazenadas em variáveis de ambiente (`.env`), evitando expor informações sensíveis
- Mensagens genéricas para erros, sem revelar informações sensíveis

## Riscos identificados
- **Token em trânsito**: implementação pendente (HTTPS obrigatório em produção)
- **Sessões longas**: sem refresh token, o usuário precisa logar de novo a cada 1h

## Melhorias futuras
- Refresh token para renovação sem precisar logar novamente
- HTTPS obrigatório em produção
- Validação de força de senha (além do mínimo de 8 caracteres)
- Registro de logs
