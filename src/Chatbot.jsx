import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";

const categoryKeywords = {
  car: ["car","cars","vehicle","drive","sedan","suv","civic","honda","toyota"],
  bike: ["bike","bikes","motorbike","superbike","cycle","ride","yamaha","r15","duke"],
  beauty: ["beauty","skin-care","fragrances","makeup","glowing","lipstick","cream"],
  food: ["food","pizza","cake","burger","chocolate","groceries","snack"]
};

const greetings = ["hi", "hello", "hey", "hii", "hola", "hey there"];
const userThanks = ["thanks","thank you","thx","ty","tnx","thank u","thanks a lot","tyvm"];
const apologies = ["sorry","sry","my bad","apologies"];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [puterLoaded, setPuterLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastMatches, setLastMatches] = useState([]);
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state?.user?.userData);

  // ------------------ Helpers ------------------
  const detectCategory = (text) => {
    const lower = text.toLowerCase();
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const kw of keywords) {
        if (lower.includes(kw)) return category;
      }
    }
    return null;
  };

  const handleSimpleIntents = (text) => {
    const lower = text.toLowerCase();

    if (new Fuse(greetings, {threshold:0.3}).search(lower).length) {
      setMessages(prev => [...prev, { role: "bot", content: "Hello! How can I help you today? 😊" }]);
      return true;
    }
    if (new Fuse(userThanks, {threshold:0.3}).search(lower).length) {
      setMessages(prev => [...prev, { role: "bot", content: "You're welcome! 😄" }]);
      return true;
    }
    if (new Fuse(apologies, {threshold:0.3}).search(lower).length) {
      setMessages(prev => [...prev, { role: "bot", content: "No worries! How can I assist you further?" }]);
      return true;
    }
    return false;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ------------------ Effects ------------------
  useEffect(() => {
    if (user){
      setMessages([{ role: "bot", content: `Hello ${user?.email || ""}! How can I assist you today?` }]);
    } else {
      setMessages([{ role: "bot", content: "Hello! I am Rohit. How can I assist you today?" }]);
    }
  }, [user]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    script.onload = () => setPuterLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // ------------------ Main Message Handler ------------------
  const sendMessage = async () => {
    if (!input.trim() || !puterLoaded) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Simple intents
      if (handleSimpleIntents(input)) {
        setLoading(false);
        return;
      }

      // Fetch products
      const res = await fetch(`https://dummyjson.com/products?limit=100&skip=0`);
      const data = await res.json();
      const products = data.products;

      // Detect category
      const category = detectCategory(input);
      let filteredProducts = category 
        ? products.filter(p => p.category.toLowerCase().includes(category)) 
        : products;

      // Fuzzy search
      const fuse = new Fuse(filteredProducts, { keys: ["title","category","description","brand"], threshold: 0.3 });
      let matches = fuse.search(input).map(r => r.item);

      if (!matches.length && /(price|cost|detail|info)/i.test(input)) matches = lastMatches;

      if (!matches.length) {
        setMessages(prev => [...prev, { role: "bot", content: "Sorry, I can only answer about products in our store. 😅" }]);
        setLoading(false);
        return;
      }

      setLastMatches(matches);

      const productInfo = matches.map(p => `- ${p.title} (${p.category}) - $${p.price}`).join("\n");
      const categoryURL = category ? `/productCategory/${category}` : "/productCategory/all";

      // AI Prompt
      const prompt = `You are a friendly shopping assistant.
- Only suggest products from our store: cars, bike, beauty, food.
- Use emojis and markdown.
- Offer helpful alternatives if exact product isn’t found.
- Recommendations for top rated prducts in the category.
- More suggestions: ${categoryURL}

Products:
${productInfo}

User: ${input}
AI Response:`;

      // Call Puter AI
      const aiRes = await window.puter.ai.chat(prompt, { model: "gpt-4o" });
      const botReply = aiRes.message.content?.trim() || "Sorry, I couldn't find an answer.";
      setMessages(prev => [...prev, { role: "bot", content: botReply }]);
    } catch (err) {
      console.error("AI error:", err);
      setMessages(prev => [...prev, { role: "bot", content: "Oops! Something went wrong. Please try again." }]);
    }

    setLoading(false);
  };

  // ------------------ Render ------------------
  return (
    <>
      {isOpen && (
        <div className="shadow-2xl z-50 bg-white w-80 max-w-full rounded-xl fixed bottom-24 right-8 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-brandOrange py-3 px-4 flex items-center justify-between">
            <span className="font-bold text-white text-lg">ChatBot</span>
            <button className="text-white text-xl hover:text-red-300" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2" style={{ minHeight: 250, maxHeight: 350 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] break-words px-4 py-2 rounded-2xl shadow-sm text-sm ${msg.role === "user" ? "bg-brandOrange text-white w-fit ml-auto" : "bg-gray-100 text-gray-800 mr-auto"}`}>
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-200 bg-gray-50 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 max-w-[222px] focus:outline-none focus:ring-2 focus:ring-brandOrange"
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              disabled={!puterLoaded}
            />
            <button onClick={sendMessage} disabled={!puterLoaded || !input} className={`px-4 py-2 rounded-lg font-semibold transition ${puterLoaded && input ? "bg-brandOrange text-white hover:bg-orange-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
              Send
            </button>
          </div>
          {!puterLoaded && <div className="text-center text-xs text-gray-500 py-2">Loading AI...</div>}
        </div>
      )}
      <img onClick={() => setIsOpen(!isOpen)} src="https://miro.medium.com/v2/resize:fit:1200/1*9I6EIL5NG20A8se5afVmOg.gif" className="w-16 h-16 fixed right-4 bottom-8 rounded-full shadow-lg cursor-pointer bg-green-500 z-50 border-4 border-white" alt="Chatbot" title="Chatbot" />
    </>
  );
};

export default Chatbot;
