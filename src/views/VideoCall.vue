<template>
  <div class="video-call">
    <h2>Video Call</h2>

    <div v-if="!showCallInterface" class="call-options">
      <button @click="startNewCall" class="option-btn">Start New Call</button>
      <button @click="joinExistingCall" class="option-btn">Join Existing Call</button>
    </div>

    <div v-if="showCallInterface" class="call-interface">
      <div v-if="!inCall" class="pre-call">
        <input v-model="roomId" placeholder="Enter Room ID" class="room-input" />
        <button @click="joinCall" class="join-btn">Join Call</button>
      </div>

      <div v-if="inCall" class="videos">
        <video ref="localVideo" autoplay playsinline muted></video>
        <video ref="remoteVideo" autoplay playsinline></video>
        <button @click="endCall" class="end-call-btn">End Call</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const localVideo = ref(null);
const remoteVideo = ref(null);
const roomId = ref("");
const showCallInterface = ref(false);
const inCall = ref(false);
const socket = io("http://localhost:5000");

let localStream;
let peerConnection;

const startNewCall = () => {
  showCallInterface.value = true;
  roomId.value = generateRoomId();
};

const joinExistingCall = () => {
  showCallInterface.value = true;
};

const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const joinCall = async () => {
  if (!roomId.value) {
    alert("Please enter a room ID");
    return;
  }

  try {
    inCall.value = true;

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

    // Handle connection state changes
    peerConnection.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.connectionState);
      if (peerConnection.connectionState === 'failed' || peerConnection.connectionState === 'disconnected') {
        alert("Connection failed. Please try again.");
        endCall();
      }
    };

    // Join signaling room
    socket.emit("join-room", roomId.value);

    // Handle signaling
    socket.on("signal", async ({ socketId, signalData }) => {
      try {
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
      } catch (error) {
        console.error("Signaling error:", error);
        alert("Signaling error occurred. Please try again.");
        endCall();
      }
    });

    // Create Offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("signal", {
      roomId: roomId.value,
      signalData: { offer }
    });

  } catch (error) {
    console.error("Error joining call:", error);
    if (error.name === 'NotAllowedError') {
      alert("Camera and microphone access denied. Please allow access and try again.");
    } else if (error.name === 'NotFoundError') {
      alert("No camera or microphone found. Please check your devices.");
    } else {
      alert("Failed to join call. Please try again.");
    }
    endCall();
  }
};

const endCall = () => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  if (peerConnection) {
    peerConnection.close();
  }
  inCall.value = false;
  showCallInterface.value = false;
  socket.disconnect();
};
</script>

<style>
.video-call {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.call-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}

.option-btn {
  padding: 15px 30px;
  font-size: 18px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.option-btn:hover {
  background: #0056b3;
}

.call-interface {
  margin-top: 20px;
}

.pre-call {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.room-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.join-btn {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.videos {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  position: relative;
}

video {
  width: 300px;
  height: 200px;
  background: #000;
  margin: 0 10px;
  border-radius: 8px;
}

.end-call-btn {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
