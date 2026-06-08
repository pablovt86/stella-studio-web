import React, { useState } from 'react';
import './RobotAvatar.css';

const RobotAvatar: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Robot flotante */}
      <div className="robot-avatar" onClick={openChat}>
        <div className="robot-container">
          <div className="robot-body">
            <div className="robot-head">
              <div className="robot-antenna"><div className="antenna-ball"></div></div>
              <div className="robot-ear ear-left"></div>
              <div className="robot-ear ear-right"></div>
              <div className="robot-eye eye-left"></div>
              <div className="robot-eye eye-right"></div>
              <div className="robot-mouth"></div>
            </div>
            <div className="robot-chest">
              <div className="robot-heart">❤️</div>
            </div>
          </div>
        </div>
        <div className="robot-tooltip">
          <span>✨ ¡Hola! Soy Stella.Oprime y reserva Tu Turno✨ </span>
        </div>
      </div>

      {/* Modal del chat (iframe) */}
      {isChatOpen && (
        <div className="chat-modal-overlay" onClick={closeChat}>
          <div className="chat-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="chat-modal-header">
              <h3>Stella Estudio</h3>
              <button className="chat-modal-close" onClick={closeChat}>✕</button>
            </div>
            <iframe
              src="https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/05/20/22/20260520225119-KS1UJKGQ.json"
              className="chat-iframe"
              title="Stella Estudio Chat"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RobotAvatar;