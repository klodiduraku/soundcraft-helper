import { useState } from "react";
import { useElevenLabs } from "@/hooks/useElevenLabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import VoiceSelector from "./VoiceSelector";
import AudioPlayer from "./AudioPlayer";
import {
  DEFAULT_MODEL,
  DEFAULT_VOICE,
  DEFAULT_STABILITY,
  DEFAULT_SIMILARITY_BOOST,
  DEFAULT_SPEAKER_BOOST,
  MAX_TEXT_LENGTH
} from "@/lib/constants";

interface TextToSpeechFormProps {
  apiKey: string;
}

const TextToSpeechForm = ({ apiKey }: TextToSpeechFormProps) => {
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState(DEFAULT_VOICE);
  const [modelId, setModelId] = useState(DEFAULT_MODEL);
  const [stability, setStability] = useState(DEFAULT_STABILITY);
  const [similarityBoost, setSimilarityBoost] = useState(DEFAULT_SIMILARITY_BOOST);
  const [speakerBoost, setSpeakerBoost] = useState(DEFAULT_SPEAKER_BOOST);
  
  const { isLoading, audioUrl, audioBlob, generateSpeech, resetAudio, isValidApiKey, checkApiKey } = useElevenLabs({ apiKey });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }
    
    if (text.length > MAX_TEXT_LENGTH) {
      toast.error(`Text length exceeds maximum of ${MAX_TEXT_LENGTH} characters`);
      return;
    }
    
    await generateSpeech({
      text,
      voiceId,
      modelId,
      stability,
      similarityBoost,
      speakerBoost
    });
  };

  const handleReset = () => {
    setText("");
    resetAudio();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text">Text to convert</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="min-h-32 resize-y"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {text.length > 0 ? `${text.length} characters` : "Enter your text"}
          </span>
          <span>
            Max: {MAX_TEXT_LENGTH} characters
          </span>
        </div>
      </div>

      {!apiKey && (
        <div className="p-4 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800 dark:text-yellow-400">
            <p><strong>API Key Required</strong></p>
            <p>Please set your ElevenLabs API key in the settings.</p>
          </div>
        </div>
      )}
      
      <VoiceSelector
        selectedVoiceId={voiceId}
        selectedModelId={modelId}
        onVoiceChange={setVoiceId}
        onModelChange={setModelId}
        apiKey={apiKey}
      />
      
      <div className="space-y-6 border-t border-b py-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Stability: {stability.toFixed(2)}</Label>
          </div>
          <Slider
            value={[stability]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(values) => setStability(values[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher stability makes the voice more consistent but less expressive.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Similarity Boost: {similarityBoost.toFixed(2)}</Label>
          </div>
          <Slider
            value={[similarityBoost]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(values) => setSimilarityBoost(values[0])}
          />
          <p className="text-xs text-muted-foreground">
            Higher values make the voice more similar to the original voice.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="speaker-boost"
            checked={speakerBoost}
            onCheckedChange={setSpeakerBoost}
          />
          <Label htmlFor="speaker-boost" className="cursor-pointer">
            Speaker Boost
          </Label>
        </div>
      </div>
      
      <AudioPlayer audioUrl={audioUrl} audioBlob={audioBlob} isLoading={isLoading} onReset={resetAudio} />
      
      <div className="flex space-x-3">
        <Button
          type="submit"
          disabled={isLoading || !text.trim() || !apiKey}
          className="flex-1"
        >
          {isLoading ? "Generating..." : "Generate Speech"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isLoading || !text.trim()}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default TextToSpeechForm;
