import React from "react";
import Messages from "./Messages";
import Input from "./Input";
const AdminChat = () => {
  return (
    <div className="chat  w-8/12">
      <div className="chatinfor h-14 bg-violet-500 flex items-center justify-start p-3 text-white">
        <span>Jane</span>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  );
};

export default AdminChat;
