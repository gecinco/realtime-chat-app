# TODO List - Realtime Chat App

## 🔴 Alta Prioridade

- [ ] Implementar persistência de mensagens (Prisma + PostgreSQL)
  - Schema para User, Message, Room
  - Carregar histórico ao entrar na sala
  - Paginação de mensagens antigas

- [ ] Typing indicator
  - Evento `typing:start` e `typing:stop`
  - Debounce no cliente
  - Exibir "Fulano está digitando..."

- [ ] Autenticação real
  - NextAuth.js com Google/GitHub
  - JWT para Socket.IO
  - Sessões persistentes

## 🟡 Média Prioridade

- [ ] Mensagens privadas (DM)
  - UI para selecionar usuário
  - Sala privada 1:1
  - Notificação de nova DM

- [ ] Upload de arquivos
  - Imagens (preview inline)
  - Documentos
  - Limite de tamanho (5MB?)

- [ ] Notificações
  - Browser notifications
  - Badge no ícone
  - Som opcional

## 🟢 Baixa Prioridade

- [ ] Reações em mensagens (emoji)
- [ ] Menções (@username)
- [ ] Busca de mensagens
- [ ] Tema escuro
- [ ] Mobile responsive melhorado
- [ ] Testes E2E (Playwright)

## 🐛 Bugs

1. [ ] Lista de usuários não atualiza imediatamente ao entrar
2. [ ] Mobile: teclado cobre input
3. [ ] Scroll não funciona corretamente em Safari

## 📝 Notas

- Considerar usar Redis Adapter para escalar com múltiplos servidores
- Pesquisar rate limiting para prevenir spam
- Ver como grandes apps (Discord, Slack) lidam com presença
