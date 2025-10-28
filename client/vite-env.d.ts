/// <reference types="vite/client" />

declare global {
  interface Window {
    smartplayer?: {
      instances: Array<{
        video: HTMLVideoElement;
      }>;
    };
  }
}