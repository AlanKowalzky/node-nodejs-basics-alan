import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';



const calculateHash = async () => {
    
    const filePath = path.resolve(import.meta.dirname, 'files', 'fileToCalculateHashFor.txt');
    const fileStream = fs.createReadStream(filePath);
    const hash = crypto.createHash('sha256');

    
    fileStream
        .on('data', (chunk) => {
            hash.update(chunk);
    })
       .on('end', () => {
            const result = hash.digest('hex');
            console.log('SHA-256 Hash:', result);
    })
        .on('error', (err) => {
        console.error('Error reading file:', err);
    });
};




await calculateHash();