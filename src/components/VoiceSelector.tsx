
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ELEVEN_LABS_VOICES, ELEVEN_LABS_MODELS, Voice } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface VoiceSelectorProps {
  selectedVoiceId: string;
  selectedModelId: string;
  onVoiceChange: (voiceId: string) => void;
  onModelChange: (modelId: string) => void;
}

const VoiceSelector = ({
  selectedVoiceId,
  selectedModelId,
  onVoiceChange,
  onModelChange,
}: VoiceSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>(ELEVEN_LABS_VOICES);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    let filtered = ELEVEN_LABS_VOICES;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(voice => 
        voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(voice.labels).some(value => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply category filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(voice => {
        if (selectedFilter === "male" || selectedFilter === "female" || selectedFilter === "neutral") {
          return voice.labels.gender?.toLowerCase() === selectedFilter;
        }
        return voice.labels.accent?.toLowerCase() === selectedFilter;
      });
    }
    
    setFilteredVoices(filtered);
  }, [searchTerm, selectedFilter]);

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
            <TabsList className="grid grid-cols-4 h-8 w-auto">
              <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
              <TabsTrigger value="male" className="text-xs px-2">Male</TabsTrigger>
              <TabsTrigger value="female" className="text-xs px-2">Female</TabsTrigger>
              <TabsTrigger value="british" className="text-xs px-2">British</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[280px] overflow-y-auto pr-1">
          {filteredVoices.map((voice) => (
            <div
              key={voice.id}
              onClick={() => onVoiceChange(voice.id)}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${selectedVoiceId === voice.id 
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-border hover:border-primary/50 hover:bg-secondary"
                }
              `}
            >
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{voice.name}</span>
                  {selectedVoiceId === voice.id && (
                    <Badge variant="outline" className="bg-primary/10 text-primary text-[10px] h-5">
                      Selected
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {Object.entries(voice.labels).map(([key, value]) => (
                    <Badge 
                      key={`${voice.id}-${key}`} 
                      variant="secondary"
                      className="text-[10px] h-5"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {filteredVoices.length === 0 && (
            <div className="col-span-full p-6 text-center text-muted-foreground">
              No voices found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSelector;
