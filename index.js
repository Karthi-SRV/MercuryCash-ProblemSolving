

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

    let sumOfSubArrayResponse = sumOfSubArray(data, data.length)
    let responseData = sumOfSubArrayResponse.reduce(function(prev, current) {
        return (prev.sum > current.sum) ? prev : current
    })

    return res.send({
        status: true,
        data: {
            max: responseData,
            subArray: sumOfSubArrayResponse
        }
    });
})


function sumOfSubArray(data, totalSize) {
    let responseValue = 0;
    let response = []

    for (let i = 0; i < totalSize; i++) {
        for(let j=i; j < totalSize; j++) {
            subArray = data.slice(i, j+1) // Create sub array from base array
            let sum = subArray.reduce((a, b) => {
                return a + b; // Sum the given array of data
            }, 0);
            // Push array of object with Sum and its array set
            response.push({
                sum,
                subArray
            })
        }
    }

    // return the response
    return response;
}