import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, CheckCircle2, Globe, Trash2, StopCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const VoiceInput = ({ onTranscript, className = '' }) => {
  const { lang: globalLang, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState('auto'); // 'en-IN', 'hi-IN', 'auto'
  const [isListening, setIsListening] = useState(false);
  const [capturedRecently, setCapturedRecently] = useState(false);
  const [transcriptPreview, setTranscriptPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  const effectiveLangCode = selectedLang === 'auto'
    ? (globalLang === 'hi' ? 'hi-IN' : 'en-IN')
    : selectedLang;

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = effectiveLangCode;

    recognition.onresult = (event) => {
      let currentText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript;
      }

      if (currentText) {
        setTranscriptPreview(currentText);
        if (onTranscriptRef.current) {
          onTranscriptRef.current(currentText);
          setCapturedRecently(true);
        }
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setErrorMessage(t('micAccessDenied', 'Microphone access was denied. Please allow microphone permissions in your browser bar.'));
      } else if (event.error === 'no-speech') {
        setErrorMessage(t('noSpeechDetected', 'No speech detected. Please speak closer to the microphone.'));
      } else if (event.error === 'network') {
        setErrorMessage(t('speechNetworkError', 'Speech recognition network error. Please retry.'));
      } else {
        setErrorMessage(`Speech recognition notice: ${event.error}`);
      }
      setTimeout(() => setErrorMessage(''), 6000);
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
  }, [effectiveLangCode, t]);

  const toggleListen = () => {
    if (!isSupported) {
      alert(t('voiceNotSupported', 'Voice speech-to-text is not supported in this browser. Please use Chrome or Edge, or type your specification directly.'));
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
        recognitionRef.current.lang = effectiveLangCode;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Recognition start failed:', err.message);
        setIsListening(false);
      }
    }
  };

  const handleClearTranscript = (e) => {
    e.stopPropagation();
    setTranscriptPreview('');
    setCapturedRecently(false);
  };

  if (!isSupported) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-400 bg-slate-50 text-xs">
        <MicOff className="w-3.5 h-3.5" />
        <span>{t('voiceNotSupported', 'Voice (Not supported in this browser)')}</span>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex flex-col items-start gap-1 ${className}`}>
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
        {/* Language selector */}
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600">
          <Globe className="w-3 h-3 text-slate-400" />
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-transparent text-[11px] font-bold text-slate-700 outline-none cursor-pointer"
            aria-label="Voice language"
          >
            <option value="auto">Auto ({globalLang === 'hi' ? 'हिंदी' : 'EN'})</option>
            <option value="en-IN">English (India)</option>
            <option value="hi-IN">हिन्दी (Hindi)</option>
          </select>
        </div>

        {/* Start / Stop Button */}
        <button
          type="button"
          onClick={toggleListen}
          aria-label={isListening ? t('stopRecording', 'Stop Recording') : t('voiceInput', 'Voice Input')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse shadow-sm'
              : capturedRecently
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-gov-700 text-white hover:bg-gov-800'
          }`}
        >
          {isListening ? (
            <>
              <StopCircle className="w-3.5 h-3.5 animate-spin" />
              <span>{t('stopRecording', 'Stop Recording')}</span>
            </>
          ) : capturedRecently ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('capturedVoice', 'Captured')}</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5" />
              <span>{t('voiceInput', 'Voice Input')}</span>
            </>
          )}
        </button>

        {transcriptPreview && (
          <button
            type="button"
            onClick={handleClearTranscript}
            title={t('clearVoicePreview', 'Clear preview')}
            aria-label={t('clearVoicePreview', 'Clear preview')}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Transcript Live Preview */}
      {isListening && (
        <div className="text-[11px] bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl flex items-center gap-2 max-w-md animate-fade-in shadow-xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
          <span className="font-semibold truncate">
            {transcriptPreview
              ? `"${transcriptPreview}"`
              : `${t('listeningIn', 'Listening in')} ${effectiveLangCode === 'hi-IN' ? 'Hindi (हिंदी)' : 'English'}... ${t('speakClearly', 'Speak clearly')}`}
          </span>
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="text-[11px] bg-rose-50 border border-rose-200 text-rose-800 px-3 py-1.5 rounded-xl flex items-center gap-2 max-w-md animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
