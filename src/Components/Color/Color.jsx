import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDelete, onUpdateColor, readOnly = false,}) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contrastData, setContrastData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchContrast() {
      try {
        setLoading(true);

        const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({colors: [color.hex, color.contrastText]})});

        const data = await response.json();
        setContrastData(data);
      } catch (error) {console.error("Contrast API error:", error); setContrastData(null)} finally {setLoading(false)}
    } fetchContrast();
  }, [color.hex, color.contrastText]);

  if (isEditing) {
    return (
      <article className="color-card" style={{backgroundColor: color.hex, color: color.contrastText,}}>
        <ColorForm className="color-form color-form--inline" 
          role={color.role} 
          hex={color.hex} 
          contrastText={color.contrastText}
            onSubmit={(updatedValues) => {
              onUpdateColor({id: color.id, ...updatedValues}); setIsEditing(false)}}/>
      </article>);
  }

  return (
    <article className="color-card" style={{backgroundColor: color.hex, color: color.contrastText}}>
      
      <span className="color-card__role">{color.role}</span>
      <span className="color-card__hex">{color.hex}</span>
      <CopyToClipboard text={color.hex}/>
      <span className="color-card__contrast">{color.contrastText}</span>

      {loading && <p>Checking contrast...</p>}

      {contrastData && !loading && (
        <div className={`contrast-${contrastData.overall.toLowerCase()}`}>
          <strong>{contrastData.overall}</strong>
        </div>
      )}

      {!readOnly && (isConfirming ? (
          <div className="color-card-highlight">
            <p>Are you sure?</p>
            <button onClick={()=> onDelete(color.id)}>Yes</button>
            <button onClick={()=> setIsConfirming(false)}>Cancel</button>
          </div> ):(<>
            <button onClick={()=> setIsConfirming(true)}>Delete</button>
            <button onClick={()=> setIsEditing(true)}>Edit</button>
          </>
        ))}
    </article>
  );
}