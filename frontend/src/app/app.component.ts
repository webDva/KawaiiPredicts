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

    dset = '1_8_2_8_3_8_4_3_5_2_6_-2_7_-3_8_-4';
    results = {};

    numPairs = 1;
    dataPairs = [[1, 2], [3, 4]];

    getRegression(dataset: string) {
        this.http.get(this.baseUrl + '/regression/' + dataset).subscribe(data => {
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
