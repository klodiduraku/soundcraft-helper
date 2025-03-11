
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, Info } from "lucide-react";

interface HeaderProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

const Header = ({ apiKey, onApiKeyChange }: HeaderProps) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    onApiKeyChange(localApiKey);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="container max-w-5xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold tracking-tight">VoiceForge</h1>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            by ElevenLabs
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>API Key</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] animate-fade-in">
              <DialogHeader>
                <DialogTitle>ElevenLabs API Key</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium">
                    Enter your API Key
                  </label>
                  <Input
                    id="apiKey"
                    value={localApiKey}
                    onChange={(e) => setLocalApiKey(e.target.value)}
                    placeholder="Enter your ElevenLabs API key"
                    type="password"
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from{" "}
                    <a
                      href="https://elevenlabs.io/app/account/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      ElevenLabs dashboard
                    </a>
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
                <span className="sr-only">About</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] animate-fade-in">
              <DialogHeader>
                <DialogTitle>About VoiceForge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm">
                  VoiceForge is a text-to-speech application powered by ElevenLabs.
                  Convert your text to natural-sounding speech using state-of-the-art AI voices.
                </p>
                <p className="text-sm">
                  To use this application, you need an ElevenLabs API key. 
                  Get one by signing up at{" "}
                  <a
                    href="https://elevenlabs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    elevenlabs.io
                  </a>
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
