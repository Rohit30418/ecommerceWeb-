import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [puterLoaded, setPuterLoaded] = useState(false);
  const user = useSelector((state) => state?.user?.userData);
  const [isOpen,setIsOpen]=useState(false);
  
  useEffect(()=>{
  if (!user) {
    return;
  }

   console.log(user);
   
  
   setMessages([
    { role: "bot", content: `${user?.email}Hello! How can I assist you today?` }
   ]);
  },[user])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => setPuterLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

//   const extractText = (data) => {
//     if (!data) return "";
//     if (typeof data === "string") return data;
//     if (Array.isArray(data)) return data.map(extractText).join(" ");
//     if (typeof data === "object") {
//       if (data.content) return extractText(data.content);
//       if (data.message) return extractText(data.message);
//       if (data.valueOf) return extractText(data.valueOf());
//       return JSON.stringify(data);
//     }
//     return String(data);
//   };

  const sendMessage = async () => {
    if (!input || !puterLoaded) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");

    try {
      const res = await window.puter.ai.chat(input, { model: "gpt-4.1-nano" });

      console.log("Puter AI response:", res);
    //   const botText = extractText(res);

      const botMsg = { role: "bot", content: res.message.content };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Puter AI error:", err);
    }
  };

  return (
  <>
  {
isOpen &&  <div className="shadow-md fixed bottom-[100px] right-10">
      <div style={{ border: "1px solid #ccc", minHeight: 200, padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ color: msg.role === "bot" ? "blue" : "black" }}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={sendMessage} disabled={!puterLoaded}>
        Send
      </button>
      {!puterLoaded && <p>Loading AI...</p>}


              <img onClick={()=>{
            setIsOpen(true)
        }} src="https://miro.medium.com/v2/resize:fit:1200/1*9I6EIL5NG20A8se5afVmOg.gif" className='w-[70px] h-[70px] fixed right-2 bottom-8 rounded-full shadow-lg cursor-pointer bg-green-500 mix z-50' alt="" />
    </div>
  }</>
  );
};

export default Chatbot;
