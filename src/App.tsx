import { Navigate, Route, Routes } from "react-router-dom";
import { SplashScreen } from "./screens/SplashScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { WorldScreen } from "./screens/WorldScreen";
import { ParentsGateScreen } from "./screens/ParentsGateScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/world/:worldId" element={<WorldScreen />} />
      <Route path="/parents" element={<ParentsGateScreen />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
