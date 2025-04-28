import { access, constants, readdir } from 'fs/promises';
import path from 'path';

const list = async () => {
    const folderPath = path.join(import.meta.dirname, 'files');
    try {
        await access(folderPath, constants.F_OK);
    } catch {
        throw new Error('FS operation failed');
    }
    const files = await readdir(folderPath);
    console.log(files);
};

await list();