<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
 
 ![icon][icon]

  <h3 align="center"> Grupo boticario - CollaborateApi </h3>

  <p align="center">
    Projeto desenvolvido durante o processo seletivo
  </p>

[![App][Play-Store]][App-url]
[![Swagger][Swagger]][Swagger-url]
[![Frontend][React-Native]][Frontend-url]

</div>



<!-- TABLE OF CONTENTS -->
 <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
    </li>
     <li>
      <a href="#frontend">Frontend</a>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
        <li><a href="#executando-a-aplicação">Executando a aplicação</a></li>
        <li><a href="#executando-os-testes">Executando os testes</a></li>
      </ul>
    </li>
  </ol>



<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

Collaborate é uma api que tem o objetivo de listar e trazer informações sobre os repositorios mais populares de uma determinada tecnologia, utilizando a api oficial do github.

_Se você quiser testar a api em produção_ [o link para a documentação oficial](https://gb-collaborate-api.herokuapp.com/docs/)

<br/>

## Frontend

* [O app está disponível para download na google play store](https://choosealicense.com)
* [Github do projeto frontend](https://choosealicense.com)

<br/>


<!-- GETTING STARTED -->
## Começando

Instruções sobre como configurar este projeto localmente. 

<br/>

### Pré-requisitos

Antes de começar, é necessário ter instalado em sua máquina as seguintes ferramentas

* git
* docker
* docker-compose
* node
* npm

<br/>

### Instalação

_Para rodar o projeto local._

<br/>

1. Clone o repositório
   ```sh
   git clone https://github.com/larissacassel/gb-collaborate-api.git
   ```
<br/>

2. Entre no diretório
   ```sh
      cd gb-collaborate-api
   ```
 
<br/>

3. Instale as dependências do projeto
   ```sh
   npm install
   ```

<br/>

3. No arquivo `.env` adicione as seguintes variáveis

   ```js
    NODE_ENV="development"
    DB_LOCAL_URL='mongodb://db:27017'
    SECRET=jdDJDJiodjidIODJADOI378
   ```

    `SECRET=` exemplo de secret para test local


<br/>

<!-- USAGE EXAMPLES -->

### Executando a aplicação

* Iniciar o projeto

   ```js
        npm run dev

        //ou

        docker-compose-up
   ```

<br/>

* Todos os  _endpoints_ estarão disponíveis em `/docs`

    ```sh
        http://localhost:3000/docs/
    ```

<br/>
 
 ![swagger][endpoints-local-url]

<br/>

### Executando os testes

* Testes unitarios e de integração
   ```js
        npm run test
   ```
<br/>

* Cobertura de testes
   ```js
        npm run coverage
   ```

<br/>
  
![terminal-coverager][terminal-coverage]


<br/>
  
![html-coverage-image][coverage-image]

<br/>

_na raiz do projeto foi gerada um arquivo `coverage/index.html`_


<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->

<!-- TAGS -->
[Play-Store]: https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white
[App-url]: https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white
[Swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[React-Native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[Frontend-url]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB

<!-- IMAGES -->
[endpoints-local-url]:https://raw.githubusercontent.com/larissacassel/gb-collaborate-api/main/.github/swagger.png
[terminal-coverage]:https://raw.githubusercontent.com/larissacassel/gb-collaborate-api/main/.github/terminal_coverage.png
[coverage-image]:https://raw.githubusercontent.com/larissacassel/gb-collaborate-api/main/.github/coverage.png
[icon]: https://raw.githubusercontent.com/larissacassel/gb-collaborate-api/main/.github/gb_icon.png


[Swagger-url]:https://gb-collaborate-api.herokuapp.com/docs/