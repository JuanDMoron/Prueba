require('dotenv').config();

const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');

const {
  PORT = 3000,
  TELLER_APPLICATION_ID,
  TELLER_ENVIRONMENT = 'sandbox',
  TELLER_CERT_PATH,
  TELLER_KEY_PATH,
} = process.env;

if (!TELLER_APPLICATION_ID) {
  console.warn('TELLER_APPLICATION_ID no esta configurado (ver .env.example)');
}

// El entorno "sandbox" de Teller no requiere certificado mTLS.
// "development" y "production" si lo requieren (se descargan desde el dashboard de Teller).
function buildTellerAgent() {
  if (TELLER_ENVIRONMENT === 'sandbox') return undefined;

  if (!TELLER_CERT_PATH || !TELLER_KEY_PATH) {
    throw new Error(
      `El entorno "${TELLER_ENVIRONMENT}" requiere TELLER_CERT_PATH y TELLER_KEY_PATH (certificado mTLS de Teller)`
    );
  }

  return new https.Agent({
    cert: fs.readFileSync(TELLER_CERT_PATH),
    key: fs.readFileSync(TELLER_KEY_PATH),
  });
}

const tellerAgent = buildTellerAgent();

// Almacen en memoria del ultimo enrollment (solo para esta demo).
// En produccion esto se guarda por usuario en una base de datos.
let currentEnrollment = null;

async function tellerFetch(pathname, accessToken) {
  const response = await fetch(`https://api.teller.io${pathname}`, {
    agent: tellerAgent,
    headers: {
      Authorization: `Basic ${Buffer.from(`${accessToken}:`).toString('base64')}`,
    },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(body?.error?.message || `Teller respondio ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body;
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/config', (_req, res) => {
  res.json({
    applicationId: TELLER_APPLICATION_ID,
    environment: TELLER_ENVIRONMENT,
  });
});

app.post('/api/enrollment', (req, res) => {
  const { accessToken, enrollmentId, institution } = req.body || {};

  if (!accessToken) {
    return res.status(400).json({ error: 'accessToken es requerido' });
  }

  currentEnrollment = { accessToken, enrollmentId, institution };
  res.status(201).json({ ok: true });
});

app.get('/api/accounts', async (_req, res) => {
  if (!currentEnrollment) {
    return res.status(409).json({ error: 'No hay ninguna cuenta conectada todavia' });
  }

  try {
    const accounts = await tellerFetch('/accounts', currentEnrollment.accessToken);
    res.json(accounts);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.get('/api/accounts/:id/balances', async (req, res) => {
  if (!currentEnrollment) {
    return res.status(409).json({ error: 'No hay ninguna cuenta conectada todavia' });
  }

  try {
    const balances = await tellerFetch(
      `/accounts/${req.params.id}/balances`,
      currentEnrollment.accessToken
    );
    res.json(balances);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.get('/api/accounts/:id/transactions', async (req, res) => {
  if (!currentEnrollment) {
    return res.status(409).json({ error: 'No hay ninguna cuenta conectada todavia' });
  }

  try {
    const transactions = await tellerFetch(
      `/accounts/${req.params.id}/transactions`,
      currentEnrollment.accessToken
    );
    res.json(transactions);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Teller integration corriendo en http://localhost:${PORT} (entorno: ${TELLER_ENVIRONMENT})`);
});
