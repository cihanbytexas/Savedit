// pages/index.js
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({});
  
  // Dosya yükleme ve parse
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split(/\s+/).filter(l => l.trim() !== "");

    let obj = {};
    for (let i = 0; i < lines.length; i += 2) {
      obj[lines[i]] = lines[i + 1] || "";
    }
    setData(obj);
  };

  // Değer değiştirildiğinde state güncelle
  const handleChange = (key, val) => {
    setData(prev => ({ ...prev, [key]: val }));
  };

  // Dosya indirme
  const download = () => {
    const blob = new Blob(
      Object.entries(data).map(([k, v]) => `${k} ${v}\n`),
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "active.sav";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>Sav Editor Online</h1>
      
      <input type="file" accept=".sav" onChange={handleFile} />
      
      {Object.keys(data).length > 0 && (
        <>
          <table 
            style={{ 
              width: "100%", 
              marginTop: "1rem", 
              borderCollapse: "collapse" 
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Key</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([key, val]) => (
                <tr key={key}>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{key}</td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                    <input 
                      value={val} 
                      onChange={e => handleChange(key, e.target.value)} 
                      style={{ width: "100%" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button 
            onClick={download} 
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Save .sav
          </button>
        </>
      )}
    </div>
  );
}
