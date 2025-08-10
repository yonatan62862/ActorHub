import http from 'http';
import app from './app';
import config from './config/config';
import { getCastData } from './services/castService';

const port = config.port || 3000;
const server = http.createServer(app);

async function start() {
  try {
    if (config.prewarmCache) {
      console.log('Pre-warming cast cache...');
      await getCastData(); 
      console.log('Cast cache pre-warmed.');
    }
  } catch (err) {
    console.warn('Pre-warm failed, continuing startup:', err instanceof Error ? err.message : err);
  }

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  server.on('error', (e) => {
    console.error('Server error:', e);
    process.exit(1);
  });
}

start();
export default server;
