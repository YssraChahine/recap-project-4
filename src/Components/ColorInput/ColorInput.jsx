import "./ColorInput.css";

export default function ColorInput({label,value,onChange,disabled = false,}) {
  return (
    <div className="color-input-row">

      <label>{label}</label>

      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled}/>
      
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled}/>
    
    </div>
  );
}