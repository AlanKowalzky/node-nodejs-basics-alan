import { access, constants, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    console.log('File path:', filePath);
    
    try {
        console.log('Checking if file exists...');
        await access(filePath, constants.F_OK);
        console.log('File exists - access() was successful');
        console.error('Error: File already exists, cannot create it');
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('File does not exist (ENOENT error)');
            console.log('Creating directory if needed...');
            try {
                await mkdir(path.dirname(filePath), { recursive: true });
            } catch (dirError) {
                console.error('Error creating directory:', dirError);
                throw dirError;
            }
            
            console.log('Writing file content...');
            try {
                await writeFile(filePath, 'I am fresh and young');
                console.log('File created successfully!');
            } catch (writeError) {
                console.error('Error writing file:', writeError);
                throw writeError;
            }
        } else {
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                code: error.code
            });
            throw error;
        }
    }
};

await create();