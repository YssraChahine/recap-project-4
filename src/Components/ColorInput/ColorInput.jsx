import "./ColorInput.css";

export default function ColorInput({label,value,onChange}) {
  return (
    <div className="color-input-row">

    {/* dynamisches label (Inhalt kommt vom Parent (z.B. Hex oder Contrast text)) */}
      <label>{label}</label>

      {/* farbauswahl */}
      <input type="color" value={value} 
      // auswahl einer neuen Farbe, wird an Parent weitergegeben(ColorForm)
      onChange={(event) => onChange(event.target.value)}/>
      
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)}/>
    
    </div>
  );
}