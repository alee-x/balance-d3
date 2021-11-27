const MARGINTOP    = 30;
const MARGINRIGHT  = 15;
const MARGINBOTTOM = 30;
const MARGINLEFT   = 30;

var data = [{
    colour : '#FF0000',
    values : [],
    range : {
        min : -90,
        max : 90,
        current : 0
    }
}
];


document.addEventListener('DOMContentLoaded', function(){
    generateFirstData();
    initialiseGraph();
    setInterval(function(){ updateGraph() }, 5000);
}, false);


function updateGraph(){
    addData();

    var vis = d3.select("#streaming-chart-svg");

    var xRange = getXRange();
    var yRange = getYRange();

    data.forEach(function(d,index){
        vis.select(".circl"+index)
            .transition()
            .duration(500)
            .attr("cx", xRange(d.values[0].x))
            .attr("cy", yRange(d.values[0].y));
    });
}

function getYRange(){
    var allValues = [];
    data.forEach(function(v,i){
        allValues = allValues.concat(v.values);
    });
    var containerHeight = $("#streaming-chart-svg").parent().height();
    return d3.scaleLinear()
        .range([containerHeight - MARGINBOTTOM, MARGINTOP])
        .domain([-90,90]);
}

function getXRange(){
    var containerWidth = $("#streaming-chart-svg").parent().width();
    return d3.scaleLinear()
        .range([MARGINLEFT, containerWidth - MARGINRIGHT])
        .domain([-90,90]);
}

function initialiseGraph(){

    var vis = d3.select("#streaming-chart-svg");
    var containerHeight = $("#streaming-chart-svg").parent().height();
    var containerWidth = $("#streaming-chart-svg").parent().width();

    var xRange = getXRange();
    var yRange = getYRange();

    var xAxis = d3.axisBottom()
        .scale(xRange)
        .tickSize(5);

    var yAxis = d3.axisLeft()
        .scale(yRange)
        .tickSize(5);

    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (containerHeight - MARGINBOTTOM) + ")")
        .call(xAxis);

    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINLEFT) + ",0)")
        .call(yAxis);

    data.forEach(function(d,index){
        var svgLine = vis.append('circle')
            .attr("class", "circle")
            .attr("cx", xRange(d.values[0].x))
            .attr("cy", yRange(d.values[0].y))
            .attr("r", 20)
            .attr("fill", "red")
            .attr('class', 'circl'+index);
    });
}

//========================================
//========== DATA GENERATION =============
//========================================
function generateFirstData(){
    data.forEach(function(v,i){
        let runnerData = [];
        runnerData.push({x:0,y:0});
        v.values = runnerData;
    });
}

function addData(){
    // pick some random fuckin coordinates
    let rand_x = getRandomIntInclusive(-90, 90),
        rand_y = getRandomIntInclusive(-90, 90)
    data.forEach(function(v,i){
        let runnerData = [];
        runnerData.push({x:rand_x,y:rand_y});
        v.values = runnerData;
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function adjustData(data){
    var rnd = Math.random()*100
    if(rnd < 90){

    } else if(rnd < 93){
        data.range.current = data.range.current + 0.1;
        if(data.range.current > data.range.max){
            data.range.current = data.range.max;
        }
    } else if(rnd < 96){
        data.range.current = data.range.current - 0.1;
        if(data.range.current < data.range.min){
            data.range.current = data.range.min;
        }
    }
}
//========================================
