const express = require('express')
const bodyParser = require('body-parser')
const modelLoader = require('./modelloader.js');

const app = express()

const http = require("http").createServer(app)

app.use(express.static(__dirname + "/src"))
app.use(bodyParser.json())

app.get("/",(request, response) => {
	response.sendFile(__dirname + "/front_page.html")
})

app.get("/view/:model_id", (request, response) => {
	var model_id = request.params.model_id
	if (model_id == "test_sword"){
		response.sendFile(__dirname + "/view_model.html")
	} else {
		console.log("No page")
	}
	
	
})

app.post("/getModel", (request, response)=>{
	var webst = request.body["address"].split("/")
	var modelo = webst[webst.length - 1]
	modelLoader.loadModel('./src/katana.obj').then((result)=>{
		response.json({status: "ok" , model_id:result})
	}).catch((err)=>{console.log(err);response.json({status: "nok" , model_id:"none"})})
})

app.get("/view", (request,response)=>{
	response.send("Redirecting")
})

app.get("/account", (request, response)=>{
	response.sendFile(__dirname + "/account_page.html")
})

http.listen(3000, (err) => {
	if (err) {
		console.log('Server is down');
		return false;
	}
	console.log('Server is up');
})