
export interface Voice {
  id: string;
  name: string;
  description: string;
  category: string;
  labels: Record<string, string>;
  accent?: string;
  gender?: string;
  useCase?: string;
}

// Top voices from ElevenLabs
export const ELEVEN_LABS_VOICES: Voice[] = [
  {
    id: "9BWtsMINqrJLrRacOk9x",
    name: "Aria",
    description: "A versatile female voice with a pleasant tone",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Versatile" }
  },
  {
    id: "CwhRBWXzGAHq8TQ4Fs17",
    name: "Roger",
    description: "A deep, authoritative male voice",
    category: "Featured",
    labels: { accent: "British", gender: "Male", useCase: "Narration" }
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
    description: "A friendly female voice with a natural cadence",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Conversation" }
  },
  {
    id: "FGY2WhTYpPnrIDTdsKH5",
    name: "Laura",
    description: "A soft-spoken female voice with a warm quality",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Storytelling" }
  },
  {
    id: "IKne3meq5aSn9XLyUdCD",
    name: "Charlie",
    description: "A youthful male voice with conversational quality",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Conversation" }
  },
  {
    id: "JBFqnCBsd6RMkjVDRZzb",
    name: "George",
    description: "A polished male voice with professional tone",
    category: "Featured",
    labels: { accent: "British", gender: "Male", useCase: "Narration" }
  },
  {
    id: "N2lVS1w4EtoT3dr4eOWO",
    name: "Callum",
    description: "A friendly male voice with a casual tone",
    category: "Featured",
    labels: { accent: "British", gender: "Male", useCase: "Conversation" }
  },
  {
    id: "SAz9YHcvj6GT2YYXdXww",
    name: "River",
    description: "A unique voice with androgynous quality",
    category: "Featured",
    labels: { accent: "American", gender: "Neutral", useCase: "Creative" }
  },
  {
    id: "TX3LPaxmHKxFdv7VOQHJ",
    name: "Liam",
    description: "A confident male voice with a clear delivery",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Presentation" }
  },
  {
    id: "XB0fDUnXU5powFXDhCwa",
    name: "Charlotte",
    description: "An elegant female voice with a refined quality",
    category: "Featured",
    labels: { accent: "British", gender: "Female", useCase: "Narration" }
  },
  {
    id: "Xb7hH8MSUJpSbSDYk0k2",
    name: "Alice",
    description: "A soothing female voice perfect for educational content",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Education" }
  },
  {
    id: "XrExE9yKIg1WjnnlVkGX",
    name: "Matilda",
    description: "A clear, expressive female voice",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Audiobooks" }
  },
  {
    id: "bIHbv24MWmeRgasZH58o",
    name: "Will",
    description: "A friendly male voice with a relatable quality",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Narration" }
  },
  {
    id: "cgSgspJ2msm6clMCkdW9",
    name: "Jessica",
    description: "An engaging female voice with a dynamic range",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Presentation" }
  },
  {
    id: "cjVigY5qzO86Huf0OWal",
    name: "Eric",
    description: "A clear male voice with a professional tone",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Business" }
  },
  {
    id: "iP95p4xoKVk53GoZ742B",
    name: "Chris",
    description: "A natural male voice with conversational flow",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Podcasting" }
  },
  {
    id: "nPczCjzI2devNBz1zQrb",
    name: "Brian",
    description: "A confident male voice with gravitas",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Documentary" }
  },
  {
    id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel",
    description: "A deep male voice with a warm quality",
    category: "Featured",
    labels: { accent: "British", gender: "Male", useCase: "Narration" }
  },
  {
    id: "pFZP5JQG7iQjIQuC4Bku",
    name: "Lily",
    description: "A bright female voice with a youthful energy",
    category: "Featured",
    labels: { accent: "American", gender: "Female", useCase: "Animation" }
  },
  {
    id: "pqHfZKP75CvOlQylNhV4",
    name: "Bill",
    description: "A versatile male voice with an approachable tone",
    category: "Featured",
    labels: { accent: "American", gender: "Male", useCase: "Versatile" }
  }
];

export const ELEVEN_LABS_MODELS = [
  {
    id: "eleven_multilingual_v2",
    name: "Eleven Multilingual v2",
    description: "Our most life-like, emotionally rich model in 29 languages. Best for voice overs, audiobooks, and content creation."
  },
  {
    id: "eleven_turbo_v2_5",
    name: "Eleven Turbo v2.5",
    description: "High quality, low latency model in 32 languages. Best for developer use cases where speed matters."
  },
  {
    id: "eleven_turbo_v2",
    name: "Eleven Turbo v2",
    description: "English-only, low latency model. Best for developer use cases where speed matters and you only need English."
  },
  {
    id: "eleven_multilingual_v1",
    name: "Eleven Multilingual v1",
    description: "Our first multilingual model, capability of generating speech in 10 languages."
  },
  {
    id: "eleven_multilingual_sts_v2",
    name: "Eleven Multilingual v2 (STS)",
    description: "Multilingual speech-to-speech model for maximum control over content and prosody across various languages."
  },
  {
    id: "eleven_monolingual_v1",
    name: "Eleven English v1",
    description: "Our first ever text to speech model."
  },
  {
    id: "eleven_english_sts_v2",
    name: "Eleven English v2 (STS)",
    description: "Speech to speech model for maximum control over content and prosody."
  }
];

export const DEFAULT_MODEL = "eleven_multilingual_v2";
export const DEFAULT_VOICE = "pFZP5JQG7iQjIQuC4Bku"; // Lily
export const DEFAULT_STABILITY = 0.5;
export const DEFAULT_SIMILARITY_BOOST = 0.75;
export const DEFAULT_STYLE = 0;
export const DEFAULT_SPEAKER_BOOST = true;
export const MAX_TEXT_LENGTH = 5000;

export const EMPTY_AUDIO = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
