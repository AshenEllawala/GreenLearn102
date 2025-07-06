import React from 'react';

const GamePage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Enjoy Our Game!</h2>
      <iframe
        src="https://gd.games/games/564914a3-b523-475b-9231-5dcd791e7209"
        width="800"
        height="600"
        allowFullScreen
        frameBorder="0"
        title="Educational Game"
        style={{ border: '2px solid black', borderRadius: '10px' }}
      ></iframe>
    </div>
  );
};

export default GamePage;
