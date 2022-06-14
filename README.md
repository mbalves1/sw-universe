 Star Wars
Consumindo API swapi.

Foi utilizado Vuejs com vuetify para desenvolvimento das telas.

A atividade consiste em criação da tela inicial, com um carousel onde podemos ver os filmes da franquia, com nome, data de lançamento e banner do filme. Na parte de baixo temos um carousel com todos integrates do filme. Foi utilizado Axios na Vuex para fazer as requisições e usado o gerenciador de estado para fazer a integração com toda a aplicação.

Os cards dos filmes são clicaveis, e direcionam para tela 2, onde temos o resumo do filme, ano de lançamento, produtor e diretor. Na parte de baixo temos um carousel com todos os atores que participaram daquele filme. Mais embaixo temos um formulário para deixar comentários. Preenchendo o formulário, conseguimos vizualizar o POST sendo criado, na vuex temos as actions que faz o direcionamento e montagem da requisição.

Criando no titulo Star Wars Universe no header, somos direcionados para tela inicial.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
