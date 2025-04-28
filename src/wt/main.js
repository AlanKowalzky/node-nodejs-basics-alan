import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const performCalculations = async () => {
	const numCPUs = cpus().length;
	const results = [];
	const workers = [];
	const workerFile = path.join(import.meta.dirname, 'worker.js');

	for (let i = 0; i < numCPUs; i++) {
		results[i] = new Promise((resolve) => {
			const worker = new Worker(workerFile, {
				workerData: 10 + i,
				// type: 'module',
			});
			workers.push(worker);

			worker.on('message', (msg) => {
				resolve({ status: 'resolved', data: msg });
			});
			worker.on('error', () => {
				resolve({ status: 'error', data: null });
			});
		});
	}

	const finalResults = await Promise.all(results);
	console.log(finalResults);

	workers.forEach((worker) => worker.terminate());
};

await performCalculations();