import React from "react";
import Message from "./Message";
const Messages = () => {
  return (
    <div className="messages h-calc p-3 overflow-scroll">
      <Message></Message>
      <Message own={true}></Message>
      <Message></Message>
      <Message></Message>

      <Message own={true}></Message>

      <Message></Message>

      <Message></Message>
    </div>
  );
};

export default Messages;
