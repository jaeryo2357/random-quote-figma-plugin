import React, { useState } from 'react';
import styled from 'styled-components';
import useRandomQuotes from './hooks/useRandomQuotes';
import { requestGenerateRandomQuoteToPlugin } from './lib/figma';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 100px;
  font-size: 25px;
  padding: 10px 30px;
  transition: 0.15s;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #191919;
  }
`;

const Text = styled.p`
  font-size: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: #555;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    //parent.postMessage({ pluginMessage: { type: 'generate-widgets', url } }, '*');
  };

  return (
    <Container>
      <Text>FigNotion</Text>
      <Input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder='노션 URL을 입력해주세요'
      />
      <Button onClick={handleSubmit}>
        {isLoading ? 'Loading...' : '불러오기'}
      </Button>
    </Container>
  );
}

export default App;
