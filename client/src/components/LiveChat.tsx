import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "🎯 Popular Packages",
  "💰 Pricing & Costs",
  "🌤️ Best Time to Visit",
  "📋 Visa Assistance",
  "🎒 What's Included",
  "🏔️ Tiger's Nest Info",
  "🎭 Festival Calendar",
  "✨ Why Choose Bhutan",
  "🏨 Luxury Hotels",
  "🚁 Adventure Tours",
  "💑 Honeymoon Packages",
  "👨‍👩‍👧‍👦 Family Tours",
];

const botResponses: Record<string, string> = {
  "🎯 Popular Packages": "Our most popular packages include: \n\n🏛️ **Cultural Heritage Tours** (7-12 days) - $2,400-3,200\n• Tiger's Nest Monastery hike\n• Thimphu & Punakha dzongs\n• Traditional craft workshops\n\n🏔️ **Himalayan Trekking** (11-16 days) - $2,800-4,800\n• Druk Path Trek\n• Jomolhari Base Camp\n• High-altitude camping\n\n🎭 **Festival Experiences** (6-15 days) - $2,400-4,200\n• Paro & Thimphu Tsechus\n• Sacred mask dances\n• Cultural immersion\n\n💕 **Honeymoon Packages** (9-12 days) - $4,200-7,500\n• Luxury accommodations\n• Romantic dining\n• Couples spa treatments\n\nWhich interests you most?",

  "💰 Pricing & Costs": "**Bhutan Tourism Pricing Structure:**\n\n💵 **Daily Sustainable Development Fee:** $200/person/day (includes most services)\n\n🏨 **What's Included:**\n• 3-4 star accommodation\n• All meals (local & international)\n• Private transportation & driver\n• Licensed English-speaking guide\n• All entrance fees & permits\n• Government taxes\n\n💎 **Package Examples:**\n• 7-day Cultural Tour: $2,500-3,500\n• 10-day Trekking: $3,500-4,500\n• 12-day Luxury: $5,500-8,500\n\n✈️ **Not Included:** International flights, travel insurance, personal expenses, tips\n\nWould you like a custom quote?",

  "🌤️ Best Time to Visit": "**Seasonal Guide to Bhutan:**\n\n🌸 **Spring (Mar-May)** - BEST for trekking\n• Rhododendron blooms\n• Clear mountain views\n• Perfect weather (15-20°C)\n• Festival season begins\n\n🍂 **Autumn (Sep-Nov)** - PEAK season\n• Crystal clear skies\n• Best mountain visibility\n• Major festivals\n• Ideal weather (10-20°C)\n\n❄️ **Winter (Dec-Feb)** - Budget friendly\n• Fewer crowds\n• Clear mountain views\n• Cultural focus\n• Cool weather (5-15°C)\n\n🌧️ **Summer (Jun-Aug)** - Monsoon\n• Lush green landscapes\n• Lower prices\n• Some road closures\n• Warm & humid\n\nWhen are you planning to visit?",

  "📋 Visa Assistance": "**Complete Visa Support Included!** ✅\n\n🎯 **We Handle Everything:**\n• Visa application processing\n• Tourism permit arrangements\n• Entry/exit documentation\n• Airport transfer coordination\n\n📝 **Required Documents:**\n• Passport (6+ months validity)\n• Passport photos\n• Travel insurance\n• Flight itinerary\n\n⚡ **Processing Time:** 5-7 working days\n\n🏛️ **Government Requirement:** All tourists must book through licensed operators (like us!)\n\n💡 **Our Advantage:** Direct government connections ensure smooth, hassle-free processing\n\nReady to start your visa process?",

  "🎒 What's Included": "**Comprehensive Package Inclusions:**\n\n🏨 **Accommodation:**\n• 3-4 star hotels/heritage lodges\n• Traditional Bhutanese architecture\n• Modern amenities\n\n🍽️ **Dining:**\n• All meals (breakfast, lunch, dinner)\n• Local Bhutanese cuisine\n• International options\n• Special dietary requirements\n\n🚗 **Transportation:**\n• Private vehicle with driver\n• Airport transfers\n• All internal transport\n• Fuel & parking\n\n👨‍🏫 **Professional Services:**\n• Licensed English-speaking guide\n• Cultural interpretation\n• 24/7 support\n\n🎫 **Fees & Permits:**\n• All entrance fees\n• Photography permits\n• Government taxes\n• Sustainable Development Fee\n\nAnything specific you'd like to know more about?",

  "🏔️ Tiger's Nest Info": "**Tiger's Nest Monastery (Paro Taktsang)** 🏛️\n\n📍 **Location:** Perched 900m above Paro Valley\n⏰ **Hike Duration:** 2-3 hours each way\n🎯 **Difficulty:** Moderate (suitable for most fitness levels)\n\n✨ **Spiritual Significance:**\n• Built around Guru Rinpoche's meditation cave\n• 3 years, 3 months, 3 weeks, 3 days of meditation\n• Most sacred site in Bhutan\n\n📸 **Best Experience Tips:**\n• Start early morning (8 AM)\n• Wear comfortable hiking shoes\n• Bring water & snacks\n• Respect photography rules\n• Allow 5-6 hours total\n\n🎭 **What You'll See:**\n• Breathtaking valley views\n• Ancient Buddhist art\n• Sacred prayer halls\n• Monk ceremonies (if lucky!)\n\nIncluded in all our cultural packages! Ready to plan your visit?",

  "🎭 Festival Calendar": "**2025 Festival Calendar** 🎉\n\n🌸 **Spring Festivals:**\n• Paro Tsechu (Apr 15-19)\n• Punakha Drubchen (Mar 8-10)\n\n🍂 **Autumn Festivals:**\n• Thimphu Tshechu (Sep 20-22)\n• Wangdue Tshechu (Oct 12-14)\n• Bumthang Jambay Lhakhang (Nov 5-7)\n\n🎨 **What to Expect:**\n• Sacred Cham mask dances\n• Colorful traditional costumes\n• Giant thangka unfurling\n• Local food stalls\n• Cultural performances\n\n🎫 **Festival Packages Available:**\n• 6-day Paro Festival: $2,400\n• 7-day Thimphu Festival: $2,600\n• 15-day Multi-Festival: $4,200\n\nWhich festival interests you most?",

  "✨ Why Choose Bhutan": "**Bhutan: The Last Shangri-La** 🏔️\n\n🌍 **World's Only Carbon-Negative Country**\n• 70% forest coverage (constitutional requirement)\n• Sustainable tourism model\n• Environmental conservation priority\n\n😊 **Gross National Happiness Philosophy**\n• Happiness over GDP\n• Balanced development approach\n• Spiritual well-being focus\n\n🏛️ **Authentic Buddhist Kingdom**\n• Living Buddhist culture\n• Ancient dzongs & monasteries\n• Traditional arts & crafts\n• Untouched by mass tourism\n\n🎨 **Unique Experiences:**\n• Traditional architecture everywhere\n• No traffic lights (only traffic police!)\n• Plastic bag ban since 1999\n• Television introduced in 1999\n\n💎 **High-Value, Low-Impact Tourism**\n• Quality over quantity\n• Sustainable Development Fee\n• Preserved culture & environment\n\nReady for a transformative journey?",

  "🏨 Luxury Hotels": "**Bhutan's Finest Accommodations** ✨\n\n👑 **Ultra-Luxury (5-star):**\n• Amankora Thimphu - $1,200/night\n• Uma Paro by COMO - $950/night\n• Six Senses Thimphu - $1,100/night\n\n🏛️ **Heritage Properties:**\n• Zhiwa Ling Heritage Hotel - $650/night\n• Traditional architecture\n• Cultural authenticity\n\n🌿 **Eco-Luxury:**\n• Sustainable practices\n• Organic gardens\n• Wellness programs\n\n🎯 **All Include:**\n• Spa & wellness centers\n• Fine dining restaurants\n• Cultural experiences\n• Mountain views\n• Premium service\n\nInterested in luxury accommodation packages?",

  "🚁 Adventure Tours": "**Thrilling Bhutan Adventures** 🏔️\n\n🥾 **Trekking Expeditions:**\n• Druk Path Trek (11 days) - $2,800\n• Jomolhari Base Camp (16 days) - $4,800\n• Snowman Trek (25 days) - $8,500\n\n🚴 **Adventure Sports:**\n• Mountain biking\n• White water rafting\n• Rock climbing\n• Paragliding\n\n🦅 **Wildlife Adventures:**\n• Black-necked crane watching\n• Himalayan bird watching\n• Wildlife photography\n• Nature conservation tours\n\n🏕️ **What's Included:**\n• Professional guides\n• Camping equipment\n• Safety gear\n• Porter services\n• Emergency support\n\nWhich adventure calls to you?",

  "💑 Honeymoon Packages": "**Romantic Bhutan Honeymoons** 💕\n\n🌹 **Honeymoon Paradise (9 days) - $4,200:**\n• Luxury couple suites\n• Private candlelit dinners\n• Couples spa treatments\n• Romantic Tiger's Nest hike\n\n👑 **Royal Romance (12 days) - $7,500:**\n• Helicopter scenic flights\n• Private palace visits\n• Royal suite accommodations\n• Personal butler service\n\n✨ **Special Inclusions:**\n• Flower decorations\n• Champagne welcome\n• Romantic photography\n• Sunset viewpoints\n• Private cultural shows\n\n🎯 **Perfect for:**\n• Newlyweds\n• Anniversary celebrations\n• Romantic getaways\n• Proposal trips\n\nReady to plan your romantic escape?",

  "👨‍👩‍👧‍👦 Family Tours": "**Perfect Family Adventures** 👨‍👩‍👧‍👦\n\n🎯 **Family Adventure (10 days) - $3,200:**\n• Kid-friendly cultural activities\n• Traditional craft workshops\n• Nature scavenger hunts\n• Family cooking classes\n\n🏠 **Multi-Generation Journey (8 days) - $3,800:**\n• Accessible attractions\n• Comfortable transportation\n• Flexible itinerary\n• Medical support available\n\n👶 **Family-Friendly Features:**\n• Child-friendly accommodations\n• Special kids' meals\n• Educational activities\n• Safety equipment provided\n• Flexible scheduling\n\n🎨 **Activities Kids Love:**\n• Archery lessons\n• Traditional dress try-on\n• Monastery visits with stories\n• Nature walks\n• Cultural games\n\nHow many family members are traveling?"
};

