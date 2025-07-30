import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "What tour packages do you offer?",
  "How much does it cost to visit Bhutan?",
  "What's the best time to visit?",
  "Do you provide visa assistance?",
  "What's included in the tours?",
  "Tell me about Tiger's Nest Monastery",
  "What festivals can I experience?",
  "What makes Bhutan special?",
];

const botResponses: Record<string, string> = {
  "What tour packages do you offer?": "We offer diverse experiences inspired by Bhutan's finest operators: 🏔️ Cultural Immersion (like Heavenly Bhutan's eco-luxury tours), 🥾 Himalayan Trekking (Windhorse Tours style adventures), 🧘 Spiritual Journeys (Bhutan Peaceful Tour's personalized paths), 📸 Photography Tours, and 🎭 Festival Experiences (Away to Bhutan's authentic celebrations). Each can be fully customized!",
  
  "How much does it cost to visit Bhutan?": "Our premium packages start from $2,500 for 7 days, including the Sustainable Development Fee ($200/day), luxury accommodation, all meals, private transportation, expert guides, and permits. We follow the high-value, low-impact tourism model that makes Bhutan special. Contact us for detailed pricing based on your preferences!",
  
  "What's the best time to visit?": "🌸 Spring (Mar-May): Rhododendron blooms, clear mountain views, perfect for trekking. 🍂 Autumn (Sep-Nov): Crystal clear skies, ideal weather, festival season. ❄️ Winter (Dec-Feb): Fewer crowds, clear mountain views, cultural tours. 🌧️ Summer (Jun-Aug): Lush landscapes, monsoon season. Each season offers unique magic!",
  
  "Do you provide visa assistance?": "Absolutely! As a licensed Bhutanese tour operator, we handle all visa arrangements and permits. Bhutan requires tourists to book through licensed operators like us - it's part of our sustainable tourism policy. We'll take care of everything from visa processing to airport transfers!",
  
  "What's included in the tours?": "Our comprehensive packages include: 🏨 Premium accommodation (3-4 star hotels/heritage lodges), 🍽️ All meals featuring local and international cuisine, 🚗 Private transportation with experienced drivers, 👨‍🏫 Licensed English-speaking guides, 🎫 All entrance fees and permits, 🏛️ Government taxes, and 📋 Visa processing. International flights separate but we assist with booking!",
  
  "Tell me about Tiger's Nest Monastery": "Tiger's Nest (Taktsang) is Bhutan's most iconic monastery, dramatically perched on a cliff 900m above Paro valley! 🏔️ Built around a cave where Guru Rinpoche meditated for 3 years, 3 months, 3 weeks, and 3 days. The 3-hour hike offers breathtaking views and spiritual significance. Best visited early morning for fewer crowds and magical lighting!",
  
  "What festivals can I experience?": "Bhutan's festivals (tsechus) are spectacular! 🎭 Paro Tsechu (Spring): Mask dances, sacred unfurling of giant thangka. 🏛️ Thimphu Tsechu (Autumn): Capital's grandest celebration. 🌾 Wangdue Tsechu: Authentic local experience. Each features colorful mask dances, traditional music, and deep spiritual significance. Festivals vary by lunar calendar - we'll help you time your visit perfectly!",
  
  "What makes Bhutan special?": "Bhutan is the world's only carbon-negative country and the Last Shangri-La! 🌱 Gross National Happiness over GDP, 🏔️ 70% forest coverage by constitution, 🏛️ Ancient dzongs and monasteries, 👥 Authentic Buddhist culture, 🎨 Traditional arts (Zorig Chusum), and 🕊️ High-value, low-impact tourism ensuring pristine preservation. It's not just a destination - it's a transformative experience!"
};

export default function LiveChat(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to Bhutan Mind Break! 🏔️ I'm your Travel Assistant, trained with insights from Bhutan's finest tour operators. I'm here to help you plan your perfect journey to the Last Shangri-La. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = botResponses[text] || "Thank you for your question! For detailed information about our premium Bhutan experiences, please contact our travel experts at info@bhutanmindbreak.com or call +975-2-323251. We specialize in creating transformative journeys that combine the best of cultural immersion, adventure, and spiritual discovery. We'll get back to you within 24 hours with personalized recommendations!";
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md h-[600px] p-0 flex flex-col">
          <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-6 h-6 mr-2" />
                Travel Assistant
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === "bot" && (
                      <Bot className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="w-4 h-4 ml-2 mt-0.5 flex-shrink-0 order-2" />
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => sendMessage(reply)}
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about tours, pricing, or travel tips..."
                className="flex-1"
              />
              <Button type="submit" size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}