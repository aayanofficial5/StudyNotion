import React, { useState, useRef, useEffect } from "react";
import { SiChatbot } from "react-icons/si";
import { IoMdSend } from "react-icons/io";
import { FaRobot, FaUser } from "react-icons/fa";
import { formatTime } from "../../utils/formatTime";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your Study Assistant. Ask me anything! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    // inputRef.current?.blur();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botText = "";

      // Insert empty bot message to update as we receive text
      const botIndex = messages.length + 1;
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "", timestamp: new Date() },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        botText += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[botIndex] = {
            sender: "bot",
            text: botText,
            timestamp: new Date(),
          };
          return updated;
        });
      }
    } catch (err) {
      console.error("Stream error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 to-indigo-700 hover:scale-115 transition-all duration-700 text-white p-3 rounded-full shadow-lg z-50"
          aria-label="Open Assistant"
        >
          <SiChatbot className="w-7 h-7" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[350px] max-h-[500px] bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-blue-600 z-50">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white font-semibold p-3 flex justify-between items-center shadow-md">
            <span>StudyHub Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 text-lg"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== "user" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
                    <FaRobot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div className="flex flex-col max-w-[80%] space-y-1">
                  <div
                    className={`px-4 py-2 rounded-xl break-words shadow-md leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-right self-end"
                        : "bg-gray-800/70 text-white text-left border border-gray-700"
                    }`}
                  >
                    {msg.sender === "bot" && msg.text.includes("-") ? (
                      (() => {
                        const lines = msg.text.split("\n").filter(Boolean);
                        const [firstRaw, ...rest] = lines;
                        const first = firstRaw.replace(/^-+\s*/, "");

                        return (
                          <div className="space-y-2">
                            <p className="font-medium">{first}</p>
                            <ul className="list-disc list-inside space-y-1">
                              {rest
                                .map((line) =>
                                  line.replace(/^-+\s*/, "").trim()
                                )
                                .filter(Boolean)
                                .map((line, idx) => (
                                  <li key={idx} className="leading-relaxed">
                                    {line}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        );
                      })()
                    ) : (
                      <p className="leading-relaxed whitespace-pre-line">
                        {msg.text}
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-xs text-muted-foreground ${
                      msg.sender === "user"
                        ? "text-right self-end"
                        : "text-left"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="h-8 w-8 rounded-full bg-gray-700/80 flex items-center justify-center border border-gray-600 shadow-sm">
                    <FaUser className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="italic text-xs text-gray-400 px-2">
                Assistant is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex border-t border-blue-600">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-4 py-2 bg-black/60 text-white placeholder:text-gray-400 text-sm focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className={`px-4 text-white text-lg ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700 hover:scale-105 transition-transform"
              }`}
              disabled={loading}
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
