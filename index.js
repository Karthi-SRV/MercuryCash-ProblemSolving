

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
// Lister to port
app.listen(8081);

app.post('/sum', function (req, res) {

 	if(typeof req.body === undefined || typeof(req.body.data) === undefined) {
 		return res.send({
	      status: false,
	      message: "Required Param Not found"
	    } );
 	}
	const data = req.body.data;

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

  	const responseData = maxSum(data, data.length)
  	return res.send({
	  	status: true,
	  	data: responseData
	});
})


function maxSum(data, totalSize) {
	let responseValue = 0;
	let responseArray = []

	// Create subarray by using the array size
	for (let i = 0; i < totalSize; i++) {
		//Assign subarray to empth
	    responseArray = [];
	    for(let j=i; j < totalSize; j++) {
	    	// Push Subarray
	        responseArray.push(data[j])
	        let sum = responseArray.reduce((a, b) => {
	        	// Sum the given array of data
	            return a + b;
	        }, 0);

	        // Evaluate the value which is greater
	        if(sum > responseValue) {
	            responseValue = sum;
	            response = { sum, responseArray }
	        }
	    }
	}
	// return the response
	return response;
}