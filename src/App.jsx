import { useState } from "react";
import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleAddColor(newColor) {
    setColors((prevColors) => [
      { id: nanoid(), ...newColor },
      ...prevColors,
    ]);
  }

  function handleDeleteColor(id) {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== id)
    );
  }

  function handleUpdateColor(updatedColor) {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>

      <ColorForm onSubmit={handleAddColor} />

      <section className="color-grid">
        {colors.length === 0 ? (
          <p>No colors left. Add a new one!</p>
        ) : (
          colors.map((color) => (
            <Color
              key={color.id}
              color={color}
              onDelete={handleDeleteColor}
              onUpdateColor={handleUpdateColor}
            />
          ))
        )}
      </section>
    </>
  );
}

export default App;