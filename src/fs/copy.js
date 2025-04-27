import { access, constants, copyFile, mkdir, readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funkcja kopiująca rekurencyjnie
const copyRecursive = async (source, target) => {
    const stats = await stat(source);
    
    // Jeśli to katalog, stwórz go i kopiuj jego zawartość
    if (stats.isDirectory()) {
        await mkdir(target, { recursive: true });
        const files = await readdir(source);
        
        for (const file of files) {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(target, file);
            await copyRecursive(sourcePath, targetPath);
        }
    } 
    // Jeśli to plik, po prostu go skopiuj
    else if (stats.isFile()) {
        await copyFile(source, target);
    }
};

const copy = async () => {
    const from = path.join(__dirname, 'files');
    const to = path.join(__dirname, 'files_copy');
    
    try {
        // Check if source directory exists
        try {
            await access(from, constants.F_OK);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('Source directory does not exist');
                throw new Error('FS operation failed');
            }
            throw error;
        }
        
        // Check if target directory already exists
        try {
            await access(to, constants.F_OK);
            console.error('Target directory already exists');
            throw new Error('FS operation failed');
        } catch (error) {
            // If error is ENOENT (directory doesn't exist), that's good
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        
        // Używamy funkcji rekurencyjnej do kopiowania
        await copyRecursive(from, to);
        
        console.log('Files copied successfully');
    } catch (error) {
        if (error.message === 'FS operation failed') {
            throw error;
        }
        console.error('Error copying files:', error);
        throw new Error('FS operation failed');
    }
};

await copy();
