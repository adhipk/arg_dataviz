// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 30, left: 30 },
    width = 550 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

const forChart = d3
    .select("#for-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
const againstChart = d3
    .select("#against-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// creating a bar chart to show for side argument
d3.csv("data/oecd_tax_for.csv", (d) => d).then((data) => {
    drawChart(
        data.sort((a, b) => a.Value - b.Value),
        "#for-chart",
    );
    console.log(data);
});
// creating a bar chart to show for side argument
d3.csv("data/oecd_tax_against.csv", (d) => d).then((data) => {
    drawChart(
        data.sort((a, b) => a.Value - b.Value),
        "#against-chart",
    );
    console.log("against", data);
});

function drawChart(data, chart_id) {
    // Y axis
    var svg = d3.select(chart_id);
    var y = d3
        .scaleBand()
        .range([height, margin.top])

        .domain(data.map((d) => d.Country))
        .padding(1);
        
    
    // svg.append('g')
    //     .attr('class', 'y axis-grid')
    //     .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));
    // draw y axis move labels to right if value < 0
    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("id", "for-y-axis")
        .selectAll("text")
        .style("text-anchor", (d, i) => (data[i].Value > 0 ? "end" : "start"))
        .attr("transform", (d, i) =>
            data[i].Value > 0 ? "translate(0,0)" : "translate(17,0)",
        );
    // reflect ticks if value < 0
    svg.selectAll(".tick > line").attr("x2", (d, i) =>
        data[i].Value > 0 ? "-6" : "+6",
    );
    

    // Add x axis
    var x = d3.scaleLinear().domain([-30, 60]).range([margin.left, width]);
    // add grid lines
    // svg.append('g')
    //     .attr('class', 'x axis-grid')
    //     .attr('transform', 'translate(0,' + height + ')')
    //     .call(d3.axisBottom(x).tickSize(-height).tickFormat(''));
    
    svg.append("g")
        .attr('class', 'x axis-grid')
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(-height));
        
    

    svg.select("#for-y-axis").attr("transform", `translate(${x(0)},0)`);
    // lollipop lines
    svg.selectAll("mylines")
        .data(data)
        .join("line")

        .attr("class", "myline")
        .attr("y1", (d) => y(d.Country))
        .attr("y2", (d) => y(d.Country))
        .attr("x1", x(0))
        .attr("x2", (d) => x(d.Value))
        .attr("stroke-width", "2px")
        .attr("stroke", "#777777");

    // circles
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("circle")
        .attr("cy", function (d) {
            return y(d.Country);
        })
        .attr("cx", function (d) {
            return x(d.Value);
        })
        .attr("r", 4)
        .attr("fill", (d) =>
           {
            if( d.Country == "United States")return "#ef4444"
            else if(d.Country == "OECD - Average") return "#06b6d4"
            else return"#4f46e5"
           }
        );
}
