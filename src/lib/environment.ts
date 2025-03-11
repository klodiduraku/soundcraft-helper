
// Environment variable access with fallbacks
// Vite exposes environment variables on the import.meta.env object

export const getElevenLabsApiKey = (): string => {
  return import.meta.env.VITE_ELEVENLABS_API_KEY || '';
};

export const isProduction = (): boolean => {
  return import.meta.env.PROD || false;
};
