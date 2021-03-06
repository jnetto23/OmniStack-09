import React from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

import camera from "../../assets/camera.svg";

export default function New() {
  const history = useHistory();

  const [company, setCompany] = React.useState("");
  const [techs, setTechs] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState(null);

  const preview = React.useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: {
        user_id
      }
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        type="text"
        id="company"
        placeholder="Sua empresa incrivel"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        type="text"
        id="techs"
        placeholder="Quais tecnologia usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor="price">
        VALOR DA DIÁRIA <span>(em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        id="price"
        placeholder="Valor da diária"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
