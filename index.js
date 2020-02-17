

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded

// parse application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.listen(8081);

app.post('/sum', function (req, res) {

 	if(typeof req.body === undefined || typeof(req.body.data) === undefined) {
 		return res.send({
	      status: false,
	      message: "Required Param Not found"
	    } );
 	}
    const data = req.body.data;
    const subArrayLength = req.body.length;
  	if(data === null || data.length == 0) {
	    return res.send({
	      status: false,
	      message: "Please provide valid input"
	    } );
  	}
  
    if(data.some(isNaN)) {
        return res.send({
        status: false,
        message: "Data should contain only numeric value"
        } );
    }
    let definedLength = data.length
    const responseData = maxSum(data, definedLength, subArrayLength)
    return res.send({
        status: true,
        data: responseData
        } );
})

function maxSum(data, totalSize) {
	let responseValue = 0;
	let responseArray = []
	for (let i = 0; i < totalSize; i++) {
	    responseArray = [];
	    for(let j=i; j < totalSize; j++) {
	        responseArray.push(data[j])
	        let sum = responseArray.reduce((a, b) => {
	            return a + b;
	        }, 0);
	        if(sum > responseValue) {
	            responseValue = sum;
	            response = { sum, responseArray }
	        }
	    }
	}
	return response
}