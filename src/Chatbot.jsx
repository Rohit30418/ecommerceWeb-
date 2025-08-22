import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ------------------ Keywords & Categories ------------------
const categoryKeywords = {
  vehicle: [
    "car","cars","vehicle","drive","sedan","suv","civic","honda","toyota",
    "automobile","transport","wheels","road","travel","four wheeler","auto","jeep","van","pickup","engine"
  ],
  motorcycle: [
    "bike","bikes","motorbike","superbike","cycle","ride","yamaha","r15","duke",
    "motorcycle","two wheeler","scooter","bullet","harley","ktm","bajaj","helmet","riding"
  ],
  beauty: [
    "beauty","skin-care","fragrances","makeup","glowing","lipstick","cream",
    "cosmetics","face wash","moisturizer","serum","foundation","blush","eyeliner","perfume","hair","nail","spa","shampoo"
  ],
  groceries: [
    "food","pizza","cake","burger","chocolate","groceries","snack",
    "eat","hungry","meal","dinner","lunch","breakfast","grocery","vegetable","fruit","rice","bread","milk","egg","meat","cooking","kitchen","pantry","supermarket","grocery store","shopping","ingredients","recipe","packaged","beverage","drink","juice","chips","biscuits","sweets","candy"
  ]
};

const greetings = ["hi", "hello", "hey", "hii", "hola", "hey there"];
const userThanks = ["thanks","ok no problem", "thank you","thx","ty","tnx","thank u","thanks a lot","tyvm"];
const apologies = ["sorry","sry","my bad","apologies"];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [puterLoaded, setPuterLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [lastMatches, setLastMatches] = useState([]);
  const [lastCategory, setLastCategory] = useState(null);

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
    const greetingsMatch = greetings.some(word => lower.includes(word));
    if (greetingsMatch) {
      setMessages(prev => [...prev, { role: "bot", content: "Hello! How can I help you today? 😊" }]);
      return true;
    }
    const thanksMatch = userThanks.some(word => lower.includes(word));
    if (thanksMatch) {
      setMessages(prev => [...prev, { role: "bot", content: "You're welcome! 😄" }]);
      return true;
    }
    const apologiesMatch = apologies.some(word => lower.includes(word));
    if (apologiesMatch) {
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
    if (user) {
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
      if (handleSimpleIntents(input)) {
        setLoading(false);
        return;
      }

      let category = detectCategory(input) || lastCategory;
      console.log(category);
      
      if (category) setLastCategory(category);
      
      let products = [];
      let currentProducts = [];

      // Fetch products based on category or use lastMatches for context
      if (category) {
        
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        const data = await res.json();
        currentProducts = data?.products || [];
      } else if (lastMatches.length) {
        currentProducts = lastMatches;
      }
      
      products = currentProducts;
      
      
      // Handle price queries (e.g. "under $20")
      const priceMatch = input.match(/under\s*\$?(\d+)/i);
      if (priceMatch) {
        const maxPrice = Number(priceMatch[1]);
        products = currentProducts.filter(p => p.price <= maxPrice);
      }
      
      let matches = [];
      // const lowerInput = input.toLowerCase();
      // if (products.length) {
      //     matches = products.filter(p => 
      //         p.title.toLowerCase().includes(lowerInput) ||
      //         p.category.toLowerCase().includes(lowerInput) ||
      //         p.description.toLowerCase().includes(lowerInput) ||
      //         p.brand.toLowerCase().includes(lowerInput)
      //     );
      // }

      matches=products;

   
      if (!matches.length) {
          setMessages(prev => [...prev, { role: "bot", content: "Sorry, I couldn't find related products 😅" }]);
          setLoading(false);
          return;
      }

      setLastMatches(matches);

      const productInfo = matches.map(p => `- ${p.title} (${p.category}) - $${p.price}`).join("\n");
      const categoryURL = category ? `/productCategory/${category}` : null;

      // Recent chat history for context
      const history = messages
        .slice(-5)
        .map(m => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`)
        .join("\n");

      // AI Prompt
      const prompt = `You are a friendly shopping assistant.
      Only recommend products from the list below.
      Use your best judgment to understand user intent from the conversation.
      If the user asks for something to eat, show food-related products.
      If the user asks for a car, show vehicle-related products.
      If the user asks for price, show products under that price.
      If the user asks for details, show product details.
      if user asking why something is not available, explain that the product is not available at the moment.
      always ask the user to click here to see more similar products: ${categoryURL}
      Conversation so far:
      ${history}
      Products:
      ${productInfo}
      User: ${input}
      AI Response:`;

      // Call Puter AI
      const aiRes = await window.puter.ai.chat(prompt, { model: "deepseek-chat" });
      const botReply = aiRes.message.content?.trim();

      if (!botReply) {
        const top3 = matches.slice(0, 3).map(p => `- ${p.title} ($${p.price})`).join("<br/>");
        setMessages(prev => [...prev, { role: "bot", content: top3 || "Sorry, no results found 😅" }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", content: botReply }]);
      }
    } catch (err) {
      console.error("AI error:", err);
      const top3 = lastMatches.slice(0, 3).map(p => `- ${p.title} ($${p.price})`).join("<br/>");
      setMessages(prev => [...prev, { role: "bot", content: top3 || "Oops! Something went wrong. Please try again." }]);
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
            {messages.map((msg, i) => {
              const parts = msg.content.split(/(\/productCategory\/[A-Za-z0-9-_]+)/g);
              return (
                <div
                  key={i}
                  className={`max-w-[80%] break-words px-4 py-2 rounded-2xl shadow-sm text-sm ${
                    msg.role === "user"
                      ? "bg-brandOrange text-white w-fit ml-auto"
                      : "bg-gray-100 text-gray-800 mr-auto"
                  }`}
                >
                  {parts.map((part, idx) =>
                    part.match(/^\/productCategory\/[A-Za-z0-9-_]+$/) ? (
                      <Link key={idx} to={part} className="text-blue-600 underline">
                        Go to Category
                      </Link>
                    ) : (
                      part.split("\n").map((line, lidx) => (
                        <React.Fragment key={lidx}>
                          {line}
                          {lidx < part.split("\n").length - 1 && <br />}
                        </React.Fragment>
                      ))
                    )
                  )}
                </div>
              );
            })}
            {loading && <div className="text-center text-xs text-gray-400">Thinking...</div>}
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
            <button
              onClick={sendMessage}
              disabled={!puterLoaded || !input}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                puterLoaded && input
                  ? "bg-brandOrange text-white hover:bg-orange-500"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Send
            </button>
          </div>
          {!puterLoaded && <div className="text-center text-xs text-gray-500 py-2">Loading AI...</div>}
        </div>
      )}
      <img
        onClick={() => setIsOpen(!isOpen)}
        src="https://miro.medium.com/v2/resize:fit:1200/1*9I6EIL5NG20A8se5afVmOg.gif"
        className="w-16 h-16 fixed right-4 bottom-8 rounded-full shadow-lg cursor-pointer bg-green-500 z-50 border-4 border-white"
        alt="Chatbot"
        title="Chatbot"
      />
    </>
  );
};

export default Chatbot;