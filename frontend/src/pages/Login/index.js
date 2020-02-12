import React from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post("/sessions", {
      email
    });
    const { _id } = response.data;

    localStorage.setItem("user", _id);

    history.push("/dashboard");
  }

  return (
    <>
      <p>
        Ofereça <strong>Spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu melhor email"
          autoFocus
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </>
  );
}
