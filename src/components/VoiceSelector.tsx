
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ELEVEN_LABS_MODELS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getVoices } from "@/lib/elevenlabs";
import { Loader2, VolumeX, Volume2 } from "lucide-react";

interface Voice {
  voice_id: string;
  name: string;
  labels: Record<string, string>;
  category?: string;
}

interface VoiceSelectorProps {
  selectedVoiceId: string;
  selectedModelId: string;
  onVoiceChange: (voiceId: string) => void;
  onModelChange: (modelId: string) => void;
  apiKey: string;
}

const VoiceSelector = ({
  selectedVoiceId,
  selectedModelId,
  onVoiceChange,
  onModelChange,
  apiKey,
}: VoiceSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewVoiceId, setPreviewVoiceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      if (!apiKey) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedVoices = await getVoices(apiKey);
        setVoices(fetchedVoices);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching voices:", err);
        setError("Failed to load voices. Please check your API key.");
        setIsLoading(false);
      }
    };
    
    fetchVoices();
  }, [apiKey]);

  useEffect(() => {
    let filtered = voices;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(voice => 
        voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(voice.labels || {}).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(voice => {
        if (selectedFilter === "male" || selectedFilter === "female" || selectedFilter === "neutral") {
          return voice.labels?.gender?.toLowerCase() === selectedFilter;
        } else if (selectedFilter === "other") {
          return !voice.labels?.gender || 
            !["male", "female", "neutral"].includes(voice.labels.gender.toLowerCase());
        }
        return voice.labels?.accent?.toLowerCase() === selectedFilter;
      });
    }
    
    setFilteredVoices(filtered);
  }, [searchTerm, selectedFilter, voices]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [audio]);

  const getUniqueAccents = () => {
    const accents = new Set<string>();
    voices.forEach(voice => {
      if (voice.labels?.accent) {
        accents.add(voice.labels.accent.toLowerCase());
      }
    });
    return Array.from(accents);
  };

  const uniqueAccents = getUniqueAccents();

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 space-y-2">
          <label className="text-sm font-medium">Model</label>
          <Select value={selectedModelId} onValueChange={onModelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {ELEVEN_LABS_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id} className="cursor-pointer">
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[300px]">
                      {model.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/2 space-y-2">
          <label className="text-sm font-medium">Search Voices</label>
          <Input
            type="text"
            placeholder="Search by name, accent, or gender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Voices</h3>
          <Tabs 
            value={selectedFilter} 
            onValueChange={setSelectedFilter}
            className="w-auto"
          >
            <TabsList className="grid grid-cols-6 h-8 w-auto md:w-[450px]">
              <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
              <TabsTrigger value="male" className="text-xs px-2">Male</TabsTrigger>
              <TabsTrigger value="female" className="text-xs px-2">Female</TabsTrigger>
              <TabsTrigger value="neutral" className="text-xs px-2">Neutral</TabsTrigger>
              <TabsTrigger value="british" className="text-xs px-2">British</TabsTrigger>
              <TabsTrigger value="other" className="text-xs px-2">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading voices...</span>
          </div>
        ) : error ? (
          <div className="p-6 text-center border border-destructive/20 bg-destructive/5 rounded-lg">
            <p className="text-destructive">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please check that your API key is valid and try again.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[320px] overflow-y-auto pr-1">
            {filteredVoices.length > 0 ? filteredVoices.map((voice) => (
              <div
                key={voice.voice_id}
                onClick={() => onVoiceChange(voice.voice_id)}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all duration-200 relative
                  ${selectedVoiceId === voice.voice_id 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                  }
                `}
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{voice.name}</span>
                    {selectedVoiceId === voice.voice_id && (
                      <Badge variant="outline" className="bg-primary/10 text-primary text-[10px] h-5">
                        Selected
                      </Badge>
                    )}
                  </div>
                  {voice.labels && Object.keys(voice.labels).length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {Object.entries(voice.labels).map(([key, value]) => (
                        typeof value === 'string' && (
                          <Badge 
                            key={`${voice.voice_id}-${key}`} 
                            variant="secondary"
                            className="text-[10px] h-5"
                          >
                            {value}
                          </Badge>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-full p-6 text-center text-muted-foreground">
                No voices found matching your criteria.
              </div>
            )}
          </div>
        )}
        
        {voices.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {uniqueAccents.length > 0 && uniqueAccents.map(accent => (
              <Badge 
                key={accent}
                onClick={() => setSelectedFilter(accent)}
                className={`cursor-pointer px-3 py-1 capitalize ${
                  selectedFilter === accent 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {accent}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceSelector;
