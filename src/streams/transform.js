import { Transform } from 'node:stream';
import process from 'node:process';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
    const upperCaseTransform = new Transform({
        transform(chunk, encoding, callback) {
            // const upperChunk = chunk.toString().toUpperCase();
            // callback(null, upperChunk);
            callback(null, chunk.toString().split('').reverse().join(''));
        }
    });

    await pipeline(process.stdin, upperCaseTransform, process.stdout);
}
await transform();
