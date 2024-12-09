# Chat App Frontend

Frontend de uma aplicação de chat em tempo real desenvolvida com Next.js, React e Socket.IO.

## 🚀 Tecnologias

- Next.js 13
- React 18
- TypeScript
- Socket.IO
- TanStack Query
- Zustand
- Tailwind CSS
- Axios

## 📁 Estrutura do Projeto

O projeto está organizado nas seguintes pastas:

- `app`: Páginas e layouts do Next.js App Router
- `components`: Componentes React reutilizáveis
- `hooks`: Custom hooks
- `providers`: Provedores de contexto
- `services`: Serviços de API e configurações
- `shared`: Utilitários compartilhados
- `types`: Definições de tipos TypeScript

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+
- Yarn

### Configuração

1. Clone o repositório
```bash
git clone https://github.com/odairrosario/chat-frontend.git
cd chat-frontend
```

2. Instale as dependências
```bash
yarn install
```

## 🚀 Execução

### Ambiente de Desenvolvimento
```bash
yarn dev
```

### Ambiente de Produção

1. Gere o build da aplicação:

```bash
yarn build
```

2. Inicie o servidor:
```bash
yarn start
```

A aplicação estará disponível em `http://localhost:5600`

## 📱 Funcionalidades

- Autenticação de usuários (Login/Registro)
- Chat em tempo real com Socket.IO
- Lista de usuários online
- Histórico de mensagens
- Interface responsiva com Tailwind CSS

## 🔧 Arquitetura

- **Next.js App Router**: Roteamento e estrutura da aplicação
- **Socket.IO**: Comunicação em tempo real
- **TanStack Query**: Gerenciamento de estado e cache
- **Zustand**: Gerenciamento de estado global
- **Axios**: Requisições HTTP
- **Tailwind**: Estilização

## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Odair do Rosario
