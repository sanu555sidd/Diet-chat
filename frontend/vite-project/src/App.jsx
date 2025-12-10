import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useState } from "react";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";

function App() {
  const { isSignedIn } = useUser();
  const [currentScreen, setCurrentScreen] = useState("chat");

  // After login, we directly show chat screen (per requirement)
  return (
    <>
      <SignedOut>
        <Login />
      </SignedOut>

      <SignedIn>
        <Chat />
      </SignedIn>
    </>
  );
}

export default App;
