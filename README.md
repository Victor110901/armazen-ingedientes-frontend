# Armazém de Ingredientes Frontend

Interface web responsiva desenvolvida em **React**, **TypeScript** e **Vite** para gerenciamento de estoque de ingredientes, compartimentos e movimentações de um armazém.

O projeto consome uma API RESTful desenvolvida em Java com Spring Boot e foi construído com foco em organização, integração real, responsividade, validações, feedbacks visuais e experiência profissional para avaliação técnica.

---

## Sumário

- [Visão geral](#visão-geral)
- [Links do projeto](#links-do-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Integração com a API](#integração-com-a-api)
- [Como executar localmente](#como-executar-localmente)
- [Como gerar build](#como-gerar-build)
- [Rotas do frontend](#rotas-do-frontend)
- [Fluxo recomendado para avaliação](#fluxo-recomendado-para-avaliação)
- [Decisões técnicas](#decisões-técnicas)
- [Autor](#autor)

---

## Visão geral

O frontend permite gerenciar visualmente um armazém de ingredientes composto por 5 compartimentos fixos.

A interface permite:

- Visualizar dashboard com dados reais da API.
- Consultar ingredientes cadastrados.
- Cadastrar novos ingredientes.
- Registrar entrada de estoque.
- Registrar saída de estoque.
- Consultar compartimentos disponíveis para armazenamento.
- Consultar compartimentos disponíveis para venda/retirada.
- Visualizar histórico completo de movimentações.
- Ordenar histórico por data ou compartimento.
- Acompanhar status da API.
- Usar a aplicação em desktop, tablet e celular.

---

## Links do projeto

| Recurso | URL |
|---|---|
| Frontend em produção | `https://armazen-ingedientes-frontend.vercel.app/` |
| Backend em produção | `https://armazen-ingedientes-backend.onrender.com` |
| Swagger da API | `https://armazen-ingedientes-backend.onrender.com/swagger-ui/index.html` |
| Health check da API | `https://armazen-ingedientes-backend.onrender.com/health` |

Observação: o backend está hospedado no plano gratuito do Render. A primeira requisição após um período de inatividade pode demorar alguns segundos enquanto o serviço reinicia.

---

## Tecnologias

- React
- TypeScript
- Vite
- React Router DOM
- TanStack Query
- Axios
- React Hook Form
- Zod
- Tailwind CSS
- Recharts
- Lucide React
- Sonner
- Vercel

---

## Funcionalidades

### Dashboard

- Cards de resumo.
- Total de ingredientes.
- Compartimentos ativos.
- Volume total armazenado.
- Quantidade de movimentações.
- Gráfico de volume por tipo.
- Últimas movimentações.

### Ingredientes

- Listagem de ingredientes cadastrados.
- Cadastro de ingrediente.
- Validação de formulário.
- Feedback de sucesso e erro.
- Tratamento de erros retornados pela API.

### Movimentações

- Registro de entrada de estoque.
- Registro de saída de estoque.
- Atualização automática dos dados após movimentação.
- Tratamento de regras de negócio, como saída maior que o estoque disponível.

### Compartimentos

- Consulta de compartimentos disponíveis para armazenamento.
- Consulta de compartimentos disponíveis para venda/retirada.
- Cards com quantidade atual, capacidade, espaço livre e motivo de disponibilidade.

### Histórico

- Listagem completa de movimentações.
- Ordenação por data.
- Ordenação por compartimento.
- Ordem crescente ou decrescente.
- Badges para entrada, saída e tipo de ingrediente.

---

## Arquitetura

Estrutura principal:

```txt
src
├── app
├── assets
├── components
│   ├── common
│   ├── layout
│   └── ui
├── config
├── hooks
│   ├── compartments
│   ├── dashboard
│   ├── history
│   ├── ingredients
│   └── movements
├── hooks
├── lib
├── pages
├── services
├── styles
├── types
└── utils
```

Responsabilidades:

| Pasta | Responsabilidade |
|---|---|
| `app` | Configuração global da aplicação, providers e rotas |
| `components/common` | Componentes reutilizáveis |
| `components/layout` | Layout principal, sidebar, topbar e navegação mobile |
| `config` | Configurações de rotas, domínio e aplicação |
| `hooks` | Funcionalidades organizadas por domínio |
| `services` | Cliente HTTP e comunicação com a API |
| `types` | Contratos TypeScript da API |
| `utils` | Formatadores e utilitários |

---

## Integração com a API

A URL da API é configurada por variável de ambiente:

```env
VITE_API_URL=https://armazen-ingedientes-backend.onrender.com
```

O cliente HTTP centralizado fica em:

```txt
src/services/api.ts
```

Services principais:

```txt
src/services/ingredient.service.ts
src/services/compartment.service.ts
src/services/history.service.ts
src/services/health.service.ts
```

Hooks principais:

```txt
src/hooks/ingredients/useIngredients.ts
src/hooks/compartments/useCompartments.ts
src/hooks/history/useHistory.ts
src/hooks/dashboard/useHealthCheck.ts
```

---

## Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/Victor110901/armazen-ingedientes-frontend.git
```

Entre na pasta:

```bash
cd armazem-frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local`:

```env
VITE_API_URL=https://armazen-ingedientes-backend.onrender.com
```

Rode o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:5173
```

---

## Como gerar build

```bash
npm run build
```

Para pré-visualizar o build localmente:

```bash
npm run preview
```

---

## Rotas do frontend

| Rota | Tela |
|---|---|
| `/` | Dashboard |
| `/ingredientes` | Gestão de ingredientes |
| `/compartimentos` | Consulta de compartimentos |
| `/historico` | Histórico de movimentações |
| `/sobre` | Informações do projeto |

---

## Fluxo recomendado para avaliação

1. Acessar o frontend em produção.
2. Abrir o Dashboard.
3. Ir para Ingredientes.
4. Cadastrar um ingrediente.
5. Registrar uma entrada.
6. Registrar uma saída.
7. Consultar o histórico.
8. Consultar compartimentos disponíveis.
9. Acessar o Swagger da API para validar os endpoints diretamente.

---

## Decisões técnicas

### React + Vite

O projeto utiliza Vite pela simplicidade, velocidade de desenvolvimento e facilidade de deploy como aplicação estática.

### TypeScript

Todos os contratos principais da API foram tipados, reduzindo risco de integração incorreta.

### TanStack Query

Utilizado para cache, loading, refetch e sincronização dos dados após mutations.

### React Hook Form + Zod

Utilizados para validação de formulários com mensagens claras e tipadas.

### Axios

Cliente HTTP centralizado para comunicação com o backend.

### Tailwind CSS

Utilizado para criação rápida de uma interface responsiva, consistente e sem dependência pesada de componentes externos.

### Separação por features

As funcionalidades foram organizadas por domínio, facilitando manutenção e evolução.

---

## Autor

Victor Campolina
