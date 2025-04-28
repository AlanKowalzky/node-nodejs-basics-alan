import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';



const compress = async () => {
    const sourceFilePath = path.resolve(import.meta.dirname, 'files', 'fileToCompress.txt');
    const destinationFilePath = path.resolve(import.meta.dirname, 'files', 'archive.gz');

    const sourceStream = fs.createReadStream(sourceFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);
    const gzip = zlib.createGzip();

    sourceStream.pipe(gzip).pipe(destinationStream);

    


};

await compress();