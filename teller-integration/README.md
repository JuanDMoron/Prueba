# Integracion con Teller.io

Cliente real (no sandbox-only) para conectar cuentas bancarias con [Teller.io](https://teller.io):
un backend en Node/Express que habla con la API de Teller usando mTLS, y un frontend que
usa el widget oficial **Teller Connect** para que el usuario autorice el acceso a su banco.

## Como funciona

1. El navegador carga `public/index.html`, que incluye el script `connect.js` de Teller y
   abre el flujo de Teller Connect.
2. Cuando el usuario conecta su banco, Teller Connect devuelve un `accessToken` en el
   navegador. Ese token se envia al backend (`POST /api/enrollment`) y se guarda ahi.
3. El backend usa ese `accessToken` para llamar a la API de Teller (`api.teller.io`) por
   HTTP Basic Auth, autenticando ademas la conexion TLS con un **certificado de cliente
   (mTLS)** cuando el entorno es `development` o `production`.

## Requisitos previos (cuenta real de Teller)

1. Crea una cuenta y una aplicacion en https://teller.io/dashboard.
2. Copia el **Application ID** (`app_...`).
3. Para conectar bancos reales (entornos `development`/`production`), descarga desde el
   dashboard el certificado y la llave privada mTLS de tu aplicacion, y guardalos como:
   - `certs/certificate.pem`
   - `certs/private_key.pem`

   (En `sandbox` no hacen falta certificados; sirve para probar todo el flujo con datos
   ficticios antes de pasar a datos reales.)

## Configuracion

```bash
cd teller-integration
cp .env.example .env
# completa TELLER_APPLICATION_ID, TELLER_ENVIRONMENT y las rutas a los certificados
npm install
npm start
```

Abri http://localhost:3000 y hace click en "Conectar cuenta".

## Endpoints del backend

| Metodo | Ruta                              | Descripcion                                  |
|--------|------------------------------------|-----------------------------------------------|
| GET    | `/api/config`                      | Devuelve `applicationId` y `environment`      |
| POST   | `/api/enrollment`                  | Guarda el `accessToken` del enrollment activo |
| GET    | `/api/accounts`                    | Lista las cuentas del enrollment activo       |
| GET    | `/api/accounts/:id/balances`       | Balance de una cuenta                         |
| GET    | `/api/accounts/:id/transactions`   | Transacciones de una cuenta                   |

## Notas de seguridad

- **Nunca** subas `.env` ni los archivos `.pem` de `certs/` al repositorio (ya estan en
  `.gitignore`).
- Este proyecto guarda el `accessToken` en memoria (una sola variable global) solo para
  fines de demostracion. En una app real hay que persistirlo cifrado y asociado al usuario
  autenticado.
