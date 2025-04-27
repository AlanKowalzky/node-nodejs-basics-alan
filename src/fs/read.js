import { access, constants, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {   
   
    console.log('File path:', filePath);
    try {
        await access(filePath, constants.F_OK);
        console.log('File exists - access() was successful');
        
        try {
            const content = await readFile(filePath, 'utf-8');
            console.log(content);
        } catch (readError) {
            console.error('Error reading file:', readError);
            throw new Error('FS operation failed');
        }
    } catch (error) {
        console.error('File does not exist - cannot read it');
        throw new Error('FS operation failed');
    }
};

await read();