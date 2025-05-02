import os from 'node:os';

const parseEnv = () => {
    
    const envVars = process.env;

    
    const rssVars = Object.entries(envVars)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key} = ${value}`);

    
    const output = rssVars.join('; ');

    
    console.log(output);
};

parseEnv();