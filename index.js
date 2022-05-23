(async()=>{
    try{
        await import('./src/database.js')
        await import('./src/deploy-commands.js')
        await import('./src/Client.js');

    }catch(e){console.log(e)}
})()


