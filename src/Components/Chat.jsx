import { useState, useEffect, useRef } from "react";
// import whatsAppClient from "@green-api/whatsapp-api-client";
import { IoSend } from "react-icons/io5";
import { CgSmileMouthOpen } from "react-icons/cg";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import dayjs from "dayjs";
// import { debounce } from "underscore";

const Chat = ({ companionNumber, userInfo }) => {
  const initState = [
    { msg: "First", sender: "79175179435@c.us", timestamp: 1588091580 },
    { msg: "second", sender: "88005553535@c.us", timestamp: 1588091581 },
    { msg: "3!", sender: "79175179435@c.us", timestamp: 1588091582 },
    {
      msg: "4Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.",
      sender: "88005553535@c.us",
      timestamp: 1588091583,
    },
    {
      msg: "5Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.",
      sender: "79175179435@c.us",
      timestamp: 1588091584,
    },
    { msg: "6Alo", sender: "79175179435@c.us", timestamp: 1588091585 },
    { msg: "7123", sender: "88005553535@c.us", timestamp: 1588091586 },
    { msg: "8Hi!", sender: "79175179435@c.us", timestamp: 1588091587 },
    {
      msg: "9Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.",
      sender: "88005553535@c.us",
      timestamp: 1588091588,
    },
    {
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.",
      sender: "79175179435@c.us",
      timestamp: 1588091589,
    },
    {
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur vero recusandae animi aliquam aut. Beatae mollitia illum doloribus iure deleniti.",
      sender: "user",
      timestamp: 1588091590,
    },
  ];
  const [msg, setMsg] = useState("");
  const [messagesObj, setMessagesObj] = useState([]);

  const { IdInstance, ApiTokenInstance } = userInfo;

  //helper var
  const iconSize = 28;
  const ref = useRef();

  //msg send fn
  const sendMessage = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: companionNumber + "@c.us", message: msg }),
    };
    const url = `https://api.green-api.com/waInstance${IdInstance}/sendMessage/${ApiTokenInstance}`;
    setMessagesObj([
      ...messagesObj,
      {
        msg: msg,
        sender: "user",
        timestamp: Date.now(),
      },
    ]);
    setMsg("");
    // console.log(url);
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  };

  //message receive helper fns

  async function messageParse() {
    const url = `https://api.green-api.com/waInstance${IdInstance}/receiveNotification/${ApiTokenInstance}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data) {
      if (
        data.body.typeWebhook === "incomingMessageReceived" &&
        data.body.messageData.typeMessage === "textMessage" 
      ) {
        setMessagesObj([
          ...messagesObj,
          {
            msg: data.body.messageData.textMessageData.textMessage,
            sender: data.body.senderData.chatId,
            timestamp: data.body.timestamp,
          },
        ]);
      } else console.log("net msg");
      const msgId = data.receiptId;
      const urlDel = `https://api.green-api.com/waInstance${IdInstance}/deleteNotification/${ApiTokenInstance}/${msgId}`;
      const optionsDel = {
        method: "DELETE",
      };
      const responseDel = await fetch(urlDel, optionsDel);
      const dataDel = await responseDel.json();
      console.log(dataDel);
    }
  }


  //message listener, every 10 sec
  useEffect(() => {
    const a = setInterval(() => {
      messageParse()
    }, 10000);

    return () => clearInterval(a);
  }, []);

  //scroll to last
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messagesObj]);

  return (
    <div className="w-screen bg-[#eeeeee] flex flex-col">
      <div className="h-12 bg-[#eeeeee]">+{companionNumber}</div>

      <div
        className="h-5/6 bg-[#e4ddd7] overflow-y-auto relative overscroll-none"
        ref={ref}
      >
        {messagesObj.map((message) => (
          <div className="w-full  overflow-x-hidden" key={message.timestamp}>
            <div
              className={` mx-2 my-4 max-w-xl min-w-[100px] relative block rounded-md ${
                message.sender === "user"
                  ? "bg-green-400 float-right"
                  : "bg-white float-left"
              }`}
            >
              <p className="">{message.msg}</p>
              <div className="relative float-right right-1">
                <span className=" text-gray-500 text-xs">
                  {dayjs(message.timestamp).format("HH.mm.ss")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-around relative m-auto ">
        <CgSmileMouthOpen className="icons" size={iconSize} />
        <AiOutlinePaperClip className="icons" size={iconSize} />
        <input
          className="w-4/5 rounded-sm"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          onKeyDown={(e) => {
            if (e.key === "Enter" && msg) sendMessage();
          }}
        />
        <button>
          {msg === "" ? (
            <BsFillMicFill className="icons" size={iconSize} />
          ) : (
            <IoSend className="icons" size={iconSize} onClick={sendMessage} />
          )}{" "}
        </button>
        {/* TODO kill button */}
        <button
          className="bg-orange-400"
          // onClick={() => {
          //   console.log(debounce(messageParse(), 1000));
          // }}
        onClick={messageParse}
        >
          Receive
        </button>
      </div>
    </div>
  );
};
export default Chat;
