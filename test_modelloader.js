const modelLoader = require('./modelloader.js');

modelLoader.loadModel('./src/katana.obj').then((result)=>{
		console.log(result)
}).catch((err)=>{console.log(err);})