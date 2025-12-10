import { SignInButton } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="app-title">Diet Chat Assistant</h1>
        <p className="app-subtitle">
          Sign in with Google to start asking diet-related questions.
        </p>
        <SignInButton mode="modal">
          <button className="google-btn">
            Continue with Google
          </button>
        </SignInButton>
      </div>
    </div>
  );
};

export default Login;
