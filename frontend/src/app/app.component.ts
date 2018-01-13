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
    
    getRegression(dataset: string) {
        this.http.get(this.baseUrl + '/regression/' + dataset).subscribe(data => {
            this.results = data;
        },
        err => {
            
        });
    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
        if (!environment.production) {
            this.baseUrl = 'http://localhost:3000';
        }
    }
}