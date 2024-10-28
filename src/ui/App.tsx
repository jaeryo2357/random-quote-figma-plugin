import React from 'react';

function App() {
  const createWidget = () => {
    parent.postMessage({ pluginMessage: { type: 'create-widget' } }, '*');
  };

  return (
    <div>
      <h1>Figma Plugin UI</h1>
      <button onClick={createWidget}>Create Widget</button>
    </div>
  );
}

export default App;
