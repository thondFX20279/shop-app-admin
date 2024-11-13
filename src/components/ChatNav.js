import React from "react";
import "./ChatNav.css";
const ChatNav = (props) => {
  return (
    <div className="chatNav">
      <h4 style={{ textAlign: "center" }}>Chat nav</h4>
      <ul className="roomList">
        {props.rooms?.map((room, i) => (
          <li key={i} onClick={(e) => props.onChangeRoom(room.userId)}>
            {room.userId}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ChatNav;
