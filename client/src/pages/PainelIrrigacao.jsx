import { useEffect, useState } from "react";
import SensorInfoCard from "../components/SensorInfoCard";
import "./PainelIrrigacao.css";
import axios from "axios";

export default function PainelIrrigacao() {
  const [dados, setDados] = useState({});
  const [erro, setErro] = useState("");

  const [isIrrigando, setIsIrrigando] = useState(false);
  const [umidade, setUmidade] = useState(0);
  const [ultimaLeitura, setUltimaLeitura] = useState(null);

  const [sensores, setSensores] = useState([]);
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const buscarDados = async () => {
      try {
        const [resSensores, resAlertas] = await Promise.all([
          axios.get("http://192.168.180.191:3000/sensores"),
          axios.get("http://192.168.180.191:3000/alertas"),
        ]);

        if (!isMounted) return;

        const sensoresData = resSensores.data;
        setDados(sensoresData);

        const idsRecebidos = Object.keys(sensoresData);
        const sensoresAtualizados = idsRecebidos.map((id, index) => ({
          id,
          nome: `Sensor ${String(index + 1).padStart(2, "0")}`,
          localizacao: `Estufa ${String.fromCharCode(65 + index)}`,
          unidadeSolo: "Argiloso",
        }));
        setSensores(sensoresAtualizados);

        const sensorId = sensoresAtualizados[0]?.id;
        if (sensorId && sensoresData[sensorId]) {
          const sensorInfo = sensoresData[sensorId];
          setIsIrrigando(sensorInfo.bombaLigada === 1);
          setUmidade(sensorInfo.umidade);
          setUltimaLeitura(sensorInfo.ultimaLeitura);
        }

        setAlertas(resAlertas.data.alertas || []);
      } catch (err) {
        if (isMounted) {
          setErro("Erro ao buscar dados dos sensores");
        }
        console.error("Erro ao buscar sensores:", err);
      }
    };

    buscarDados();
    const intervalo = setInterval(buscarDados, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalo);
    };
  }, []);

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
              <a href="#home" role="menuitem">
                Home
              </a>
            </li>
            <li role="none">
              <a href="#sensores" role="menuitem">
                Sensores
              </a>
            </li>
            <li role="none">
              <a href="#controle" role="menuitem">
                Controle
              </a>
            </li>
            <li role="none">
              <a href="#sobre" role="menuitem">
                Sobre
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="card-area" id="sensores">
          {sensores.map((sensor) => {
            const sensorData = dados[sensor.id] || {};
            return (
              <SensorInfoCard
                key={sensor.id}
                sensor={{
                  ...sensor,
                  umidade: sensorData.umidade ?? "N/A",
                  bombaLigada: sensorData.bombaLigada === 1,
                  ultimaLeitura: sensorData.ultimaLeitura,
                  ativo: sensorData.ativo ?? false,
                  id: sensorData.id,
                }}
              />
            );
          })}
        </div>

        <div className="card" id="controle">
          <h2>Controle de Irrigação</h2>

          <div className="info-row">
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
              <strong>Última Leitura:</strong>{" "}
              {ultimaLeitura ? new Date(ultimaLeitura).toLocaleString() : "N/A"}
            </span>
          </div>

          <div className="info-row">
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
            <div className="alert" role="alert">
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

          {alertas.length > 0 && (
            <div
              className="alertas-container"
              role="alert"
              aria-live="polite"
              style={{ marginBottom: "1rem" }}
            >
              <h3>Alertas</h3>
              <ul>
                {alertas.map((alerta, index) => (
                  <li
                    key={index}
                    style={{ color: "red", marginBottom: "0.3rem" }}
                  >
                    {alerta}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="footer">
        <p>© 2025 Farm Irrigação. Todos os direitos reservados.</p>
      </div>
    </>
  );
}
