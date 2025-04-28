import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const decompress = async () => {
    const sourceFilePath = path.resolve(import.meta.dirname, 'files', 'archive.gz');
    const destinationFilePath = path.resolve(import.meta.dirname, 'files', 'fileToCompress.txt');
    const unzip = zlib.createUnzip();

    const sourceStream = fs.createReadStream(sourceFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);
    
    sourceStream.pipe(unzip).pipe(destinationStream);
   
};

await decompress();