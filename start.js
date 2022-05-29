const { spawn } = require('node:child_process');


const front = spawn('cmd.exe', ['/c', 'cd front && ng s']);

front.stdout.on('data', (data) => {
  data = data.toString();

  if(data.length){
    console.log("Front -----------------------");
    console.log(data);
  }
})

front.stderr.on('data', (data) => {
  data = data.toString();
  if(data.length){
    console.log("Front -----------------------");
    console.log(data);
  }
});

front.on('exit', (code) => {
  console.log(`Front => Child exited with code ${code}`);
});


const back = spawn('cmd.exe', ['/c', 'cd back && node index.js']);

back.stdout.on('data', (data) => {
  if(data.length){
    console.log("Back -----------------------");
    console.log(data);
  }
})

back.stderr.on('data', (data) => {
  if(data.length){
    console.log("Back -----------------------");
    console.log(data);
  }
});

back.on('exit', (code) => {
  console.log(`Back => Child exited with code ${code}`);
});