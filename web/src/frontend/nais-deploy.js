const childProcess = require('child_process');
const fs = require('fs');

const timestamp = Date.now().toString();

fs.writeFile('./settings.json', JSON.stringify({
    timestamp,
    isProd: true,
}), (error) => {
    if (error) {
        console.log('Feil ved lagring av settings.');
    } else {
        console.log('Settings lagret til ./settings.json');
    }
});

childProcess.exec('webpack -p --config nais-webpack.production.config.js --env.timestamp=' + timestamp, (error, stdout, stderr) => {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
