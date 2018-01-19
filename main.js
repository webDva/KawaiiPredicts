const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// setup backend
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// force https 
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    } else
        return next();
});

const port = process.env.PORT || '3000';
app.set('port', port);

/*
 * API Server
 */

// compute linear regression line.
// :datapoints must be in format of {"dataset": [[5, 3], [10, 17], [15, 4], [20, 6]]}
app.post('/regression', (req, res) => {

    // check to see if it's a valid data set first
    const dataPoints = req.body.dataset;

    for (let i = 0; i < dataPoints.length; i++) {
        if (dataPoints[i].some(isNaN))
            return res.send({error: "send a valid data set like {'dataset': [[5, 3], [10, 17], [15, 4], [20, 6]]} baka"});
    }
    if (dataPoints.length < 2) {
        return res.send({error: 'send a data set with more than one data point, baka'});
    }

    // sort x and y pairs into seperate arrays
    let xValues = [], yValues = [];
    for (let i = 0; i < dataPoints.length; i++) {
        xValues.push(dataPoints[i][0]);
        yValues.push(dataPoints[i][1]);
    }

    // perform linear regression on the user's dataset
    const regression = new SimpleLinearRegression(xValues, yValues);

    // send the results to the user on success
    return res.send({
        slope: regression.slope,
        y_intercept: regression.intercept,
        model: regression.toString(),
        numberOfDataPoints: dataPoints.length,
        xValues: xValues,
        yValues: yValues,
        dataPairs: dataPoints
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