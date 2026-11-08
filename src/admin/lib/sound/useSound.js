import { useCallback } from 'react';
import { useTemplate } from '../../theme/ThemeProvider.jsx';
export function useSound() {
  const {
    config
  } = useTemplate();
  return useCallback(kind => {
    if (config.sound.enabled && config.sound.categories[kind] && navigator.userActivation?.hasBeenActive) void import('./synth.js').then(({
      playTone
    }) => playTone(kind, config.sound.volume)).catch(() => {});
  }, [config.sound]);
}

