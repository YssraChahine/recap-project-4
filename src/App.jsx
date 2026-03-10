import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [colors, setColors] = useState(() => {
    const storedColors = localStorage.getItem("themeColors");
    return storedColors ? JSON.parse(storedColors) : initialColors;
  });

  useEffect(() => {
    localStorage.setItem("themeColors", JSON.stringify(colors));
  }, [colors]);

  function handleAddColor(newColor) {
    setColors((prev) => [
      { id: nanoid(), ...newColor },
      ...prev,
    ]);
  }

  function handleDeleteColor(id) {
    setColors((prev) =>
      prev.filter((color) => color.id !== id)
    );
  }

  function handleUpdateColor(updatedColor) {
    setColors((prev) =>
      prev.map((color) =>
        color.id === updatedColor.id ? updatedColor : color
      )
    );
  }

  return (
    <div className="app-container">
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
    </div>
  );
}

export default App;