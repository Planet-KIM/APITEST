function plot_heatmap(series, color){
    var options = {
        series: series,
        chart: {
            height: 450,
            type: 'heatmap',
        },
        dataLabels: {
        enabled: false
        },
        colors: color,
        title: {
            text: 'HeatMap Chart (Different color shades for each series)'
        },
        grid: {
            padding: {
                right: 20
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}
