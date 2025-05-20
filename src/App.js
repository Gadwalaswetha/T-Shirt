import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [height, setHeight] = useState("180cm");
  const [weight, setWeight] = useState("80kg");
  const [build, setBuild] = useState("athletic");
  const [product, setProduct] = useState("tshirt");
  const [imageUrl, setImageUrl] = useState("");
  const [textLines, setTextLines] = useState(["", "", ""]);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = [
    { bg: "#f8f8f8", text: "#111", accent: "#e63946" },
    { bg: "#1a1a1a", text: "#fff", accent: "#00c9a7" },
    { bg: "#fff", text: "#222", accent: "#3a86ff" },
  ];

  const theme = themes[themeIndex];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.altKey && e.key.toLowerCase() === "q") {
        setThemeIndex((prev) => (prev + 1) % themes.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    const lines = e.target.value.split("\n").slice(0, 3);
    setTextLines(lines);
  };

  const containerStyle = {
    backgroundColor: theme.bg,
    color: theme.text,
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "sans-serif",
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "5px",
    border: `1px solid ${theme.accent}`,
    marginBottom: "1rem",
  };

  const dropAreaStyle = {
    border: `2px dashed ${theme.accent}`,
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "1rem",
  };

  return (
    <div style={containerStyle}>
      <h1>🧵 Custom POD Store</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <label>Height</label>
          <br />
          <input
            style={inputStyle}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Weight</label>
          <br />
          <input
            style={inputStyle}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Build</label>
          <br />
          <select
            style={inputStyle}
            value={build}
            onChange={(e) => setBuild(e.target.value)}
          >
            <option value="lean">Lean</option>
            <option value="reg">Regular</option>
            <option value="athletic">Athletic</option>
            <option value="big">Big</option>
          </select>
        </div>
      </div>

      <div style={{ margin: "1.5rem 0" }}>
        <h3>Select Product</h3>
        {["tshirt", "hoodie", "sleevie", "cap"].map((type) => (
          <button
            key={type}
            onClick={() => setProduct(type)}
            style={{
              marginRight: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: theme.accent,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div>
        <label>Upload Design</label>
        <br />
        <input type="file" onChange={handleImageUpload} style={inputStyle} />
        <div
          style={dropAreaStyle}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          Drag and drop image here
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Text (max 3 lines)</label>
        <br />
        <textarea
          style={{ ...inputStyle, width: "100%", height: "80px" }}
          onChange={handleTextChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h4>Design Preview</h4>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{ width: "200px", border: `2px dashed ${theme.accent}` }}
            />
          ) : (
            <p>No image uploaded</p>
          )}
        </div>

        <div>
          <h4>{product} Mockup</h4>
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              border: `1px solid ${theme.accent}`,
              padding: "1rem",
            }}
          >
            {imageUrl && (
              <img src={imageUrl} alt="On Shirt" style={{ width: "80px" }} />
            )}
            {textLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
