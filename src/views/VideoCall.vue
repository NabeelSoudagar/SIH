<template>
  <div class="video-call">
    <h2>Video Call</h2>
    <div class="videos">
      <video ref="localVideo" autoplay playsinline muted></video>
      <video ref="remoteVideo" autoplay playsinline></video>
    </div>
    <input v-model="roomId" placeholder="Enter Room ID" />
    <button @click="joinCall">Join Call</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const localVideo = ref(null);
const remoteVideo = ref(null);
const roomId = ref("");
const socket = io("http://localhost:5000");

let localStream;
let peerConnection;

const joinCall = async () => {
  if (!roomId.value) {
    alert("Please enter a room ID");
    return;
  }

  // 1. Get camera + mic
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.value.srcObject = localStream;

  // 2. Create RTCPeerConnection
  peerConnection = new RTCPeerConnection();

  // Send local stream
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // Play remote stream
  peerConnection.ontrack = (event) => {
    remoteVideo.value.srcObject = event.streams[0];
  };

  // Send ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("signal", {
        roomId: roomId.value,
        signalData: { candidate: event.candidate }
      });
    }
  };

  // Join signaling room
  socket.emit("join-room", roomId.value);

  // Handle signaling
  socket.on("signal", async ({ socketId, signalData }) => {
    if (signalData.offer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(signalData.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("signal", {
        roomId: roomId.value,
        signalData: { answer }
      });
    } else if (signalData.answer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(signalData.answer));
    } else if (signalData.candidate) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(signalData.candidate));
      } catch (err) {
        console.error("Error adding ICE candidate", err);
      }
    }
  });

  // Create Offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("signal", {
    roomId: roomId.value,
    signalData: { offer }
  });
};
</script>

<style>
.video-call {
  text-align: center;
}
.videos {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
video {
  width: 300px;
  height: 200px;
  background: #000;
  margin: 0 10px;
  border-radius: 8px;
}
</style>
