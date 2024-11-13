import React from "react";
import "./CurrentRoom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
const CurrentRoom = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const socket = io("https://ass3be.onrender.com");

  const fetchMessages = async () => {
    try {
      const res = await axiosClient.get("/session/room", { params: { userId: room } });

      if (res.status === 200) {
        setMessages(res.data.room.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    if (room) {
      fetchMessages();
    }
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, { senderId: data.senderId, message: data.message }]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [room]);
  const addMessageHandler = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", { message: newMessage, userId: room, senderId: user._id });
      setNewMessage("");
    }
  };
  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      addMessageHandler();
    }
  };

  return (
    <div className="room">
      <div className="messages">
        {messages &&
          messages.map((msg, index) => (
            <div key={index} className={msg.senderId === room ? "left" : "right"}>
              {msg?.message}
            </div>
          ))}
      </div>
      <div className="roomAction">
        <input
          type="text"
          placeholder="Enter message"
          value={newMessage}
          onKeyDown={keyDownHandler}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={addMessageHandler}>
          <span>
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "blue" }} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CurrentRoom;
