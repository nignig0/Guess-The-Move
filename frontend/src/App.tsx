import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/gamePage";
import { FindGamePage } from "./pages/findGamePage";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<FindGamePage/>}/>
      <Route path="game/:color/:gameId" element={<GamePage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