export default function LiveChat(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Tashi Delek! 🙏 Welcome to Bhutan Mind Break! \n\nI'm your AI Travel Consultant, powered by insights from Bhutan's top tour operators including Druk Asia, Heavenly Bhutan, and Bhutan Travel Bureau. \n\n🌟 I can help you with:\n• Package recommendations & pricing\n• Festival dates & cultural experiences\n• Luxury accommodations\n• Visa assistance & travel planning\n• Custom itinerary creation\n\nClick a quick option below or ask me anything about your Bhutan adventure! 🏔️✨",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateIntelligentResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Bhutan general information
    if (lowerQuestion.includes('bhutan') && (lowerQuestion.includes('about') || lowerQuestion.includes('what is') || lowerQuestion.includes('tell me'))) {
      return "🏔️ **About Bhutan - The Last Shangri-La**\n\nBhutan is a mystical Himalayan kingdom known as the 'Land of the Thunder Dragon.' Here's what makes it special:\n\n🌍 **Unique Features:**\n• World's only carbon-negative country\n• Gross National Happiness philosophy\n• 70% forest coverage (constitutional requirement)\n• No traffic lights in the entire country!\n\n🏛️ **Rich Culture:**\n• Living Buddhist heritage\n• Ancient dzongs (fortresses) & monasteries\n• Traditional architecture everywhere\n• Preserved arts & crafts\n\n✨ **Why Visit:**\n• Authentic cultural experiences\n• Pristine Himalayan landscapes\n• Spiritual transformation\n• Sustainable tourism model\n\nWould you like to know about specific tours or destinations?";
    }
    
    // Weather and climate
    if (lowerQuestion.includes('weather') || lowerQuestion.includes('climate') || lowerQuestion.includes('temperature')) {
      return "🌤️ **Bhutan Weather Guide**\n\n**Spring (Mar-May):** 15-20°C\n• Perfect for trekking\n• Rhododendron blooms\n• Clear mountain views\n\n**Summer (Jun-Aug):** 20-25°C\n• Monsoon season\n• Lush green landscapes\n• Some road closures\n\n**Autumn (Sep-Nov):** 10-20°C\n• Best season overall\n• Crystal clear skies\n• Festival season\n\n**Winter (Dec-Feb):** 5-15°C\n• Clear mountain views\n• Fewer crowds\n• Cultural focus\n\nWhen are you planning to visit?";
    }
    
    // Cost and budget
    if (lowerQuestion.includes('cost') || lowerQuestion.includes('price') || lowerQuestion.includes('budget') || lowerQuestion.includes('expensive')) {
      return "💰 **Bhutan Travel Costs**\n\n**Daily Sustainable Development Fee:** $200/person/day\n\n**What's Included:**\n• 3-4 star accommodation\n• All meals\n• Private guide & driver\n• Transportation\n• Entrance fees\n• Government taxes\n\n**Sample Package Costs:**\n• 7-day Cultural: $2,500-3,500\n• 10-day Adventure: $3,500-4,500\n• 12-day Luxury: $5,500-8,500\n\n**Additional Costs:**\n• International flights\n• Travel insurance\n• Personal expenses\n• Tips (optional)\n\nWould you like a custom quote?";
    }
    
    // Visa information
    if (lowerQuestion.includes('visa') || lowerQuestion.includes('permit') || lowerQuestion.includes('entry')) {
      return "📋 **Bhutan Visa Information**\n\n✅ **We Handle Everything:**\n• Visa application processing\n• Tourism permit arrangements\n• Entry/exit documentation\n\n📝 **Required Documents:**\n• Passport (6+ months validity)\n• Passport photos\n• Travel insurance\n• Flight itinerary\n\n⏰ **Processing:** 5-7 working days\n\n🎯 **Important:** All tourists must book through licensed operators like us!\n\nReady to start your visa process?";
    }
    
    // Tiger's Nest
    if (lowerQuestion.includes('tiger') || lowerQuestion.includes('nest') || lowerQuestion.includes('taktsang') || lowerQuestion.includes('monastery')) {
      return "🏔️ **Tiger's Nest Monastery**\n\n📍 **Location:** 900m above Paro Valley\n⏰ **Hike:** 2-3 hours each way\n🎯 **Difficulty:** Moderate\n\n✨ **Why It's Special:**\n• Most sacred site in Bhutan\n• Built around Guru Rinpoche's meditation cave\n• Breathtaking valley views\n• Ancient Buddhist art\n\n🥾 **Hiking Tips:**\n• Start early (8 AM)\n• Wear comfortable shoes\n• Bring water & snacks\n• Allow 5-6 hours total\n\nIncluded in all our cultural packages!";
    }
    
    // Festivals
    if (lowerQuestion.includes('festival') || lowerQuestion.includes('tsechu') || lowerQuestion.includes('celebration')) {
      return "🎭 **Bhutan Festivals**\n\n**Major Festivals:**\n• Paro Tsechu (April)\n• Thimphu Tshechu (September)\n• Punakha Drubchen (March)\n\n**What You'll See:**\n• Sacred mask dances (Cham)\n• Colorful traditional costumes\n• Giant thangka unfurling\n• Local food & crafts\n\n**Festival Packages:**\n• 6-day Paro Festival: $2,400\n• 7-day Thimphu Festival: $2,600\n\nWhich festival interests you?";
    }
    
    // Food
    if (lowerQuestion.includes('food') || lowerQuestion.includes('cuisine') || lowerQuestion.includes('eat') || lowerQuestion.includes('meal')) {
      return "🍽️ **Bhutanese Cuisine**\n\n**Signature Dishes:**\n• Ema Datshi (chili with cheese)\n• Momos (dumplings)\n• Red rice\n• Yak meat dishes\n• Butter tea\n\n**Dining Experience:**\n• All meals included in packages\n• Mix of Bhutanese & international\n• Fresh organic ingredients\n• Vegetarian options available\n• Special dietary needs accommodated\n\n**Cultural Dining:**\n• Traditional farmhouse meals\n• Cooking classes available\n• Local market visits\n\nAny dietary restrictions we should know about?";
    }
    
    // Trekking
    if (lowerQuestion.includes('trek') || lowerQuestion.includes('hiking') || lowerQuestion.includes('mountain') || lowerQuestion.includes('adventure')) {
      return "🥾 **Bhutan Trekking Adventures**\n\n**Popular Treks:**\n• Druk Path (11 days) - $2,800\n• Jomolhari Base Camp (16 days) - $4,800\n• Snowman Trek (25 days) - $8,500\n\n**What's Included:**\n• Professional guides\n• Camping equipment\n• Porter services\n• Safety gear\n• Emergency support\n\n**Best Season:** April-June, Sep-Nov\n\n**Difficulty Levels:**\n• Easy: Valley walks\n• Moderate: Druk Path\n• Challenging: High altitude treks\n\nWhat's your trekking experience level?";
    }
    
    // Accommodation
    if (lowerQuestion.includes('hotel') || lowerQuestion.includes('accommodation') || lowerQuestion.includes('stay') || lowerQuestion.includes('lodge')) {
      return "🏨 **Bhutan Accommodations**\n\n**Luxury (5-star):**\n• Amankora - $1,200/night\n• Uma Paro by COMO - $950/night\n• Six Senses - $1,100/night\n\n**Heritage Properties:**\n• Traditional architecture\n• Cultural authenticity\n• Modern amenities\n\n**Standard (3-4 star):**\n• Comfortable rooms\n• Local hospitality\n• Great value\n\n**All Include:**\n• Daily breakfast\n• WiFi\n• Cultural experiences\n• Mountain views\n\nWhat level of accommodation interests you?";
    }
    
    // Default intelligent response
    return `Thank you for your question about "${question}"! 🙏\n\nI'd be happy to help you with information about:\n\n🎯 **Tour Packages & Pricing**\n🏔️ **Destinations & Attractions**\n🎭 **Festivals & Cultural Events**\n🥾 **Trekking & Adventures**\n🏨 **Accommodations**\n📋 **Visa & Travel Planning**\n\nFor detailed information about your specific question, please contact our travel experts:\n\n📧 info@bhutanmindbreak.com\n📞 +975-2-323251\n\nWe'll provide personalized recommendations within 24 hours! ✨\n\nOr try asking about specific topics like 'Bhutan weather', 'Tiger's Nest', 'festival dates', or 'trekking options'.`;
  };

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
      const botResponse = botResponses[text] || generateIntelligentResponse(text);
      
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
      <div className="fixed bottom-6 right-6 z-[9999]">
        <div className="relative">
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full bg-brand-gradient animate-ping opacity-75"></div>
          <div className="absolute inset-0 rounded-full bg-brand-gradient animate-pulse"></div>
          
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-brand-gradient text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
          >
            <MessageCircle className="w-8 h-8 animate-bounce" />
          </Button>
          
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg h-[700px] p-0 flex flex-col z-[10000] border-0 shadow-2xl">
          <DialogHeader className="p-6 pb-4 bg-brand-gradient text-white rounded-t-lg">
            <DialogTitle className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">Bhutan Travel Assistant</div>
                <div className="text-sm text-teal-100">Powered by local expertise</div>
              </div>
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
                      ? "bg-brand-primary text-white"
                      : "bg-gradient-to-br from-white to-brand-emerald-50 text-gray-900 border border-brand-primary/10"
                  }`}
                >
                  <div className={`flex items-start ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    {message.sender === "bot" && (
                      <Bot className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-teal-600" />
                    )}
                    {message.sender === "user" && (
                      <User className="w-4 h-4 ml-2 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-3 border-t border-gray-100">
            <div className="mb-3 pt-3">
              <p className="text-sm text-gray-600 font-semibold flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                Quick Options:
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => sendMessage(reply)}
                  className="text-xs text-left justify-start h-auto py-2.5 px-3 hover:bg-teal-50 hover:border-teal-300 border-gray-200 rounded-lg transition-all duration-200 hover:shadow-sm"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about Bhutan travel..."
                className="flex-1 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 rounded-xl bg-white"
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 text-center">
                Try asking: "What's the weather like?" or "Tell me about Tiger's Nest"
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}