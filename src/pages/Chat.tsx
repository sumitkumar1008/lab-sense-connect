import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Send, 
  FileText, 
  Image, 
  User, 
  Bot, 
  Plus,
  MessageSquare,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  file?: {
    name: string;
    type: string;
  };
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your LabSense assistant. I can help you understand your lab results in plain English. Upload your lab report or ask me any questions about your health data.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const chatHistory = [
    { title: "Blood Panel Results", date: "2 days ago" },
    { title: "Cholesterol Report", date: "1 week ago" },
    { title: "Vitamin D Test", date: "2 weeks ago" }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      file: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type
      } : undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setSelectedFile(null);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: selectedFile 
          ? `I've received your ${selectedFile.type.includes('pdf') ? 'PDF' : 'image'} file "${selectedFile.name}". Let me analyze this lab report for you. This appears to be a comprehensive panel - I can explain each marker in plain English and highlight any values that might need attention.`
          : "I understand your question. While I can provide general information about lab values and health markers, please remember that I cannot replace professional medical advice. Would you like me to explain specific lab values or help you understand what certain results might mean?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border p-6 hidden lg:block">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Chat History</h2>
            <div className="space-y-2">
              {chatHistory.map((chat, index) => (
                <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors border-0 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {chat.title}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {chat.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <Button className="w-full justify-start" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">LabSense Assistant</h1>
              <p className="text-sm text-muted-foreground">AI-powered lab result analysis</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start space-x-3 ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === "user" 
                    ? "bg-primary" 
                    : "bg-gradient-primary"
                }`}>
                  {message.sender === "user" ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-3xl ${
                  message.sender === "user" ? "text-right" : ""
                }`}>
                  <Card className={`${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground ml-auto" 
                      : "bg-card"
                  } border-0 shadow-soft`}>
                    <CardContent className="p-4">
                      {message.file && (
                        <div className="mb-3 p-3 bg-accent/20 rounded-lg flex items-center space-x-2">
                          {message.file.type.includes('pdf') ? (
                            <FileText className="h-4 w-4 text-accent" />
                          ) : (
                            <Image className="h-4 w-4 text-accent" />
                          )}
                          <span className="text-sm font-medium">{message.file.name}</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-card border-t border-border p-6">
          <div className="max-w-4xl mx-auto">
            {selectedFile && (
              <div className="mb-4 p-3 bg-accent-light rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedFile.type.includes('pdf') ? (
                    <FileText className="h-4 w-4 text-accent" />
                  ) : (
                    <Image className="h-4 w-4 text-accent" />
                  )}
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  ×
                </Button>
              </div>
            )}
            
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <div className="flex items-end space-x-2">
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="file-upload"
                    />
                    <Button variant="outline" size="icon" asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                      </label>
                    </Button>
                  </div>
                  
                  <Input
                    placeholder="Ask about your lab results or type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() && !selectedFile}
                className="bg-gradient-primary hover:shadow-medium"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              LabSense provides educational information only. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;