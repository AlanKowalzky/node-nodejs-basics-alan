import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import path from 'node:path';

const performCalculations = async () => {
	const numCPUs = cpus().length;
	const results = [];
	const workers = [];
	const workerFile = path.join(import.meta.dirname, 'worker.js');

	for (let i = 0; i < numCPUs; i++) {
		results[i] = new Promise((resolve) => {
			const worker = new Worker(workerFile, {
				workerData: 10 + i,

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