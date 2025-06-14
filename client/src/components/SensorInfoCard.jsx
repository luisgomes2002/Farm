import "./SensorInfoCard.css";

export default function SensorInfoCard({ sensor }) {
  return (
    <div
      className="card"
      role="region"
      aria-label={`Informações do ${sensor.nome}`}
    >
      {/* Localização */}
      <div className="info-row">
        <svg
          className="location-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 21C12 21 19 13.5 19 8.5C19 5.46243 16.5376 3 13.5 3C10.4624 3 8 5.46243 8 8.5C8 13.5 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="8.5"
            r="2.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          <strong>Localização:</strong> {sensor.localizacao ?? "N/A"}
        </span>
      </div>

      {/* Unidade do Solo */}
      <div className="info-row">
        <svg
          className="soil-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2C12 2 7 7 7 12C7 17 12 22 12 22C12 22 17 17 17 12C17 7 12 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7V12L15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>
          <strong>Unidade do Solo:</strong> {sensor.unidadeSolo ?? "N/A"}
        </span>
      </div>

      {/* Nome do Sensor */}
      <div className="info-row">
        <strong>Nome do Sensor:</strong> {sensor.nome ?? "N/A"}
      </div>

      <div className="info-row">
        <strong>Sensor ID:</strong> {sensor.id ?? "N/A"}
      </div>

      {/* Umidade */}
      <div className="info-row">
        <strong>Umidade:</strong> {sensor.umidade ?? "N/A"}%
      </div>

      {/* Status */}
      <div className="info-row">
        <strong>Status:</strong>{" "}
        <span className={sensor.ativo ? "status-ativo" : "status-inativo"}>
          {sensor.ativo ? "Ativo" : "Inativo"}
        </span>
      </div>

      {/* Última Leitura */}
      <div className="info-row">
        <strong>Última Leitura:</strong>{" "}
        {sensor.ultimaLeitura
          ? new Date(sensor.ultimaLeitura).toLocaleString()
          : "N/A"}
      </div>
    </div>
  );
}
