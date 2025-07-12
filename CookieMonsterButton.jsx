import React from 'react';
import Spline from '@splinetool/react-spline';

const CookieMonsterButton = ({ onClick }) => {
  return (
    <button 
      id="chatbot-toggle"
      onClick={onClick}
      style={{
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'transparent',
        boxShadow: '0 6px 25px rgba(0,0,0,0.25)',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <Spline
          scene="https://prod.spline.design/qtV29sRbD3xgnWw2/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%'
          }}
        />
      </div>
    </button>
  );
};

export default CookieMonsterButton; 