# TodoList_Stoix

TodoList_Stoix é uma aplicação de gerenciamento de tarefas (todo list), onde é possível realizar cadastro, login e operações CRUD (criar, ler, atualizar e excluir) de tarefas específicas para cada usuário.

## Tecnologias Utilizadas

### Backend:
- **Servidor:** Wamp Server
- **Banco de Dados:** MySQL (gerado pelo Wamp Server, com possibilidade de ajuste para produção)
- **Linguagem:** PHP

### Frontend:
- **Framework:** React
- **Gerenciador de Pacotes:** NPM ou Yarn

## Instalação

### Clonando os Repositórios

#### Frontend:
```bash
# Clone a branch FrontEnd
git clone -b FrontEnd https://github.com/seuusuario/todolist_stoix.git
cd todolist_stoix

# Instale as dependências
npm install
# ou
yarn install
```

#### Backend:
```bash
# Clone a branch BackEnd
git clone -b BackEnd https://github.com/seuusuario/todolist_stoix.git
cd todolist_stoix
```

### Configurando o Servidor Backend

- **Requisitos**: Wamp Server (para testes em nível de desenvolvimento) ou um servidor com Apache para produção.
- Certifique-se de configurar corretamente as credenciais do banco de dados no arquivo `db.php` do backend, caso esteja usando um banco de produção.
- O script para criar o banco de dados está disponível na branch `db`. 

### Script de Banco de Dados:
O script para criar as tabelas necessárias estará disponível na branch `db`. Certifique-se de executá-lo no seu ambiente MySQL antes de iniciar o backend.

## Executando o Projeto

### Backend:
1. Certifique-se de que o Wamp Server está ativo.
2. Coloque os arquivos do backend na pasta raiz do servidor Apache ou no diretório configurado.
3. Acesse o projeto pelo navegador ou via cliente HTTP (exemplo: Postman ou Insomnia).

### Frontend:
1. Inicie o servidor de desenvolvimento React:
   ```bash
   npm start
   # ou
   yarn start
   ```
2. Acesse o projeto pelo navegador no endereço `http://localhost:3000`.

## Rotas da API

### **/api/login**
- Método: `POST`
- Descrição: Realiza o login do usuário.
- Parâmetros esperados no corpo da requisição:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- Resposta:
  ```json
  {
    "message": "Login realizado com sucesso.",
    "user": {
      "id": "number",
      "username": "string"
    }
  }
  ```

### **/api/users**
- Método: `GET`
- Descrição: Retorna todos os usuários cadastrados. (Apenas para uso em nível de desenvolvimento, deve ser desativada em produção.)

### **/api/tasks/{userId}**
- Métodos: `GET`, `POST`, `PUT`, `DELETE`
- Descrição: Permite realizar operações CRUD nas tarefas de um usuário específico.
- Parâmetros esperados para o `POST` ou `PUT`:
  ```json
  {
    "description": "string",
    "status": "string"
  }
  ```

## Considerações Finais

- O projeto foi desenvolvido para funcionar em ambientes de desenvolvimento local.
- Certifique-se de ajustar as configurações de ambiente e segurança antes de implantar o projeto em produção.
- Caso encontre problemas ou tenha dúvidas, sinta-se à vontade para abrir uma issue no repositório.

---

Desenvolvido com dedicação por David Rafael de Lima Sousa!