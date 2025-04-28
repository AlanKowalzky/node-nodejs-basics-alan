import { access, constants, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    
    try {
        // Check if file exists
        try {
            await access(filePath, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (error) {
            // If error is ENOENT (file doesn't exist), that's good
            if (error.code === 'ENOENT') {
                // Create directory if needed
                try {
                    await mkdir(path.dirname(filePath), { recursive: true });
                } catch (dirError) {
                    throw dirError;
                }
                
                // Write file content
                try {
                    await writeFile(filePath, 'I am fresh and young');
                } catch (writeError) {
                    throw writeError;
                }
            } else {
                // If it's a different error, throw it
                throw error;
            }
        }
    } catch (error) {
        if (error.message === 'FS operation failed') {
            throw error;
        }
        throw new Error('FS operation failed');
    }
};

await create();