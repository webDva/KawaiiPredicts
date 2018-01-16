// ng build --prod --aot=false

import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    baseUrl = '';

    //dset = {"dataset": [[5, 3], [10, 17], [15, 4], [20, 6]]};
    results = {};

    numPairs = 1;
    dataPairs = [[1, 2], [3, 4]];

    getRegression(dataset: Array<number[][]>) {
        this.http.post(this.baseUrl + '/regression', {"dataset": dataset}).subscribe(data => {
            this.results = data;
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

    constructor(private http: HttpClient) {}

    ngOnInit() {
        if (!environment.production) {
            this.baseUrl = 'http://localhost:3000';
        }

        this.generateData();
    }
}
