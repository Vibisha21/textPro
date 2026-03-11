import React from 'react';

const ToneTransformer = ({
    inputText,
    setInputText,
    toneType,
    setToneType,
    formatType,
    setFormatType,
    onTransform,
    loading,
    result
}) => {
    return (
        <div className="transformer-card">
            <h1>NLP Tone Transformer</h1>

            <div className="input-group">
                <label>Enter your text</label>
                <textarea
                    placeholder="Type something informal or aggressive..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>

            <div className="options-grid">
                <div className="option-select">
                    <label>Tone</label>
                    <div className="button-group">
                        <button
                            className={`mode-btn ${toneType === 'Academic' ? 'active' : ''}`}
                            onClick={() => setToneType('Academic')}
                        >
                            For Academics
                        </button>
                        <button
                            className={`mode-btn ${toneType === 'Office' ? 'active' : ''}`}
                            onClick={() => setToneType('Office')}
                        >
                            For Office
                        </button>
                    </div>
                </div>

                <div className="option-select">
                    <label>Format</label>
                    <div className="button-group">
                        <button
                            className={`mode-btn ${formatType === 'Message' ? 'active' : ''}`}
                            onClick={() => setFormatType('Message')}
                        >
                            Message
                        </button>
                        <button
                            className={`mode-btn ${formatType === 'Email' ? 'active' : ''}`}
                            onClick={() => setFormatType('Email')}
                        >
                            Email
                        </button>
                    </div>
                </div>
            </div>

            <button
                className="transform-btn"
                onClick={onTransform}
                disabled={loading || !inputText}
            >
                {loading ? 'Processing...' : 'Transform Tone'}
            </button>

            {result && (
                <div className="result-area">
                    <div className="result-header">
                        <span>Transformed Result</span>
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(result)}>
                            Copy Text
                        </button>
                    </div>
                    <div className="result-text">{result}</div>
                </div>
            )}
        </div>
    );
};

export default ToneTransformer;
