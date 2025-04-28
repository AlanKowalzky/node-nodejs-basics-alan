import fs from 'node:fs';
import path from 'node:path';

const read = async () => {
    const filePath = path.resolve(import.meta.dirname, 'files', 'FileToRead.txt');
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    readStream.on('data', (chunk) => {
        // console.log(chunk);
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        // console.log('File read successfully');
        console.log('\n');
    }); 

    readStream.on('error', (err) => {
        console.error('Error reading file:', err);
    }); 

};

await read();