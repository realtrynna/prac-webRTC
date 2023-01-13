# Chat Service

-   Socket 연결 시 Socket에다 고유 id를 부여

<br>

**Event Sender** <br>

```typescript
socket.emit("Event Name", sendData);
```

**Event Receiver** <br>

```typescript
socket.on("Event Name", receiveData);
```
