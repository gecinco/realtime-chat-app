# Realtime Chat App

Work in Progress - This project is still under development!

Real-time chat application with Next.js, Socket.IO, and TypeScript. Includes chat rooms, private messages, and typing indicator.

## Project Status

- [x] Initial project setup
- [x] Socket.IO configuration
- [x] Component structure
- [x] Room system
- [x] Basic authentication
- [ ] Private messages (in progress)
- [ ] Typing indicator
- [ ] Message history (database)
- [ ] File upload
- [ ] Push notifications
- [ ] Tests

## Technology Stack

| Technology | Usage |
|-----------|-------|
| **Next.js 14** | Frontend + API Routes |
| **Socket.IO** | Real-time communication |
| **TypeScript** | Typing |
| **Tailwind CSS** | Styling |
| **Prisma** | ORM (planned) |
| **Redis** | PubSub for scalability (planned) |

## Project Structure (current)

```
realtime-chat-app/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx
│   ├── globals.css
│   ├── chat/
│   │   └── page.tsx             # Main chat page
│   └── api/
│       └── socket/
│           └── route.ts         # Socket.IO handler
├── components/
│   ├── chat/
│   │   ├── ChatRoom.tsx         # Main component
│   │   ├── MessageList.tsx      # Message list
│   │   ├── MessageInput.tsx     # Message input
│   │   ├── UserList.tsx         # Online users list
│   │   └── RoomList.tsx         # Room list
│   └── ui/
│       └── ...                  # Basic UI components
├── lib/
│   ├── socket.ts                # Socket.IO client
│   └── types.ts                 # Shared types
├── server/
│   └── socket-server.ts         # Socket.IO server
├── package.json
└── tsconfig.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# In another terminal, run the Socket.IO server
npm run socket
```

**Access:** http://localhost:3000

## Implemented Features

### Room System
- Create new room
- Join existing room
- User list per room
- Entry/exit messages

### Messages
- Send message to room
- Timestamp on each message
- Auto-scroll to last message

## Known Bugs

1. ~~Duplicate message on reconnect~~ (fixed)
2. User list doesn't update immediately (investigating)
3. Mobile: keyboard covers input (TODO: adjust viewport)

## Next Steps

1. **Persistence**: Save messages to database (Prisma + PostgreSQL)
2. **DMs**: Direct messages between users
3. **Typing indicator**: Show when someone is typing
4. **Read receipts**: ✓✓ WhatsApp style

## Development Notes

I'm studying best practices for scaling WebSockets. Currently works well for few users, but I need to implement Redis Adapter for multiple instances.

**Resources I'm using:**
- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [Next.js with WebSockets](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)
- [Scaling WebSockets](https://socket.io/docs/v4/redis-adapter/)

---

Last update: 03/02/2026
