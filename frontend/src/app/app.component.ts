// ng build --prod --aot=false

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

import * as d3 from 'd3';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';
    dataPairs: Array<number[]>;

    getRegression(dataset: Array<number[]>) {
        for (let i = 0; i < dataset.length; i++) {
            dataset[i] = dataset[i].map(Number); // string to number
        }
        this.http.post(this.baseUrl + '/regression', {"dataset": dataset}).subscribe(data => {
            this.chart(data['slope'], data['y_intercept']);
        },
            err => {

            });
    }

    // Random float between
    randomFloatBetween(minValue, maxValue, precision) {
        if (typeof (precision) == 'undefined') {
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
    }

    // generate random dataset values
    generateData() {
        this.dataPairs = [];

        for (let i = 0; i < 10; i++) {
            this.dataPairs.push([this.randomFloatBetween(-100, 100, null), this.randomFloatBetween(-100, 100, null)]);
        }

        this.chart();
    }

    chart(slope?: number, yIntercept?: number) {
        let margin = {top: 20, right: 15, bottom: 20, left: 60};
        let width = 340 - margin.left - margin.right;
        let height = 340 - margin.top - margin.bottom;

        let svg = d3.select('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background-color', '#efefef');

        svg.selectAll('*').remove();

        let x = d3.scaleLinear()
            .domain([-100, 100])
            .range([margin.left, width + margin.left]);

        let y = d3.scaleLinear()
            .domain([-100, 100])
            .range([height + margin.right, margin.top]);

        // add the x Axis
        svg.append("g")
            .attr('class', 'x axis')
            .attr('transform', `translate(${0}, ${margin.top + height})`)
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .attr('class', 'y axis')
            .attr('transform', `translate(${margin.left}, ${0})`)
            .call(d3.axisLeft(y));

        svg.selectAll("circle")
            .data(this.dataPairs)
            .enter().append("circle")
            .attr("cx", function (d) {return x(d[0]);})
            .attr("cy", function (d) {return y(d[1]);})
            .attr("r", "8px")
            .attr("fill", "red");

        if (slope && yIntercept) {
            // extend the length of the line
            let A = [0, yIntercept], B = [100, slope * 100 + yIntercept];
            let newSlope = (B[1] - A[1]) / (B[0] - A[0]);
            let newY = A[1] + (-100 - A[0]) * newSlope;

            svg.append('line')
                .style("stroke", "blue")
                .style("stroke-width", 4)
                .attr("x1", x(-100))
                .attr("y1", y(newY))
                .attr("x2", x(100))
                .attr("y2", y(slope * 100 + yIntercept));
        }
    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
        if (!environment.production) {
            this.baseUrl = 'http://localhost:3000';
        }

        this.generateData();
    }
}
