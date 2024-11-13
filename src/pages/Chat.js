import React from "react";
import axiosClient from "../api/axiosClient";
import { useEffect } from "react";
import { useState } from "react";
import ChatNav from "../components/ChatNav";
import CurrentRoom from "../components/CurrentRoom";
const Chat = () => {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await axiosClient.get("/session/rooms");
        if (res.status === 200) {
          const { rooms } = res.data;
          setRooms(rooms);
          setRoom(rooms[0] ? rooms[0].userId : "");
        }
      } catch (error) {}
    };
    getRooms();
  }, []);
  const changeRoomHandler = (room) => {
    setRoom(room);
  };
  return (
    <div>
      {!rooms || (rooms.length === 0 && <div>No room</div>)}
      {rooms && rooms.length !== 0 && (
        <>
          <ChatNav rooms={rooms} onChangeRoom={changeRoomHandler} />
          {room && <CurrentRoom room={room} />}
        </>
      )}
    </div>
  );
};

export default Chat;
