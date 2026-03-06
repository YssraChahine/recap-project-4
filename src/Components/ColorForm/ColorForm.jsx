import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAddColor }) {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("");
  const [contrastText, setContrastText] = useState("#FFF");

  function handleSubmit(event) {
    event.preventDefault();

    onAddColor({
      role,
      hex,
      contrastText,
    });
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="color role"
      />

      <ColorInput label="Hex" value={hex} onChange={setHex} />
      <ColorInput
        label="Contrast Text"
        value={contrastText}
        onChange={setContrastText}
      />

      <button type="submit">Add Color</button>
    </form>
  );
}
