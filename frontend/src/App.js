import React, { useState, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import ToneTransformer from './components/ToneTransformer';
import LetterGenerator from './components/LetterGenerator';
import LandingPage from './components/LandingPage';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeMode, setActiveMode] = useState('transformer'); // 'transformer' or 'generator'
  const [inputText, setInputText] = useState('');
  const [toneType, setToneType] = useState('Office');
  const [formatType, setFormatType] = useState('Email');
  const [letterTopic, setLetterTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch history on load
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const clearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/history`, { method: 'DELETE' });
      if (response.ok) {
        setHistory([]);
      }
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleTransform = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/transform`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          tone_type: toneType,
          format_type: formatType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.transformed_text);
        fetchHistory();
      }
    } catch (error) {
      console.error('Error transforming text:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLetter = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: letterTopic }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.transformed_text);
        fetchHistory();
      }
    } catch (error) {
      console.error('Error generating letter:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    if (item.tone_type === 'Letter') {
      setActiveMode('generator');
      setLetterTopic(item.original_text);
      setResult(item.transformed_text);
    } else {
      setActiveMode('transformer');
      setInputText(item.original_text);
      setResult(item.transformed_text);
      setToneType(item.tone_type);
      setFormatType(item.format_type);
    }
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        history={history}
        onLoadChat={loadFromHistory}
        onClearHistory={clearHistory}
        visible={sidebarVisible}
      />

      {/* Sidebar Toggle Icon */}
      <button
        className={`chat-toggle-btn ${sidebarVisible ? 'active' : ''}`}
        onClick={() => setSidebarVisible(!sidebarVisible)}
        title="History"
      >
        {sidebarVisible ? '❌' : '💬'}
      </button>

      <main className={`main-content ${sidebarVisible ? 'sidebar-open' : ''}`}>
        <div className="mode-toggle">
          <button
            className={`toggle-btn ${activeMode === 'transformer' ? 'active' : ''}`}
            onClick={() => { setActiveMode('transformer'); setResult(''); }}
          >
            Tone Transformer
          </button>
          <button
            className={`toggle-btn ${activeMode === 'generator' ? 'active' : ''}`}
            onClick={() => { setActiveMode('generator'); setResult(''); }}
          >
            Letter Generator
          </button>
        </div>

        {activeMode === 'transformer' ? (
          <ToneTransformer
            inputText={inputText}
            setInputText={setInputText}
            toneType={toneType}
            setToneType={setToneType}
            formatType={formatType}
            setFormatType={setFormatType}
            onTransform={handleTransform}
            loading={loading}
            result={result}
          />
        ) : (
          <LetterGenerator
            topic={letterTopic}
            setTopic={setLetterTopic}
            onGenerate={handleGenerateLetter}
            loading={loading}
            result={result}
          />
        )}
      </main>
    </div>
  );
}

export default App;
