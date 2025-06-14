const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let sensores = {};
let alertas = [];

const TEMPO_MAX_SEM_RESPOSTA = 60000; // 1 minuto
const TEMPO_MAX_BOMBA_LIGADA = 100000; // 5 minutos

setInterval(() => {
  const agora = Date.now();
  alertas = [];

  for (const id in sensores) {
    const sensor = sensores[id];
    const tempoSemResposta = agora - sensor.ultimaLeitura;

    sensor.ativo = tempoSemResposta <= TEMPO_MAX_SEM_RESPOSTA;

    if (!sensor.ativo) {
      const msg = `[ALERTA] Sensor ${id} parou de responder há ${tempoSemResposta} ms`;
      console.log(msg);
      alertas.push(msg);
    }

    if (sensor.bombaLigada && sensor.umidade > 35) {
      const msg = `[ALERTA] Bomba do sensor ${id} está ligada, mas a umidade está alta (${sensor.umidade})`;
      console.log(msg);
      alertas.push(msg);
    }

    if (sensor.bombaLigada && tempoSemResposta > TEMPO_MAX_BOMBA_LIGADA) {
      const msg = `[ALERTA] Bomba do sensor ${id} ligada por mais de 5 minutos sem atualizar`;
      console.log(msg);
      alertas.push(msg);
    }

    console.log(
      `[INFO] Sensor ${id} - Umidade: ${sensor.umidade}, Bomba: ${
        sensor.bombaLigada ? "Ligada" : "Desligada"
      }, Status: ${sensor.ativo ? "Ativo" : "Inativo"}`,
    );
  }
}, 5000);

app.post("/sensor/:id", (req, res) => {
  const id = req.params.id;
  const { umidade, bombaLigada } = req.body;

  sensores[id] = {
    umidade,
    bombaLigada,
    ultimaLeitura: Date.now(),
    ativo: true,
    id: id,
  };

  const data = new Date().toLocaleString("pt-BR");

  console.log("============================================");
  console.log(`[🛰️  RECEBIDO - ${data}] Sensor ${id}`);
  console.log(`Umidade: ${umidade <= 35 ? "Seco" : "Molhado"} (${umidade})`);
  console.log(`Bomba: ${bombaLigada ? "Ligada" : "Desligada"}`);
  console.log("============================================\n");

  res.status(200).json({ sucesso: true });
});

app.get("/sensores", (req, res) => {
  const agora = Date.now();
  const resposta = {};

  for (const id in sensores) {
    const sensor = sensores[id];
    const tempoSemResposta = agora - sensor.ultimaLeitura;

    resposta[id] = {
      ...sensor,
      ativo: tempoSemResposta <= TEMPO_MAX_SEM_RESPOSTA,
    };
  }

  res.json(resposta);
});

app.get("/alertas", (req, res) => {
  res.json({ alertas });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
