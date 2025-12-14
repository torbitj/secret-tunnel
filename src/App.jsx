import { useAuth } from "./AuthContext";
import Error from "./Error"
import Entrance from "./Entrance";
import ReturnEntrance from "./ReturnEntrance";
import Tablet from "./Tablet";
import Tunnel from "./Tunnel";

export default function App() {
  const { location } = useAuth();
  if (location === "RETURN") return <ReturnEntrance />
  if (location === "GATE") return <Entrance />;
  if (location === "TABLET") return <Tablet />;
  if (location === "ERROR") return <Error />;
  return <Tunnel />;
}
