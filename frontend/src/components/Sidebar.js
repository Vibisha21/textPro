import React from 'react';

const Sidebar = ({ history, onLoadChat, onClearHistory, visible }) => {
  return (
    <div className={`sidebar ${visible ? '' : 'hidden'}`}>
      <h2>History</h2>
      <div className="history-list">
        {history.length === 0 ? (
          <div style={{ fontSize: '0.9rem', color: '#888', textAlign: 'center', marginTop: '40px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📄</div>
            No history yet.
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="history-item"
              onClick={() => onLoadChat(item)}
            >
              <div className="original-preview">{item.original_text}</div>
              <div className="metadata">
                {item.tone_type === 'Letter' ? '✉️ Letter' : '🔄 Transformer'}
                <span> • </span>
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <button className="clear-btn" onClick={onClearHistory}>
          🗑️ Clear All History
        </button>
      )}
    </div>
  );
};

export default Sidebar;
