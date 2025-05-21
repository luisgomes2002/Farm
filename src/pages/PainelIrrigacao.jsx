import { useState } from "react";
import SensorInfoCard from "../components/SensorInfoCard";
import "./PainelIrrigacao.css";

export default function PainelIrrigacao() {
  const [isIrrigando, setIsIrrigando] = useState(false);
  const [umidade, setUmidade] = useState(50);
  const [erro, setErro] = useState("");
  const [temperatura, setTemperatura] = useState(26);

  const [sensores, setSensores] = useState([
    {
      nome: "Sensor 01",
      localizacao: "Estufa A",
      unidadeSolo: "Argiloso",
    },
  ]);

  const toggleIrrigacao = () => {
    if (erro) return;
    setIsIrrigando(!isIrrigando);
  };

  const adicionarSensor = () => {
    const novoIndice = sensores.length + 1;
    const novoSensor = {
      nome: `Sensor ${novoIndice.toString().padStart(2, "0")}`,
      localizacao: `Estufa ${String.fromCharCode(64 + novoIndice)}`,
      unidadeSolo: "Argiloso",
    };
    setSensores([...sensores, novoSensor]);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">Farm</h1>
          <ul
            className="navbar-menu"
            role="menubar"
            aria-label="Menu principal"
          >
            <li role="none">
              <a href="#home" role="menuitem" tabIndex={0}>
                Home
              </a>
            </li>
            <li role="none">
              <a href="#sensores" role="menuitem" tabIndex={0}>
                Sensores
              </a>
            </li>
            <li role="none">
              <a href="#controle" role="menuitem" tabIndex={0}>
                Controle
              </a>
            </li>
            <li role="none">
              <a href="#sobre" role="menuitem" tabIndex={0}>
                Sobre
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="card-area">
          {sensores.map((sensor, index) => (
            <SensorInfoCard key={index} sensor={sensor} />
          ))}

          <button
            className="add-button"
            onClick={adicionarSensor}
            style={{ margin: "1rem 0" }}
          >
            Adicionar Sensor
          </button>
        </div>

        <div className="card">
          <h2>Controle de Irrigação</h2>

          <div
            className="control-row"
            style={{ justifyContent: "space-between" }}
          >
            <span>Estado da Irrigação:</span>
            <label className="switch" aria-label="Interruptor de irrigação">
              <input
                type="checkbox"
                checked={isIrrigando}
                onChange={toggleIrrigacao}
                disabled={!!erro}
              />
              <span className="slider-switch"></span>
            </label>
          </div>

          <div
            className="control-row"
            style={{ justifyContent: "space-between" }}
          >
            <span>Umidade do Solo: {umidade}%</span>
            <div
              className="slider-container"
              style={{ flexGrow: 1, marginLeft: "1rem" }}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={umidade}
                onChange={(e) => setUmidade(Number(e.target.value))}
                className="slider"
                aria-label="Controle de umidade do solo"
              />
            </div>
          </div>

          <div
            className="info-row"
            style={{ gap: "0.5rem", marginTop: "0.5rem" }}
          >
            <svg className="temp-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              <strong>Temperatura:</strong> {temperatura}°C
            </span>
          </div>

          <div className="info-row" style={{ gap: "0.5rem" }}>
            <svg
              className={`power-icon ${isIrrigando ? "power-on" : "power-off"}`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="12"
                y1="6"
                x2="12"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>
              {isIrrigando ? "Irrigando agora" : "Irrigação desligada"}
            </span>
          </div>

          {erro && (
            <div className="alert" role="alert" aria-live="assertive">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="9"
                  x2="12"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
              </svg>
              <div>
                <div className="alert-title">Erro</div>
                <div>{erro}</div>
              </div>
            </div>
          )}

          <div className="buttons">
            <button
              className="outline"
              onClick={() => setErro("Válvula com defeito")}
            >
              Simular Erro
            </button>
            <button className="ghost" onClick={() => setErro("")}>
              Limpar Erro
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>© 2025 Farm Irrigação. Todos os direitos reservados.</p>
      </div>
    </>
  );
}
