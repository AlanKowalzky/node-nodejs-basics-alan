
import path from 'node:path';
import fs from 'node:fs';

const write = async () => {
    const filePath = path.resolve(import.meta.dirname, 'files', 'fileToWrite.txt');
    const writeStream = fs.createWriteStream(filePath);

    process.stdin.pipe(writeStream);
    writeStream.on('error', (err) => console.error('Write error:', err));


};

await write();