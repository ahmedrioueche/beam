import { dict } from "@/lib/dict";
import { Message } from "@/lib/types";
import { Send } from "lucide-react";
import { useState } from "react";

const Chat: React.FC<{isLive : boolean | undefined}> = ({isLive}) => {
  const selectedLanguage = "english";
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: { name: "User1", avatarUrl: "/images/cat.jpg" },
      content: "Hello everyone!",
      timestamp: "2:30 PM"
    },
    {
      id: 2,
      user: { name: "User2", avatarUrl: "/images/puppy.jpeg" },
      content: "Great stream!",
      timestamp: "2:31 PM"
    }
  ]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg: Message = {
        id: messages.length + 1,
        user: { name: "You", avatarUrl: "/api/placeholder/32/32" },
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };
  {}
  return (
    <div className="bg-light-surface dark:bg-dark-surface h-full flex flex-col rounded-lg shadow-lg">
      <div className="p-4 border-b border-light-muted dark:border-dark-muted">
        <h2 className="text-base text-center font-f2 font-semibold text-light-text-primary dark:text-dark-text-primary">{isLive? dict[selectedLanguage].liveChat : dict[selectedLanguage].chatDisabled}</h2>
      </div>
      {isLive && (
        <div className="flex-grow overflow-y-auto scrollbar-hide p-4 space-y-4">      
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-2">
              <img src={msg.user.avatarUrl} alt={msg.user.name} className="w-8 h-8 rounded-full" />
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-f2 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">{msg.user.name}</span>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-light-text-primary dark:text-dark-text-primary mt-1">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLive && (
        <div className="p-4 border-t border-light-muted dark:border-dark-muted">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            />
            <button
              onClick={handleSendMessage}
              className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-light-text-primary dark:text-dark-text-primary rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            >
              <Send size={20} />
            </button>
          </div>
       </div>
      )}
    </div>
  );
};

export default Chat;