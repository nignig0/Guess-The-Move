import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/gamePage";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="game/:color/:gameId" element={<GamePage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
