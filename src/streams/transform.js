import { Transform } from 'node:stream';
import process from 'node:process';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
                   
            callback(null, chunk.toString().split('').reverse().join(''));
        }
    });

    await pipeline(process.stdin, reverseTransform, process.stdout);
}
await transform();
