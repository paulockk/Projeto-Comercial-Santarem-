# Comercial Santarém — Catálogo Digital

Catálogo digital para loja de produtos agropecuários, pet shop, piscina e jardinagem, com geração de contato via WhatsApp e painel administrativo completo.

> **Importante:** este projeto **não é um e-commerce**. O objetivo é apresentar os produtos e categorias da loja para que o cliente entre em contato diretamente pelo WhatsApp e finalize a compra com atendimento humano. Não há carrinho, checkout, pagamento ou controle de estoque.

**Site:** https://comercialsantarem.com.br

---

## Sumário

- [Objetivo do projeto](#objetivo-do-projeto)
- [Stack técnica](#stack-técnica)
- [Funcionalidades](#funcionalidades)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Configuração do Firebase](#configuração-do-firebase)
- [Configuração do Cloudinary](#configuração-do-cloudinary-opcional)
- [Rodando localmente](#rodando-localmente)
- [Importação de produtos em massa](#importação-de-produtos-em-massa)
- [SEO](#seo)
- [Deploy](#deploy)
- [Segurança](#segurança)
- [Manutenção e próximos passos](#manutenção-e-próximos-passos)

---

## Objetivo do projeto

O site funciona como uma **vitrine digital regional**: a pessoa pesquisa algo como *"ração para cachorro em Lençóis Paulista"*, encontra a loja no Google, confirma pelo catálogo que o produto (ou algo parecido) está disponível, e clica no botão do WhatsApp para negociar diretamente com a loja.

Por isso, decisões de escopo como **não ter carrinho de compras** ou **não exigir catálogo 100% completo do estoque** são propositais — o papel do site é gerar confiança e contato, não fechar a venda sozinho.

---

## Stack técnica

**Front-end**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form + Zod (validação)
- Framer Motion (animações)
- Lucide React / React Icons (ícones)
- React Hot Toast (notificações)
- React Helmet Async (SEO)

**Back-end (BaaS)**
- Firebase Authentication (login do admin)
- Firebase Firestore (banco de dados)
- Cloudinary (upload/hospedagem de imagens, opcional — também é possível colar URLs externas)

**Infraestrutura**
- Hospedagem: Vercel
- Domínio: Hostinger (DNS apontado para a Vercel)
- Otimização de imagem: proxy `images.weserv.nl` (redimensiona e comprime imagens externas sob demanda)

---

## Funcionalidades

### Site público
- Home com banner promocional (carrossel dinâmico, editável pelo admin), categorias em destaque, produtos em destaque (carrossel horizontal) e seção institucional
- Listagem de produtos (`/produtos`) com busca, filtro por categoria e subcategoria
- Listagem de categorias (`/categorias`)
- Página de categoria (`/categoria/:slug`) com produtos filtrados, busca e filtro por subcategoria
- Página de detalhe de produto (`/produtos/:id`) com galeria de múltiplas imagens (estilo e-commerce: imagem principal + miniaturas + setas), descrição com parágrafos preservados, produtos relacionados
- Botão flutuante de WhatsApp em todas as páginas públicas, com indicador de "aberto/fechado" baseado no horário de funcionamento
- Mensagens de WhatsApp pré-preenchidas e contextuais (produto, categoria, ou genérica)
- Página 404 e páginas de "produto não encontrado" / "categoria não encontrada"
- Banner de consentimento de cookies (LGPD), preparado para futura integração com Google Analytics

### Painel administrativo (`/admin`)
- Login protegido via Firebase Authentication (sem cadastro público — apenas administradores criados manualmente)
- Dashboard com estatísticas (total de produtos, categorias, destaques, promoções, indisponíveis) e ações rápidas
- CRUD completo de **produtos**: nome, categoria, subcategoria, múltiplas imagens (upload ou URL), preço, descrição, marca, destaque, promoção, disponibilidade
- CRUD completo de **categorias**: nome, descrição, ícone (seletor visual), subcategorias (tags)
- CRUD completo de **banners** promocionais da Home (ativar/desativar sem excluir, reordenar)
- Busca e filtro por categoria na listagem de produtos
- Importação de produtos em massa via planilha Excel (`.xlsx`) — cria categorias e subcategorias automaticamente quando não existem, nunca duplica ou apaga dados existentes

---

## Estrutura de pastas

```
src/
├── components/       # Componentes reutilizáveis (ui, layout, product, category, admin, common)
├── pages/            # Páginas (públicas e /admin)
├── layouts/          # Layouts (ex: AdminLayout)
├── hooks/            # Hooks customizados (useProducts, useCategories, useBanners, etc.)
├── contexts/         # Contextos React (AuthContext)
├── services/         # Camada de acesso a dados (Firestore, Cloudinary)
├── firebase/         # Configuração do Firebase
├── types/            # Tipos TypeScript
├── schemas/          # Validação com Zod
├── utils/            # Funções utilitárias (whatsapp, slugify, formatPrice, imageOptimizer, etc.)
├── constants/        # Constantes (rotas, empresa, coleções do Firestore)
└── tests/            # Testes automatizados (Vitest)

scripts/
└── generate-sitemap.mjs   # Gera public/sitemap.xml a partir dos dados do Firestore
```

---

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto (nunca versionado — já está no `.gitignore`):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

VITE_WHATSAPP_NUMBER=55XXXXXXXXXXX
VITE_COMPANY_NAME="Comercial Santarém"
```

---

## Configuração do Firebase

1. Crie um projeto em [console.firebase.google.com](https://console.firebase.google.com)
2. Registre um app Web e copie as credenciais para o `.env`
3. **Authentication → Sign-in method** → ative **E-mail/senha**
4. **Authentication → Users** → crie manualmente o(s) usuário(s) administrador(es) — não existe cadastro público
5. **Firestore Database** → crie o banco em modo produção (região recomendada: `southamerica-east1`)
6. Publique as regras de segurança (ver seção [Segurança](#segurança))
7. Crie os índices compostos necessários na coleção `products`:
   - `categoryId` (asc) + `createdAt` (desc)
   - `featured` (asc) + `available` (asc) + `createdAt` (desc)
   - `onSale` (asc) + `available` (asc) + `createdAt` (desc)
8. Em **Authentication → Settings → Authorized domains**, adicione o domínio de produção

---

## Configuração do Cloudinary (opcional)

Usado apenas se o admin optar por **upload direto de imagem** em vez de colar uma URL externa.

1. Crie uma conta gratuita em [cloudinary.com](https://cloudinary.com) (não exige cartão)
2. Anote o **Cloud name**
3. Em **Settings → Upload → Upload presets**, crie um preset no modo **Unsigned**
4. Preencha `VITE_CLOUDINARY_CLOUD_NAME` e `VITE_CLOUDINARY_UPLOAD_PRESET` no `.env`

---

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`. Para o painel administrativo, `http://localhost:5173/admin/login`.

### Testes

```bash
npm run test
```

### Build de produção

```bash
npm run build
```

---

## Importação de produtos em massa

O admin possui uma tela de importação (`/admin/produtos/importar`) que lê uma planilha `.xlsx` com as colunas:

| Coluna | Obrigatório | Descrição |
|---|---|---|
| `name` | Sim | Nome do produto |
| `categoryName` | Sim | Nome da categoria (criada automaticamente se não existir) |
| `subcategory` | Não | Subcategoria (criada automaticamente se não existir) |
| `images` | Sim | URLs de imagem separadas por `\|` |
| `price` | Não | Preço (deixe vazio para "Consulte o valor") |
| `description` | Não | Descrição do produto |
| `brand` | Não | Marca |
| `featured` | Não | `TRUE`/`FALSE` |
| `onSale` | Não | `TRUE`/`FALSE` |
| `available` | Não | `TRUE`/`FALSE` (padrão: `TRUE`) |

A importação é **100% aditiva**: nunca apaga ou sobrescreve produtos/categorias existentes, e pula produtos já cadastrados (mesmo nome + mesma categoria) para evitar duplicidade caso a mesma planilha seja enviada mais de uma vez.

---

## SEO

- Meta tags dinâmicas por página (título, descrição, Open Graph) via `react-helmet-async`
- Tag `canonical` em todas as páginas, reforçando a URL oficial de cada conteúdo
- Dados estruturados (Schema.org / `LocalBusiness`) na Home, para exibição de informações do negócio nos resultados de busca
- `sitemap.xml` gerado automaticamente a partir dos dados reais do Firestore:
  ```bash
  npm run generate-sitemap
  ```
  Esse comando também roda automaticamente antes de cada build (`npm run build`), mantendo o sitemap atualizado a cada deploy.
- Indexação gerenciada via [Google Search Console](https://search.google.com/search-console)

---

## Deploy

- **Hospedagem:** Vercel, com deploy automático a cada push na branch `main`
- **Domínio:** configurado via DNS na Hostinger, apontando para a Vercel (registro `A` para o domínio raiz, `CNAME` para `www`)
- **Variáveis de ambiente:** replicadas manualmente no painel da Vercel (Settings → Environment Variables) — não são lidas do `.env` local
- **Rewrite de SPA:** arquivo `vercel.json` redireciona todas as rotas para `index.html`, necessário para o React Router funcionar em recarregamentos de página e acessos diretos a URLs internas

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Segurança

- Rotas do painel administrativo protegidas por autenticação (`PrivateRoute`)
- Regras do Firestore exigem autenticação para criação, edição e exclusão de produtos, categorias e banners; leitura pública liberada
- Regras validam o formato mínimo dos dados no servidor (não apenas no front-end)
- Não há SQL Injection aplicável — o projeto usa Firestore (NoSQL), sem queries de texto interpretado
- HTTPS automático via Vercel
- Proteção contra força bruta no login via mecanismo nativo do Firebase Authentication
- Recomendação futura: ativar **Firebase App Check** para proteção adicional contra bots e uso indevido da API

---

## Manutenção e próximos passos

Itens já implementados mas que exigem atenção contínua:

- **Backup de dados:** o Firestore não possui backup automático no plano gratuito — recomenda-se exportação manual periódica
- **Índices do Firestore:** ao criar novas queries com múltiplos filtros, pode ser necessário criar novos índices compostos (o próprio erro do Firestore fornece o link direto para criação)
- **Sitemap:** atualizado automaticamente a cada deploy; se o site ficar muito tempo sem deploy novo enquanto produtos são cadastrados via admin, o sitemap pode ficar temporariamente desatualizado

Itens sugeridos para evolução futura:

- Firebase App Check
- Google Analytics (integrado ao banner de consentimento já existente)
- Ordenação manual dos produtos em destaque
- Selo de "novidade" para produtos recém-cadastrados

---

## Créditos

Desenvolvido para **Comercial Santarém** — Lençóis Paulista/SP.
