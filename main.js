const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// i tried with the below license for the ml-regression-simple-linear node module

//MIT License
//
//Copyright (c) 2017 mljs
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.
const SimpleLinearRegression = require('ml-regression-simple-linear');

/*
 * API Server
 */

const app = express();
// Needed for POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || '3000';
app.set('port', port);

/*
 * API Server
 */

// compute linear regression line.
// :datapoints must be in format of 5_3_10_17_15_4_20_6 which would translate to [[5, 3], [10, 17], [15, 4], [20, 6]]
app.get('/regression/:datapoints', (req, res) => {

    // decode data points from the arbitrary encoding design into an array of numbers
    const dataPoints = req.params.datapoints.split('_').map(Number);

    // check to see if it's a valid data set first
    if (dataPoints.some(isNaN)) {
        return res.send({error: "send a valid data set like '1_8_2_8_3_8_4_3_5_2_6_-2_7_-3_8_-4' baka"});
    } else if (dataPoints.length % 2 == 1) { // checking to see if it's an odd number of data points
        return res.send({error: 'send a data set with an even number of numbers, baka'});
    } else if (dataPoints.length === 2) {
        return res.send({error: 'send a data set with more than one data point, baka'});
    }

    // sort x and y pairs into seperate arrays
    let xValues = [], yValues = [];
    for (let i = 0; i < dataPoints.length; i++) {
        // if it's even, add it to the set of x values
        if (i % 2 == 0)
            xValues.push(dataPoints[i]);
        // else it's odd so add it to the set of y values
        else if (Math.abs(i % 2 == 1))
            yValues.push(dataPoints[i]);
    }

    // perform linear regression on the user's dataset
    const regression = new SimpleLinearRegression(xValues, yValues);

    // send the results to the user on success
    return res.send({
        slope: regression.slope,
        y_intercept: regression.intercept,
        model: regression.toString(),
        numberOfDataPoints: dataPoints.length / 2,
        dataPairs: [xValues, yValues]
    });
});

/*
 * HTTP Server
 */

// Point static path to dist
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Catch all other routes and return the index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

// Start the HTTP server.
app.listen(port, (errorThatOccurs) => {
    if (errorThatOccurs) {
        return console.log('Something bad happened.', errorThatOccurs);
    }

    console.log(`Server running on port ${port}`);
});