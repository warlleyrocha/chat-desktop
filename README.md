<h1 align="center">Chat Desktop</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Angular&message=21.2&color=DD0031&style=for-the-badge&logo=angular"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=5.9&color=3178C6&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Tailwind%20CSS&message=4.1&color=38BDF8&style=for-the-badge&logo=tailwindcss"/>
  <img src="https://img.shields.io/static/v1?label=Vitest&message=4.0&color=6E9F18&style=for-the-badge&logo=vitest"/>
  <img src="https://img.shields.io/static/v1?label=RxJS&message=7.8&color=B7178C&style=for-the-badge&logo=reactivex"/>
  <img src="https://img.shields.io/static/v1?label=npm&message=11.14&color=CB3837&style=for-the-badge&logo=npm"/>
</p>

### Tópicos

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Arquitetura](#arquitetura)

:small_blue_diamond: [Fluxo da aplicação](#fluxo-da-aplicação)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

:small_blue_diamond: [Build e testes](#build-e-testes)

:small_blue_diamond: [Protótipos visuais](#protótipos-visuais)

:small_blue_diamond: [Pontos de atenção](#pontos-de-atenção)

:small_blue_diamond: [Tecnologias utilizadas](#tecnologias-utilizadas-books)

:small_blue_diamond: [Desenvolvedor](#desenvolvedor-octocat)

---

## Descrição do projeto

<p align="justify">
  Chat Desktop é uma aplicação web de chat com foco em experiência desktop. A tela principal abre diretamente em uma interface de conversa, combinando lista de conversas, janela ativa, envio local de mensagens, menu lateral de conta e suporte a tema claro/escuro.
</p>

<p align="justify">
  O projeto usa Angular com componentes standalone, estado local baseado em signals e estilos com Tailwind CSS. A base atual funciona como protótipo funcional da interface, com dados mockados para conversas, mensagens e conta do usuário.
</p>

---

## Funcionalidades

### Conversas

:heavy_check_mark: Listagem de conversas com estado ativo

:heavy_check_mark: Contador de mensagens não lidas por conversa

:heavy_check_mark: Seleção de conversa com limpeza do contador de não lidas

:heavy_check_mark: Busca visual preparada no painel lateral

### Janela de chat

:heavy_check_mark: Header com avatar, nome da conversa e status

:heavy_check_mark: Agrupamento visual de mensagens recebidas e enviadas

:heavy_check_mark: Bolhas com cauda, horário e indicador visual de entrega/leitura

:heavy_check_mark: Estado vazio quando não houver conversa selecionada

:heavy_check_mark: Envio local de novas mensagens pelo formulário

### Layout desktop

:heavy_check_mark: Tela em duas colunas: lista de conversas e chat ativo

:heavy_check_mark: Painel esquerdo redimensionável por drag horizontal

:heavy_check_mark: Scroll customizado sem barra visível

:heavy_check_mark: Interface em altura total da viewport

### Menu lateral

:heavy_check_mark: Abertura pelo botão de menu

:heavy_check_mark: Overlay com fechamento ao clicar fora

:heavy_check_mark: Bloco de perfil com avatar, nome e status

:heavy_check_mark: Submenu expansível de conta

:heavy_check_mark: Itens de navegação visual para perfil, grupos, canais, contatos, chamadas, mensagens salvas e configurações

### Tema

:heavy_check_mark: Alternância entre tema claro e escuro

:heavy_check_mark: Persistência da preferência em `localStorage`

:heavy_check_mark: Detecção inicial por `prefers-color-scheme`

:heavy_check_mark: Script inline em `index.html` para aplicar o tema antes do bootstrap do Angular

---

## Arquitetura

O projeto segue uma organização por responsabilidade, separando base de aplicação, serviços globais, features, layout e recursos compartilhados.

```text
src/
├── app/
│   ├── app.component.ts          # Componente raiz standalone
│   ├── app.config.ts             # Providers globais da aplicação
│   ├── app.html                  # Entrada visual do layout principal
│   ├── core/
│   │   ├── core.providers.ts     # Inicialização de providers centrais
│   │   └── services/
│   │       ├── chat.service.ts   # Estado local de conversas e mensagens
│   │       ├── menu.service.ts   # Estado de abertura do menu lateral
│   │       └── theme.service.ts  # Estado e persistência do tema
│   ├── features/
│   │   ├── chat/
│   │   │   ├── chat-window/      # Janela da conversa ativa
│   │   │   ├── conversation-list/# Lista de conversas
│   │   │   └── mocks/            # Conversas e mensagens mockadas
│   │   └── menu/
│   │       ├── side-menu/        # Menu lateral da conta
│   │       └── mocks/            # Dados mockados da conta
│   ├── layout/
│   │   └── main-layout/          # Composição principal em duas colunas
│   └── shared/
│       ├── components/           # Componentes reutilizáveis
│       ├── directives/           # Diretivas compartilhadas
│       └── models/               # Tipos de domínio
├── index.html                    # Documento HTML e bootstrap visual do tema
├── main.ts                       # Bootstrap Angular
└── styles.css                    # Tailwind, tokens globais e tema
```

### Componentes principais

| Componente | Descrição |
| ---------- | --------- |
| `MainLayoutComponent` | Composição da tela principal com lista, chat e resize handle. |
| `ConversationListComponent` | Renderiza conversas, busca visual e seleção de conversa ativa. |
| `ChatWindowComponent` | Renderiza mensagens, agrupamentos, estado vazio e envio local. |
| `SideMenuComponent` | Menu lateral com perfil, submenu, navegação visual e toggle de tema. |
| `IconMenu` | Botão visual de abertura do menu lateral. |
| `ResizablePanelDirective` | Controla o redimensionamento horizontal do painel esquerdo. |

### Serviços

| Serviço | Responsabilidade |
| ------- | ---------------- |
| `ChatService` | Guarda conversas, mensagens, conversa ativa e envio local de mensagens. |
| `MenuService` | Controla abertura, fechamento e alternância do menu lateral. |
| `ThemeService` | Controla o tema atual, aplica a classe `dark` e persiste a escolha. |

---

## Fluxo da aplicação

```text
main.ts
  └── bootstrapApplication(App, appConfig)
        └── app.config.ts
              ├── provideRouter(routes)
              └── coreProviders
                    └── ThemeService
        └── app.html
              └── app-main-layout
                    ├── app-conversation-list
                    ├── app-chat-window
                    ├── resize handle
                    └── app-side-menu
```

### Estado local

| Ação | Resultado |
| ---- | --------- |
| Selecionar conversa | Atualiza `activeConversationId` e zera `unread`. |
| Enviar mensagem | Adiciona mensagem local e atualiza última mensagem da conversa. |
| Abrir menu | Define `MenuService.isOpen` como `true`. |
| Alternar tema | Atualiza signal, classe `dark` e `localStorage`. |
| Redimensionar painel | Atualiza a largura do painel esquerdo no layout principal. |

---

## Pré-requisitos

:warning: [Node.js](https://nodejs.org/en/download/) compatível com Angular 21

:warning: npm 11+

:warning: Angular CLI local instalado pelas dependências do projeto

---

## Como rodar a aplicação :arrow_forward:

### 1. Instale as dependências

```bash
npm install
```

### 2. Execute o servidor de desenvolvimento

```bash
npm run start
```

### 3. Abra no navegador

```text
http://localhost:4200/
```

O servidor recarrega a aplicação automaticamente quando os arquivos mudam.

---

## Build e testes

### Build de produção

```bash
npm run build
```

Os artefatos são gerados em `dist/`.

### Build contínuo em desenvolvimento

```bash
npm run watch
```

### Testes unitários

```bash
npm run test
```

### Scripts disponíveis

| Script | O que faz |
| ------ | --------- |
| `npm run start` | Inicia o servidor Angular em modo desenvolvimento. |
| `npm run build` | Gera o build de produção. |
| `npm run watch` | Executa build contínuo com configuração de desenvolvimento. |
| `npm run test` | Executa testes unitários com Vitest. |
| `npm run ng` | Expõe a CLI do Angular pelo npm. |

---

## Protótipos visuais

Os protótipos HTML usados como referência visual ficam em `docs/`.

| Documento | Uso |
| --------- | --- |
| `docs/menu-design.html` | Referência visual do menu lateral, perfil, itens e toggle. |
| `docs/chat-bubbles.html` | Referência visual das bolhas de mensagem, header e composer. |

---

## Pontos de atenção

:memo: As conversas, mensagens e dados da conta ainda são mockados.

:memo: O campo de busca está preparado visualmente, mas ainda não filtra a lista.

:memo: O envio de mensagens é local e não possui integração com backend.

:memo: O projeto ainda não possui configuração de e2e.

:memo: Não há arquivo de licença versionado no repositório.

---

## Tecnologias utilizadas :books:

| Tecnologia | Uso |
| ---------- | --- |
| [Angular](https://angular.dev/) | Framework da aplicação web. |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática. |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária e tokens globais. |
| [RxJS](https://rxjs.dev/) | Dependência reativa do ecossistema Angular. |
| [Vitest](https://vitest.dev/) | Execução de testes unitários. |
| [jsdom](https://github.com/jsdom/jsdom) | Ambiente DOM para testes. |
| [Prettier](https://prettier.io/) | Formatação de código. |
| [Angular CLI](https://angular.dev/tools/cli) | Build, serve e automação do projeto. |

---

## Desenvolvedor :octocat:

| [<img src="https://github.com/warlleyrocha.png" width=115><br><sub>Warlley Rocha</sub>](https://github.com/warlleyrocha) |
| :----------------------------------------------------------------------------------------------------------------------: |
