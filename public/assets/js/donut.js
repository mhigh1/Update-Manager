     $(document).ready( function() {
             
            var donutDG = donutChart()
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('Percentage')
            .category('Status');

            var donutFW = donutChart()
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('Percentage')
            .category('FiscalWeek');

            var donutUpdatesSum = donutChart()
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('Percentage')
            .category('Status');


    // Calling Datasets for each Donut
    
        // d3.json('/assets/js/servers.json', function(error, data) {
        //     // d3.select('#chart1')
        //     //   .data(data) // bind data to the div
        //          console.log(data);
        // });

        d3.tsv('/assets/js/servers.tsv', function(error, data) {
            if (error) throw error;
            d3.select('#chart1')
                .datum(data) // bind data to the div
                .call(donutDG) // draw chart in div
        });

        d3.tsv('/assets/js/fiscalweek.tsv', function(error, data) {
            if (error) throw error;
            d3.select('#chart2')
                .datum(data) // bind data to the div
                .call(donutFW) // draw chart in div
        });

        d3.tsv('/assets/js/servers.tsv', function(error, data) {
            if (error) throw error;
            d3.select('#chart3')
                .datum(data) // bind data to the div
                .call(donutUpdatesSum) // draw chart in div
        });
        

});
