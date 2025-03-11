
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mic, Wand2 } from "lucide-react";
import VoiceSelector from "./VoiceSelector";
import AudioPlayer from "./AudioPlayer";
import { useElevenLabs } from "@/hooks/useElevenLabs";
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
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { 
    isLoading, 
    audioUrl, 
    audioBlob, 
    generateSpeech, 
    resetAudio 
  } = useElevenLabs({ apiKey });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    await generateSpeech({
      text,
      voiceId,
      modelId,
      stability,
      similarityBoost,
      speakerBoost
    });
  };

  const remainingChars = MAX_TEXT_LENGTH - text.length;
  const isTextValid = text.trim().length > 0 && remainingChars >= 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text" className="text-sm font-medium">Text to Convert</Label>
        <Textarea
          id="text"
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="resize-none focus-visible:ring-1 focus-visible:ring-primary"
        />
        <div className="flex justify-between text-xs">
          <span>{text.length} / {MAX_TEXT_LENGTH} characters</span>
          {remainingChars < 0 && (
            <span className="text-destructive">
              Exceeded by {Math.abs(remainingChars)} characters
            </span>
          )}
        </div>
      </div>

      <VoiceSelector
        selectedVoiceId={voiceId}
        selectedModelId={modelId}
        onVoiceChange={setVoiceId}
        onModelChange={setModelId}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Advanced Settings</h3>
          <Switch
            checked={showAdvanced}
            onCheckedChange={setShowAdvanced}
          />
        </div>
        
        {showAdvanced && (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="stability" className="text-sm">Voice Stability: {stability.toFixed(2)}</Label>
              </div>
              <Slider
                id="stability"
                min={0}
                max={1}
                step={0.01}
                value={[stability]}
                onValueChange={(values) => setStability(values[0])}
              />
              <p className="text-xs text-muted-foreground">
                Lower values result in more dynamic and varied speech, while higher values make it more consistent.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="similarity" className="text-sm">
                  Similarity Boost: {similarityBoost.toFixed(2)}
                </Label>
              </div>
              <Slider
                id="similarity"
                min={0}
                max={1}
                step={0.01}
                value={[similarityBoost]}
                onValueChange={(values) => setSimilarityBoost(values[0])}
              />
              <p className="text-xs text-muted-foreground">
                Higher values help preserve the voice character and avoid artifacting.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="speakerBoost"
                checked={speakerBoost}
                onCheckedChange={setSpeakerBoost}
              />
              <Label htmlFor="speakerBoost" className="text-sm cursor-pointer">
                Speaker Boost
              </Label>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Button
            type="submit"
            disabled={!isTextValid || isLoading}
            className="w-full gap-2 h-12"
          >
            {isLoading ? (
              <>
                <Mic className="h-4 w-4 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Generate Speech
              </>
            )}
          </Button>
        </div>
        
        <div className="w-full md:w-1/2">
          <AudioPlayer 
            audioUrl={audioUrl} 
            audioBlob={audioBlob} 
            onReset={resetAudio}
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default TextToSpeechForm;
