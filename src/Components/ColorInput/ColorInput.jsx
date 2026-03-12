import "./ColorInput.css";

export default function ColorInput({label,value,onChange}) {
  return (
    <div className="color-input-row">

      <label>{label}</label>

      <input type="color" value={value} onChange={(event) => onChange(event.target.value)}/>
      
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)}/>
    
    </div>
  );
}