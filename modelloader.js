const THREE = require('three')
const fs = require('fs')

var loadModel = (model_id) => {
    return new Promise((resolve, reject) => {
        fs.readFile(model_id, "utf8", function(err, data){
        	if(err){
        		reject('Model Not Loaded')
        	}
        	resolve(data)
        })
    })
}

module.exports = {
    loadModel
}