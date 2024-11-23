# Twygo UI

Projeto destinado a criação de uma SPA (Single Page Application) para a Twygo, uma plataforma de cursos online.

## Índice
- [Como rodar](#como-rodar)
  - [make start](#make-start)
  - [make stop](#make-stop)
- [Rotas](#rotas)
  - [cursos](#cursos)
  - [cursos/new](#novocurso)
  - [cursos/:slug](#pagina-do-curso)
  - [cursos/:slug/edit](#editar-curso)
  - [cursos/:slug/report](#relatorio-do-curso)
- [Bibliotecas utilizadas](#bibliotecas-utilizadas)



## Como rodar

Esse projeto conta com um Makefile para facilitar a execução de comandos. Para rodar o projeto, basta executar o comando `make start` e acessar o endereço `http://localhost:3001`.

### make start

Esse comando irá instalar as dependências do projeto e rodar o servidor de desenvolvimento.

```bash
make start
```

### make stop

Esse comando irá parar o servidor de desenvolvimento.

```bash
make stop
```

## Rotas

### Cursos `/cursos`

Essa rota é a página inicial da aplicação, onde são listados todos os cursos cadastrados.

### Novo Curso `/cursos/new`

Essa rota é responsável por criar um novo curso.

### Página do Curso `/cursos/:slug`

Essa rota é responsável por exibir os detalhes de um curso.

### Editar Curso `/cursos/:slug/edit`

Essa rota é responsável por editar um curso.

### Relatório do Curso `/cursos/:slug/report`

Essa rota é responsável por exibir e criar relatórios de um curso.

## Bibliotecas utilizadas

Com o foco de manter o projeto com o minimo de dependências possíveis, foram utilizadas as seguintes bibliotecas:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TanStack/react-query](https://react-query.tanstack.com/)
- [Axios](https://axios-http.com/)