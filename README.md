# 22.12.08~12
## 줌 클론 (서버 사이드 렌더링)

<br>

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

## 비디오
* 사용자의 비디오를 가져오고 화면에 출력 <br>

* 스트림이란 비디오와 오디오가 결합된 형태 <br>

* 스트림은 Track을 제공함 <br>

## webRTC
시그널링이 끝나면 Peer들간 연결이 성립됨

* 시그널링
> 내가 상대방과 Peer 연결이 하고 싶다면 나는 상대방의 IP, Firewall, Network를 어떻게 알까?
> 나는 시그널링 서버에게 위치, Setting, Configuration, 방화벽, 라우터를 전달함 
> 시그널링 서버는 비디오와 오디오를 전달하는 게 아닌 Peer들의 위치만 전달함

1. 브라우저간 피어 생성
```javascript
    myPeerConnection = new RTCPeerConnection()
```

<br>

2. 피여 연결? 
* 미디어 생성(Stream) <br>

```javascript
// 사용자 미디어 생성
localStream = await navigator.mediaDevices.getUserMedia(userMediaConfig)
```

<br>

* 연결 피어(RTCPeerConnection) 생성

```javascript
localPeerConnection = await new RTCPeerConnection()
```

<br>

* 생성된 연결 피어에 Track과 Stream 추가

```javascript
localStream
    .getTracks().
    .forEach(track => localPeerConnection.addTrack(track, localStream))
```

<br>

* offer(상대방에게 보내는 초대장 개념) 생성
* 상대방이 들어왔을 경우 socket.on에서 이벤트를 받아서 실행
* offer를 만들어서 연결을 구성해야함

```javascript
// RTCSessionDescription
const offer = await localPeerConnection.createOffer();
```

<br>

* 생성된 피어 A의 offer를 토대로 연결 피어에 setLocalDescription 생성 후 시그널링 서버(socket/IO)로 전달 후 피어 B에게 A의 offer 정보 전달 

```javascript
// 피어 A
// 시그널링 서버로 offer 전송
myPeerConnection.setLocalDescription(offer)

socket.emit("offer", {
    offer,
    roomTitle,
});
```

```typescript
// 시그널링 서버(socket/IO)
// 받은 offer를 피어 B에게 전달
socket.on("offer", data => {
    const { offer, roomTitle } = data;

    socket.to(roomTitle).emit("offer", offer);
})
```

* 피어 A에게 받은 offer를 통해 setRemoteDescription 추가
* 피어 B가 answer 추가 후 setLocalDescription
* answer를 시그널링 서버로 전송
* 시그널링 서버는 피어 A에게 answer 전송
* 피어 A는 받은 answer를 setRemoteDescription

```javascript
// 피어 B
socket.on("offer", async data => {
    // data === offer
    localPeerConnection.setRemoteDescription(data); 

    const answer = await localPeerConnection.createAnswer();

    localPeerConnection.setLocalDescription(answer);

    socket.emit("answer", {
        answer,
        roomTitle,
    });
})
```

```typescript
// 시그널링 서버(socket/IO)
socket.on("answer", data => {
    const { answer, roomTitle } = data;

    socket.to(roomTitle).emit("answer", answer);
})
```

```javascript
// 피어 A
socket.on("answer", async data => {
    // data === answer
    localPeerConnection.setRemoteDescription(data);
})
```

<br>

* 피어들간 offer&answer 과정이 끝나면 양쪽에서 iceCandidate 이벤트가 발생함

<br>

## iceCandidate (Internet Connectivity Establishment) 인터넷 연결 생성

> 브라우저가 서로 소통할 수 있게 해주는 방법
> webRTC에 필요한 프로토콜을 의미함 <br>
> 멀리 떨어진 장치와 소통할 수 있게함 <br>
> 어떤 소통 방법이 가장 좋은지 제안함 <br>
> 다수의 candidate(후보)들이 각각의 연결에서 제안됨 <br>

* 연결 피어(RTCPeerConnection) 생성과 동시에 iceCandidate 이벤트 수신

```javascript
localPeerConnection.addEventListener("icecandidate");
```

* candidate를 다시 브라우저로 보내야함

> candidate들은 브라우저에 의해 생성됨
> 생성된 candidate들은 다른 브라우저로 전송되지 않음

* candidate 이벤트 생성

<br>

```typescript
socket.on("ice", (ice, roomTitle) => {
    socket.to(roomTitle).emit("ice", ice);
})
```

<br>

### STUN
같은 와이파이가 아닐 경우 서로의 스트림을 받지않음. <br>
스턴 서버는 컴퓨터가 공용 IP 주소를 찾게해줌. <br>
어떤 걸 요청하면 인터넷에 내가 누군지를 알려주는 서버임. <br>







