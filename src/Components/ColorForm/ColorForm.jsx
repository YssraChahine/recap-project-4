import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  role = "",
  hex = "#000000",
  contrastText = "#FFFFFF",
  onSubmit,
  className = "color-form",
}) {
  const [roleValue, setRoleValue] = useState(role);
  const [hexValue, setHexValue] = useState(hex);
  const [contrastTextValue, setContrastTextValue] = useState(contrastText);

  function handleSubmit(event) {
    event.preventDefault();

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
      />

      <ColorInput
        label="Hex"
        value={hexValue}
        onChange={setHexValue}
      />

      <ColorInput
        label="Contrast Text"
        value={contrastTextValue}
        onChange={setContrastTextValue}
      />

      <button type="submit">
        {role ? "Save Changes" : "Add Color"}
      </button>
    </form>
  );
}