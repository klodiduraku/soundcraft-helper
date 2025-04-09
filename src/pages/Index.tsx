
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextToSpeechForm from "@/components/TextToSpeechForm";
import { getElevenLabsApiKey } from "@/lib/environment";

const Index = () => {
  const [apiKey, setApiKey] = useState(getElevenLabsApiKey());

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("elevenlabs-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage whenever it changes
  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem("elevenlabs-api-key", newApiKey);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      
      <main className="container max-w-5xl mx-auto pt-28 pb-16 px-4 animate-fade-in">
        <div className="space-y-6 mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in hover-lift">
            Text-to-Speech with ElevenLabs
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
            Transform text into natural speech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Create lifelike voice content with AI-powered speech synthesis
          </p>
        </div>
        
        <div className="my-10 max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl animate-pulse-slow -z-10"></div>
          <div className="modern-card bg-card/70 backdrop-blur-sm border p-6 md:p-8 lg:p-10 shadow-lg animate-scale-in">
            <TextToSpeechForm apiKey={apiKey} />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-8 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-primary hover:underline focus-ring"
            >
              ElevenLabs
            </a>
            {" "}API. This is a demo application.
          </p>
          <p className="text-xs opacity-70">© {new Date().getFullYear()} VoiceForge</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
