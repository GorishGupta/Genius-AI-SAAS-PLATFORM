"use client";
// Import the dev tools and initialize them
import { useEffect } from "react";

export function TempoInit() {
  useEffect(() => {
    const init = async () => {
      try {
        if (process.env.NEXT_PUBLIC_TEMPO) {
          // Use dynamic import with explicit error handling
          const tempoModule = await import(
            /* webpackChunkName: "tempo-devtools" */ "tempo-devtools"
          ).catch((err) => {
            console.error("Failed to load tempo-devtools module:", err);
            return null;
          });

          if (tempoModule && tempoModule.TempoDevtools) {
            tempoModule.TempoDevtools.init();
          } else {
            console.warn("TempoDevtools not available or failed to initialize");
          }
        }
      } catch (error) {
        console.error("Failed to initialize Tempo devtools:", error);
      }
    };

    init();
  }, []);

  return null;
}
