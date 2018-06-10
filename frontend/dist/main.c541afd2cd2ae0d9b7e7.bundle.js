webpackJsonp([1,4],{0:function(t,e,r){t.exports=r("x35b")},"5xMp":function(t,e){t.exports='<div class="data-pairs-container row">\n    <table>\n        <tr>\n            <th></th>\n            <th>X</th>\n            <th>Y</th>\n        </tr>\n        <tr *ngFor="let d of dataPairs; let i = index;">\n            <td>{{i + 1}}</td>\n            <td><input #number1 type="number" (input)="dataPairs[i][0] = number1.value;" [value]="dataPairs[i][0]"/></td>\n            <td><input #number2 type="number" (input)="dataPairs[i][1] = number2.value;" [value]="dataPairs[i][1]"/></td>\n        </tr>\n    </table>\n    \n    <div class="buttons-container">\n        <button (click)="getRegression(dataPairs)">perform linear regression</button>\n    </div>    \n</div>\n\n<div class="chart-container row">\n    <svg class="d3-chart"></svg>\n</div>\n\n<h1 class="row"><i>KawaiiPredicts</i> is an online service for performing simple linear regression on a dataset</h1>'},Iksp:function(t,e,r){"use strict";var a=r("Qbdm"),n=r("3j3K"),o=r("NVOs"),i=r("KdFd"),s=r("YWx4");r.d(e,"a",function(){return l});var c=this&&this.__decorate||function(t,e,r,a){var n,o=arguments.length,i=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(i=(o<3?n(i):o>3?n(e,r,i):n(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i},l=function(){function t(){}return t=c([r.i(n.b)({declarations:[s.a],imports:[a.a,o.a,i.a],providers:[],bootstrap:[s.a]})],t)}()},MOVZ:function(t,e){function r(t){throw new Error("Cannot find module '"+t+"'.")}r.keys=function(){return[]},r.resolve=r,t.exports=r,r.id="MOVZ"},YWx4:function(t,e,r){"use strict";var a=r("3j3K"),n=r("KdFd"),o=r("kZql"),i=r("vwbq");r.d(e,"a",function(){return l});var s=this&&this.__decorate||function(t,e,r,a){var n,o=arguments.length,i=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,a);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(i=(o<3?n(i):o>3?n(e,r,i):n(e,r))||i);return o>3&&i&&Object.defineProperty(e,r,i),i},c=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},l=function(){function t(t){this.http=t,this.baseUrl="",this.cleanedData=[]}return t.prototype.getRegression=function(t){var e=this;this.cleanedData=[];for(var r=0;r<t.length;r++)isNaN(t[r][0])&&isNaN(t[r][1])||this.cleanedData.push(t[r].map(Number));this.http.post(this.baseUrl+"/regression",{dataset:this.cleanedData}).subscribe(function(t){e.chart(t.slope,t.y_intercept)},function(t){})},t.prototype.chart=function(t,e){var r={top:20,right:15,bottom:20,left:60},a=340-r.left-r.right,n=340-r.top-r.bottom,o=i.a("svg").attr("width",a+r.left+r.right).attr("height",n+r.top+r.bottom).style("background-color","#efefef");o.selectAll("*").remove();var s=i.b().domain([-100,100]).range([r.left,a+r.left]),c=i.b().domain([-100,100]).range([n+r.right,r.top]);if(o.append("g").attr("class","x axis").attr("transform","translate(0, "+(r.top+n)+")").call(i.c(s)),o.append("g").attr("class","y axis").attr("transform","translate("+r.left+", 0)").call(i.d(c)),o.selectAll("circle").data(this.cleanedData).enter().append("circle").attr("cx",function(t){return s(t[0])}).attr("cy",function(t){return c(t[1])}).attr("r","8px").attr("fill","red"),t&&e){var l=[0,e],d=[100,100*t+e],p=(d[1]-l[1])/(d[0]-l[0]),f=l[1]+(-100-l[0])*p;o.append("line").style("stroke","blue").style("stroke-width",4).attr("x1",s(-100)).attr("y1",c(f)).attr("x2",s(100)).attr("y2",c(100*t+e))}},t.prototype.ngOnInit=function(){o.a.production||(this.baseUrl="http://localhost:3000"),this.dataPairs=[];for(var t=0;t<20;t++)this.dataPairs.push([NaN,NaN])},t=s([r.i(a._5)({selector:"app-root",template:r("5xMp"),styles:[r("okgc")]}),c("design:paramtypes",["function"==typeof(e=void 0!==n.b&&n.b)&&e||Object])],t);var e}()},kZql:function(t,e,r){"use strict";r.d(e,"a",function(){return a});var a={production:!0}},okgc:function(t,e,r){e=t.exports=r("FZ+f")(!1),e.push([t.i,'table{border:1px solid #5f6f7e;border-collapse:collapse;margin:1em 0 2em 0}table th{border:1px solid #5f6f7e;background-color:#e2e2e2;color:#000;text-align:left;font-weight:400;padding:.2em .4em .2em .4em;margin:0}table td{margin:0;padding:0;border:1px solid #e2e2e2}table input{width:80px;padding:.2em .4em .2em .4em;margin:0;border-width:0;border-style:none}.row{float:left}.row:after{content:"";display:block;clear:both}.buttons-container{position:relative;display:block;clear:both}.d3-chart{width:400px;height:400px}.d3-chart .axis line,.d3-chart .axis path{stroke:#999}.d3-chart .axis text{fill:#999}',""]),t.exports=t.exports.toString()},x35b:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("3j3K"),n=r("O61y"),o=r("Iksp");r("kZql").a.production&&r.i(a.a)(),r.i(n.a)().bootstrapModule(o.a)}},[0]);