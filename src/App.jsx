import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <section className="color-grid">
        {initialColors.map((color)=>(
        <Color key={color.id} color={color} />
        ))}
      </section>
    </>
  );
}

export default App;
