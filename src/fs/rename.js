import { rename as fsRename, access, constants } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    // Write your code here 
    const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newFilePath = path.join(__dirname, 'files', 'properFilename.md');
    
    try {
        // Check if wrongFilename.txt exists
        try {
            await access(oldFilePath, constants.F_OK);
        } catch (error) {
            console.error('Source file does not exist');
            throw new Error('FS operation failed');
        }
        
        // Check if properFilename.md already exists
        try {
            await access(newFilePath, constants.F_OK);
            console.error('Target file already exists');
            throw new Error('FS operation failed');
        } catch (error) {
            // If error is ENOENT (file doesn't exist), that's good
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        
        // Rename the file
        await fsRename(oldFilePath, newFilePath);
        console.log('File renamed successfully');
    } catch (error) {
        if (error.message === 'FS operation failed') {
            throw error;
        }
        console.error('Error renaming file:', error);
        throw new Error('FS operation failed');
    }
};

await rename();