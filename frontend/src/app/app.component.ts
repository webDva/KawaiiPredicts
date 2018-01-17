// ng build --prod --aot=false

import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

import * as d3 from 'd3';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';

    //dset = {"dataset": [[5, 3], [10, 17], [15, 4], [20, 6]]};
    results = {};

    numPairs = 1;
    dataPairs: Array<number[]>;

    getRegression(dataset: Array<number[]>) {
        for (let i = 0; i < dataset.length; i++) {
            dataset[i] = dataset[i].map(Number); // string to number
        }
        this.http.post(this.baseUrl + '/regression', {"dataset": dataset}).subscribe(data => {
            this.results = data;
            this.chart();
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
    }

    chart() {
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
    }

    constructor(private http: HttpClient, private element: ElementRef) {}

    ngOnInit() {
        if (!environment.production) {
            this.baseUrl = 'http://localhost:3000';
        }

        this.generateData();
    }
}
