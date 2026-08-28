import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceInput = ({ onTranscript, className = '' }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && onTranscript) {
          onTranscript(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
    }
  }, [lang, onTranscript]);

  if (!isSupported) {
    return null; // Gracefully hide if not supported by browser
  }

  const toggleListen = () => {
    if (!speechRecognition) return;

    if (isListening) {
      speechRecognition.stop();
      setIsListening(false);
    } else {
      speechRecognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      try {
        speechRecognition.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition start failed:', err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListen}
      title={isListening ? 'Listening... click to stop' : 'Speak specification requirement'}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
        isListening
          ? 'bg-rose-50 border-rose-400 text-rose-700 animate-pulse ring-2 ring-rose-200'
          : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-2xs'
      } ${className}`}
    >
      {isListening ? (
        <>
          <MicOff className="w-3.5 h-3.5 text-rose-600 animate-spin" />
          <span>Listening ({lang === 'hi' ? 'हिंदी' : 'English'})...</span>
        </>
      ) : (
        <>
          <Mic className="w-3.5 h-3.5 text-gov-600" />
          <span>Voice Input</span>
        </>
      )}
    </button>
  );
};
