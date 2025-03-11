
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextToSpeechForm from "@/components/TextToSpeechForm";

const Index = () => {
  const [apiKey, setApiKey] = useState("sk_2d323ace39650294a472fa8f58d750a33890fb943340228f");

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
      
      <main className="container max-w-5xl mx-auto pt-24 pb-16 px-4 animate-fade-in">
        <div className="space-y-4 mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in">
            Text-to-Speech with ElevenLabs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Transform text into natural speech
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create lifelike voice content with AI-powered speech synthesis
          </p>
        </div>
        
        <div className="my-8">
          <div className="bg-card rounded-xl shadow-sm border p-6 md:p-8">
            <TextToSpeechForm apiKey={apiKey} />
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              ElevenLabs
            </a>
            {" "}API. This is a demo application.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
