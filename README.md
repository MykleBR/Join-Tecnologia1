# Frontend do Projeto de Geolocalização

Este é o frontend do projeto de geolocalização, desenvolvido em Vue.js.

## Configuração do Ambiente

1. Certifique-se de ter o [Node.js 14.17](https://nodejs.org/) instalado.
2. Clone o repositório:
    https://github.com/MykleBR/Join-Tecnologia1

## Instalação npm

npm install


### compilar e recarregar o projeto

npm run serve

### frontend estará disponível em http://localhost:8080/.


Estrutura do Projeto

    src/components/CoordinateModal.vue: Componente Vue.js responsável pela exibição do modal de coordenadas para adição ou edição de alvos.

    src/router/index.js: Configuração das rotas Vue Router para a aplicação.

    src/view/HomeView.vue: Página principal que exibe o mapa e interage com o componente CoordinateModal.

    src/App.vue: Componente raiz da aplicação.

    src/main.js: Arquivo principal que inicializa a aplicação Vue.js, configura o Axios para comunicação com o backend, e monta a aplicação no elemento #app.

### Componente CoordinateModal

    O componente CoordinateModal.vue é responsável por exibir um modal para adição ou edição de alvos. Ele se comunica com o backend para salvar e excluir alvos.
    Página HomeView

### HomeView.vue

    A página HomeView.vue contém a visualização principal do mapa, lista de alvos e interações com o usuário.
    Configuração do Axios

### Axios

    O Axios é configurado para se comunicar com o backend. Certifique-se de ajustar a URL do backend em src/main.js conforme necessário.

    const backendUrl = 'http://127.0.0.1:8000/';
    app.config.globalProperties.$axios = axios.create({
        baseURL: backendUrl,
    });

### Dicas de Desenvolvimento

    Utilize o Vue DevTools para facilitar o desenvolvimento e depuração.



