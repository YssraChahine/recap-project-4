import { useState } from "react";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors([{ id: nanoid(), ...newColor }, ...colors]);
  }

  function handleDeleteColor(id) {
    setColors(
      colors.filter((color) => color.id !== id)
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onAddColor={handleAddColor} />

      <section className="color-grid">
        {colors.length === 0 ? (
          <p>No colors. Add one!</p>
        ): (
          colors.map(color => (<Color key={color.id} color={color} onDelete={handleDeleteColor} />))
        )}
      </section>
    </>
  );
}

export default App;
