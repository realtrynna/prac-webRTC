## adapter
A와 B서버가 있을 경우 <br>

A 서버에 있는 클라이언트가 B 클라이언트에게 메세지를 보내고 싶을 경우 사용함 <br>

<br>

## 연결
1. 연결/종료
```typescript
io.on("connection", (socket => {
    socket.on("disconnecting", (data) => {
        console.log(data)
    })
}))
```

## 기본
* socket.emit으로 보내고 socket.on으로 받음 <br>

```typescript
// 클라이언트
// done은 클라이언트에서 실행될 함수
// 서버에서 done을 받으면 매개 변수를 넣어 클라이언트 함수에 넘겨줄 수 있음
function done(response) {
    console.log(response)
}

socket.emit("이벤트 이름", data, done)

// 서버
socket.on("이벤트 이름", (data, done) => {
    console.log(data)
    
    setTimeOut(() => done("서버 응답"), 1000)
```

<br>

* 모든 이벤트 수신(미들웨어 역할) <br>

```typescript
socket.onAny((event, ...args) => {
    console.log(event)
})
```

<br>

## 방
1. socket 정보 조회
```typescript
socket
```

<br>

2. socket 아이디 조회
```typescript
socket.id
```

<br>

3. socket 방 조회
```typescript
socket.rooms
```

<br>

4. 방 입장
```typescript
socket.join("방 이름")

// 여러 방 입장
socket.join(["방 1", "방 2"])
```

<br>

5. 방 퇴장
```typescript
socket.join("방 이름")
```

<br>

### 메세지
1. 모든 방 메세지 전송
```typescript
io.
```

2. 특정 방 메세지 전송
```typescript
socket.io("방 이름").emit("이벤트 이름", "data")
```

<br>

