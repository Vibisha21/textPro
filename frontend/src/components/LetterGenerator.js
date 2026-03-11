import React from 'react';

const LetterGenerator = ({
    topic,
    setTopic,
    onGenerate,
    loading,
    result
}) => {
    return (
        <div className="transformer-card">
            <h1>Formal Letter Generator</h1>

            <div className="input-group" style={{ animation: 'fadeIn 0.6s ease-out' }}>
                <label>What is the letter about?</label>
                <textarea
                    placeholder="Ex: Permission letter to HoD requesting On duty for a symposium..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            <button
                className="transform-btn"
                onClick={onGenerate}
                disabled={loading || !topic}
            >
                {loading ? 'Generating Letter...' : 'Generate Formal Letter'}
            </button>

            {result && (
                <div className="result-area">
                    <div className="result-header">
                        <span>Generated Letter</span>
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>
                            Copy Letter
                        </button>
                    </div>
                    <div className="result-text">{result}</div>
                </div>
            )}
        </div>
    );
};

export default LetterGenerator;
