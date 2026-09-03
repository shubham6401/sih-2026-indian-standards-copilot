import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceInput = ({ onTranscript, className = '' }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [capturedRecently, setCapturedRecently] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript && onTranscriptRef.current) {
        onTranscriptRef.current(transcript);
        setCapturedRecently(true);
        setTimeout(() => setCapturedRecently(false), 3000);
      }
      setIsListening(false);
      setErrorMessage('');
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setErrorMessage('Microphone permission was denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'no-speech') {
        setErrorMessage('No speech was detected. Please try speaking closer to the microphone.');
      } else if (event.error === 'network') {
        setErrorMessage('Network error occurred during speech recognition. Please retry.');
      } else {
        setErrorMessage(`Voice recognition notice: ${event.error}`);
      }
      setTimeout(() => setErrorMessage(''), 5000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {}
    };
  }, []);

  // Synchronize language change immediately with recognition engine
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    }
  }, [lang]);

  const toggleListen = () => {
    if (!isSupported) {
      alert('Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge, or type your specification manually.');
      return;
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    } else {
      setErrorMessage('');
      try {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition start failed:', err.message);
        setIsListening(false);
      }
    }
  };

  if (!isSupported) {
    return (
      <button
        type="button"
        disabled
        title="Voice input is not supported in this browser. Please use Chrome/Edge or type manually."
        aria-label="Voice input not supported"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-400 bg-slate-50 text-xs font-semibold cursor-not-allowed opacity-60 ${className}`}
      >
        <MicOff className="w-3.5 h-3.5" />
        <span>Voice (Not Supported)</span>
      </button>
    );
  }

  return (
    <div className="relative inline-flex flex-col items-start">
      <button
        type="button"
        onClick={toggleListen}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        title={
          isListening
            ? 'Listening... Click to stop recording'
            : `Speak specification in ${lang === 'hi' ? 'Hindi (हिंदी)' : 'English / Hinglish'}`
        }
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
          isListening
            ? 'bg-rose-50 border-rose-400 text-rose-700 animate-pulse ring-2 ring-rose-200 shadow-sm'
            : capturedRecently
            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-2xs hover:border-slate-400'
        } ${className}`}
      >
        {isListening ? (
          <>
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping shrink-0" />
            <span>Listening ({lang === 'hi' ? 'हिंदी' : 'English'})...</span>
          </>
        ) : capturedRecently ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Voice Captured!</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-gov-600 shrink-0" />
            <span>Voice Input ({lang === 'hi' ? 'हिंदी' : 'EN'})</span>
          </>
        )}
      </button>

      {/* Floating Alert on Permission Denied or Speech Error */}
      {errorMessage && (
        <div className="absolute top-full left-0 mt-1.5 z-50 p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-[11px] rounded-xl shadow-lg flex items-start gap-2 max-w-xs animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
