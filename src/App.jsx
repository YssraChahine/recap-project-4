import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import "./App.css";

function App() {
  const [themes, setThemes] = useState(() => {
    const storedThemes = localStorage.getItem("themes");
    return storedThemes ? JSON.parse(storedThemes) : initialThemes;
  });

  const [activeThemeId, setActiveThemeId] = useState(() => {
    const storedActiveThemeId = localStorage.getItem("activeThemeId");
    return storedActiveThemeId ? storedActiveThemeId : initialThemes[0].id;
  });

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem("activeThemeId", activeThemeId);
  }, [activeThemeId]);

  const activeTheme = useMemo(() => {
    return themes.find((theme) => theme.id === activeThemeId) ?? themes[0];
  }, [themes, activeThemeId]);

  const isDefaultTheme = activeTheme?.id === "t1";

  function handleCreateTheme() {
    const name = window.prompt("Enter a name for your new theme:");

    if (!name || !name.trim()) return;

    const newTheme = {id: nanoid(),name: name.trim(),colors: []};

    setThemes((prevThemes) => [...prevThemes, newTheme]);
    setActiveThemeId(newTheme.id);
  }

  function handleRenameTheme() {
    if (isDefaultTheme) return;

    const name = window.prompt("Enter a new name for this theme:", activeTheme.name);

    if (!name || !name.trim()) return;

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId ? { ...theme, name: name.trim()}: theme));
  }

  function handleDeleteTheme() {
    if (isDefaultTheme) return;

    const shouldDelete = window.confirm(`Delete theme "${activeTheme.name}"?`);

    if (!shouldDelete) return;

    const updatedThemes = themes.filter((theme) => theme.id !== activeThemeId);

    setThemes(updatedThemes);
    setActiveThemeId("t1");
  }

  function handleAddColor(newColor) {
    
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId ? {...theme, colors: [{ id: nanoid(), ...newColor }, ...theme.colors]}: theme));
    }

  function handleDeleteColor(id) {
  
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId ? {...theme, colors: theme.colors.filter((color) => color.id !== id)}: theme));
    }

  function handleUpdateColor(updatedColor) {

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === activeThemeId ? {...theme, colors: theme.colors.map((color) => color.id === updatedColor.id ? updatedColor : color),}: theme));
    }

  return (
    <div className="app-container">
      <h1>Theme Creator</h1>

      <section className="theme-controls">
        <div className="theme-controls__group">
          <label htmlFor="theme-select">Select Theme</label>
          <select id="theme-select" value={activeThemeId} onChange={(event) => setActiveThemeId(event.target.value)}>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>))}
          </select>
        </div>

        <div className="theme-controls__buttons">
          <button type="button" onClick={handleCreateTheme}>Create Theme</button>
          <button type="button" onClick={handleRenameTheme} disabled={isDefaultTheme}>Rename Theme</button>
          <button type="button" onClick={handleDeleteTheme} disabled={isDefaultTheme}>Delete Theme</button>
        </div>
      </section>

      <ColorForm onSubmit={handleAddColor}/>

      <section className="color-grid">
        {activeTheme.colors.length === 0 ? (<p>No colors yet. Add a new one!</p>) : (activeTheme.colors.map((color) => (
            <Color key={color.id} color={color} onDelete={handleDeleteColor} onUpdateColor={handleUpdateColor} />)))}
      </section>
    </div>
  );
}

export default App;