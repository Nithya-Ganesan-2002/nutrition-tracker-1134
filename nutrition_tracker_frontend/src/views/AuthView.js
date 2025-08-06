import React, { useState } from "react";
import { apiRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function AuthView() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const auth = useAuth();

  function switchMode() {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError(null);
  }
  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    setError(null);
    try {
      const resp = await apiRequest(endpoint, "POST", form);
      auth.login(resp.token, resp.user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Sign In" : "Register"}</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} autoFocus />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {error && <div className="error">{error}</div>}
        <button className="btn btn-primary" type="submit">
          {mode === "login" ? "Sign In" : "Register"}
        </button>
        <button className="btn btn-secondary" type="button" onClick={switchMode}>
          {mode === "login" ? "Need an account? Register" : "Already have an account? Sign In"}
        </button>
      </form>
    </div>
  );
}
