import { Scene } from "./components/canvas/Scene";
import "./App.css";
import { Controls } from "./components/ui/Controls";

function App() {
  return (
    <div className="container">
        <h1>Vinci Takehome - Angry Shiba</h1>
        <h2>Pull on the dog cheeks to make it angry!</h2>
        <Controls />
      <div className="scene-container">
        <Scene />
      </div>
    </div>
  );
}

export default App;
