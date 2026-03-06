import { useState } from "react";
import "./Color.css";


export default function Color({color, onDelete}) {

  const [isConfirming, setIsConfirming] = useState(false);

  return <article className="color-card" style={{backgroundColor:color.hex, color:color.contrastText}}>
    <span className="color-card__role">{color.role}</span>
    <span className="color-card__hex">{color.hex}</span>
    <span className="color-card__contrast">{color.contrastText}</span>
    {isConfirming ? (
      <div className="color-card-highlight"> 
      <p>Are you sure?</p>
      <button onClick={() => onDelete(color.id)}>Yes</button>
      <button onClick={() => setIsConfirming(false)}>Cancel</button>
    </div>):(<button onClick={() => setIsConfirming(true)}>Delete</button>
  )}
  </article>
}
