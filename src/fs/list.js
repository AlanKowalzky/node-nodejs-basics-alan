import { access, constants, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const folderPath = path.join(__dirname, 'files');
    
    try {
        await access(folderPath, constants.F_OK);
    } catch (error) {
        throw new Error('FS operation failed');
    }
    
    const files = await readdir(folderPath);
    console.log(files);
};

await list();