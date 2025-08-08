# 💼 Finan Flow - Plataforma Completa para Gestão Financeira Pessoal

Finan Flow é uma solução fullstack sofisticada para controle financeiro pessoal, que permite aos usuários gerenciar despesas fixas, parceladas e à vista, acompanhar notificações de contas vencidas e manter total controle sobre seu orçamento mensal.  
O sistema foi desenvolvido com tecnologias modernas e escaláveis, combinando um backend robusto em Node.js/Express com um frontend dinâmico em React.js e TypeScript, integrados via API REST segura com autenticação JWT e login social Google OAuth.

Com foco na experiência do usuário e performance, o Finan Flow oferece funcionalidades avançadas como rotas privadas, filtros detalhados, notificações inteligentes baseadas em datas de vencimento e um design responsivo com Tailwind CSS.

---

## 🚀 Tecnologias principais

- React.js (v19) + TypeScript  
- React Router DOM (v7) — Navegação e rotas privadas  
- React Query (@tanstack/react-query) — Gerenciamento de dados e cache  
- Axios — Comunicação com API REST  
- Cookies (js-cookie) — Armazenamento seguro do token JWT  
- React Hook Form — Manipulação de formulários  
- @react-oauth/google — Login via Google OAuth  
- Tailwind CSS + tailwind-scrollbar — Estilização responsiva  
- React Icons — Ícones para UI  
- Sonner — Notificações toast  
- UUID — Geração de IDs únicos  

---

## 🎯 Funcionalidades

- **Autenticação completa:**  
  - Login tradicional com email e senha  
  - Login social via Google OAuth integrado  
  - Registro de novos usuários  
  - Tokens JWT armazenados em cookie para segurança  
  - Rotas privadas protegidas para usuários autenticados  

- **Dashboard com controle de despesas:**  
  - Listagem, filtro e pesquisa de despesas por status (pagas, atrasadas), meses e nome  
  - Visualização de despesas fixas, à vista e parceladas  
  - Marcação rápida de despesas como pagas  
  - Notificações automáticas para despesas vencidas  

- **Gerenciamento de despesas:**  
  - Cadastro, edição e exclusão de despesas  
  - Suporte a despesas fixas e parceladas  

- **Perfil do usuário:**  
  - Visualização e edição de dados  
  - Alteração de senha  

- **UI responsiva:**  
  - Navbar lateral para desktop  
  - Menu móvel adaptado para celulares  

- **SEO básico configurado**  

---

## 📁 Estrutura do projeto

- Páginas principais: Home, Login, Register, Dashboard, Nova Despesa, Notificações, Perfil  
- Componentes reutilizáveis para cards, formulários, navbar, notificações  
- Hooks customizados para chamadas à API e manipulação de estado  
- Context API para gerenciamento global de autenticação  

