# Deployment

Frontend (`client`) is a Vite SPA. On Vercel use root `client`, build `npm run build`, output `dist`, and set `VITE_API_URL` and `VITE_WS_URL`. Add an SPA rewrite to `index.html`.

Backend (`server`) needs a host that supports persistent WebSockets. Set `PORT` and `CLIENT_URL`. Production should use HTTPS/WSS.

A static-only frontend host cannot run the WebSocket backend.
