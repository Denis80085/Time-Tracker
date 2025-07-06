import SideBarMenu from "./components/SideBarMenu.tsx";
import Home from "./pages/Home.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <SideBarMenu />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
