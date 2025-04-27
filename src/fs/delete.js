import { access, constants, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
    
    try {
        await access(filePath, constants.F_OK);
        await unlink(filePath);
        console.log('File deleted successfully');
    } catch (error) {
        if (error.code === 'ENOENT') {
            
            throw new Error('FS operation failed');
        } else {
            
            throw error;
        }
    }
};

await remove();