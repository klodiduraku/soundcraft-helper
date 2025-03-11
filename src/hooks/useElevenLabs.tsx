
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { textToSpeech, validateApiKey, TextToSpeechOptions } from "@/lib/elevenlabs";
import { EMPTY_AUDIO } from "@/lib/constants";

interface UseElevenLabsProps {
  apiKey: string;
}

export const useElevenLabs = ({ apiKey }: UseElevenLabsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>(EMPTY_AUDIO);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isValidApiKey, setIsValidApiKey] = useState<boolean | null>(null);

  const checkApiKey = useCallback(async () => {
    if (!apiKey) {
      setIsValidApiKey(false);
      return false;
    }

    setIsLoading(true);
    try {
      const isValid = await validateApiKey(apiKey);
      setIsValidApiKey(isValid);
      return isValid;
    } catch (error) {
      console.error("Error validating API key:", error);
      setIsValidApiKey(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const generateSpeech = useCallback(
    async (options: Omit<TextToSpeechOptions, "apiKey">) => {
      if (!apiKey) {
        toast.error("Please enter your ElevenLabs API key");
        return;
      }

      if (isValidApiKey === null) {
        const isValid = await checkApiKey();
        if (!isValid) {
          toast.error("Invalid ElevenLabs API key");
          return;
        }
      } else if (isValidApiKey === false) {
        toast.error("Invalid ElevenLabs API key");
        return;
      }

      setIsLoading(true);
      try {
        const { audioUrl, audioBlob } = await textToSpeech(options, apiKey);
        setAudioUrl(audioUrl);
        setAudioBlob(audioBlob);
        toast.success("Audio generated successfully");
      } catch (error) {
        console.error("Error generating speech:", error);
        toast.error(`Error generating speech: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, isValidApiKey, checkApiKey]
  );

  const resetAudio = useCallback(() => {
    if (audioUrl && audioUrl !== EMPTY_AUDIO) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(EMPTY_AUDIO);
    setAudioBlob(null);
  }, [audioUrl]);

  return {
    isLoading,
    audioUrl,
    audioBlob,
    isValidApiKey,
    generateSpeech,
    checkApiKey,
    resetAudio
  };
};
