## Stream

1. Stream, peerConnection 생성

```javascript
let localStream = null;
let localPeerConnection = null;

localStream = await navigator.mediaDevices.getUserMedia(userMediaConfig);
videoTag.srcObject = localStream;

localPeerConnection = new RTCPeerConnection({});
```
