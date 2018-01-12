const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

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
// :datapoints must be in format of 5-3-10-17-15-4-20-6 which would translate to [[5, 3], [10, 17], [15, 4], [20, 6]]
app.get('/regression/:datapoints', (req, res) => {

    // check to see if it's a valid data set first
    if (req.params.datapoints.split('-').map(Number).some(isNaN)) {
        return res.send({error: "send a valid data set like '5-3-10-17-15-4-20-6' baka"});
    } else if (req.params.datapoints.split('-').map(Number).length % 2 == 1) { // checking to see if it's an odd number of data points
        return res.send({error: 'send a data set with an even number of data points, baka'});
    } else if (req.params.datapoints.split('-').map(Number).length === 2) {
        return res.send({error: 'send a data set with more than one data point, baka'});
    }

    // decode data points from the arbitrary encoding design into an array of numbers
    const dataPoints = req.params.datapoints.split('-').map(Number);
    let xValues = [], yValues = [];

    const numberOfDataPoints = dataPoints.length / 2;

    for (let i = 0; i < numberOfDataPoints; i++) {
        // if it's odd, add it to the set of x values
        if (Math.abs(i % 2 == 1))
            xValues.push(dataPoints[i]);
        // else it's even so add it to the set of y values
        else if (i % 2 == 0)
            yValues.push(dataPoints[i]);
    }

    const regression = new SimpleLinearRegression(xValues, yValues);

    const result = {
        slope: regression.slope,
        y_intercept: regression.intercept,
        model: regression.toString(),
        numberOfDataPoints: numberOfDataPoints
    };

    return res.send(result);
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