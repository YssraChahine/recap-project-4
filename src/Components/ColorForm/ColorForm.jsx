import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  role = "",
  hex = "#000000",
  contrastText = "#FFFFFF",
  onSubmit,
  className = "color-form",
  disabled = false,
}) {
  const [roleValue, setRoleValue] = useState(role);
  const [hexValue, setHexValue] = useState(hex);
  const [contrastTextValue, setContrastTextValue] = useState(contrastText);

  function handleSubmit(event) {
    event.preventDefault();

    if (disabled) return;

    onSubmit({
      role: roleValue,
      hex: hexValue,
      contrastText: contrastTextValue,
    });
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        type="text"
        value={roleValue}
        onChange={(event) => setRoleValue(event.target.value)}
        placeholder="color role"
        disabled={disabled}
      />

      <ColorInput
        label="Hex"
        value={hexValue}
        onChange={setHexValue}
        disabled={disabled}
      />

      <ColorInput
        label="Contrast Text"
        value={contrastTextValue}
        onChange={setContrastTextValue}
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        {role ? "Save Changes" : "Add Color"}
      </button>
    </form>
  );
}
