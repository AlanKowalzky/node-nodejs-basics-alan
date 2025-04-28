const parseArgs = async () => {
    
    const args = process.argv.slice(2);
    
    
    const result = {};
    
    
    for (let i = 0; i < args.length; i += 2) {
    
        if (args[i].startsWith('--')) {
    
            const propName = args[i].slice(2);
    
            const value = args[i + 1];
            
    
            result[propName] = value;
        }
    }
    
    
    for (const [prop, value] of Object.entries(result)) {
        console.log(`${prop} is ${value}`);
    }
};



    await parseArgs();

export {};