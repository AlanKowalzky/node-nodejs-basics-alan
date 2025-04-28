import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'files', 'script.js');
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

        process.stdin.pipe(child.stdin);
        child.stdout.pipe(process.stdout);
};


spawnChildProcess(['foo', 'bar']);