
export interface TextToSpeechOptions {
  text: string;
  voiceId: string;
  modelId: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  speakerBoost?: boolean;
}

export interface TextToSpeechResponse {
  audioUrl: string;
  audioBlob: Blob;
}

export const textToSpeech = async (
  options: TextToSpeechOptions,
  apiKey: string
): Promise<TextToSpeechResponse> => {
  const {
    text,
    voiceId,
    modelId,
    stability = 0.5,
    similarityBoost = 0.75,
    style = 0,
    speakerBoost = true
  } = options;

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability,
        similarity_boost: similarityBoost,
        style,
        use_speaker_boost: speakerBoost,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `ElevenLabs API error: ${response.status} ${response.statusText}\n${
        errorData.detail?.message || JSON.stringify(errorData)
      }`
    );
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);

  return { audioUrl, audioBlob };
};

export const getVoices = async (apiKey: string) => {
  const response = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: {
      "xi-api-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch voices: ${response.statusText}`);
  }

  const data = await response.json();
  return data.voices;
};

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch("https://api.elevenlabs.io/v1/user", {
      headers: {
        "xi-api-key": apiKey,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
