import React, { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [hover, setHover] = useState(false); // 버튼 호버 상태 추가

  const validateUrl = (value) => {
    const notionPattern = /https?:\/\/(www\.)?notion\.so\/.+/;
    return notionPattern.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(validateUrl(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      window.parent.postMessage(
        { pluginMessage: { type: 'Submit', url } },
        '*',
      );
    } else {
      alert("유효하지 않은 노션 링크입니다.");
    }
  };

  return (
    <div style={{ margin: "40px auto", maxWidth: "400px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>노션 링크 입력</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="노션 URL을 입력하세요"
          style={{
            padding: "12px",
            fontSize: "16px",
            border: isValid ? "1px solid #ccc" : "1px solid red",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        {!isValid && (
          <span style={{ color: "red", fontSize: "14px", textAlign: "left" }}>
            유효한 노션 링크를 입력하세요.
          </span>
        )}
        <button
          type="submit"
          style={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: hover ? "#0056b3" : "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={() => setHover(true)} // 호버 상태 활성화
          onMouseLeave={() => setHover(false)} // 호버 상태 비활성화
        >
          적용
        </button>
      </form>
    </div>
  );
}

export default App