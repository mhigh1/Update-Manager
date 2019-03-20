     $(document).ready( function() {
             
            var donutDG = donutChart()
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('count')
            .category('state');

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

       const buildChart =  function(element, data, visual)
       {
            d3.select(element)
              .datum(data) // bind data to the div
              .call(visual);
       };


  // Chart 1 - Device Group
       const createLegendEntry = function(color, label, value)
       {
            return `
                <div style="border-left: 5px solid ${color}; margin-bottom: 6px;">
                    <div style="padding-left:6px;">
                        <div style="font-size: .7em; line-height: .9em;">${label.toUpperCase()}</div>
                        <div style="font-size: 1.25em; line-height: 1em; font-weight: 600;">${value}</div>
                    </div>
                </div>
            `
       };

        $.get('/api/devices/updates').then(function(data) {
            const labels = ["INSTALLED", "NEEDED", "DOWNLOADED", "PENDING", "FAILED", "STATUS UNKNOWN"];

            buildChart("#chart1", data, donutDG);

            let legend = "";  
            let hexColor = "";
            let value = ""; 
            labels.forEach(item => {
                switch(item){
                    case "INSTALLED": 
                    hexColor = "#009e49";
                    value = data.find((obj) => obj.state === 4).count;
                    break;

                    case "NEEDED": 
                    hexColor = "#ff8c00";
                    value = data.find((obj) => obj.state === 2).count;
                    break;

                    case "DOWNLOADED": 
                    hexColor = "#28B9F5";
                    value = data.find((obj) => obj.state === 3).count;
                    break;

                    case "PENDING": 
                    hexColor = "#512bd4";
                    value = data.find((obj) => obj.state === 6).count;
                    break;

                    case "FAILED": 
                    hexColor = "#e81123";
                    value = data.find((obj) => obj.state === 5).count;
                    break;

                    case "STATUS UNKNOWN": 
                    hexColor = "#000000";
                    value = data.find((obj) => obj.state === 0).count;
                    break;
                }


                legend += createLegendEntry(hexColor, item, value);
            });

            $(`#cardUpdateStatus div.legend`).html(legend);


        });

// Chart 2 - Devices
    $.get('/api/devices/updates').then(function(data) {

        buildChart("#chart2", data, donutFW);

    });

//  Chart 3 - Devices
    $.get('/api/devices/updates').then(function(data) {
            const labels = ["INSTALLED", "NEEDED", "DOWNLOADED", "PENDING", "FAILED", "STATUS UNKNOWN"];

            buildChart("#chart3", data, donutUpdatesSum);

            let legend = "";  
            let hexColor = "";
            let value = ""; 
            labels.forEach(item => {
                switch(item){
                    case "INSTALLED": 
                    hexColor = "#009e49";
                    value = data.find((obj) => obj.state === 4).count;
                    break;

                    case "NEEDED": 
                    hexColor = "#ff8c00";
                    value = data.find((obj) => obj.state === 2).count;
                    break;

                    case "DOWNLOADED": 
                    hexColor = "#28B9F5";
                    value = data.find((obj) => obj.state === 3).count;
                    break;

                    case "PENDING": 
                    hexColor = "#512bd4";
                    value = data.find((obj) => obj.state === 6).count;
                    break;

                    case "FAILED": 
                    hexColor = "#e81123";
                    value = data.find((obj) => obj.state === 5).count;
                    break;

                    case "STATUS UNKNOWN": 
                    hexColor = "#000000";
                    value = data.find((obj) => obj.state === 0).count;
                    break;
                }


                legend += createLegendEntry(hexColor, item, value);
            });

            $(`#cardUpdateStatus div.legend`).html(legend);


        });


        // d3.tsv('/assets/data/fiscalweek.tsv', function(error, data) {
        //     if (error) throw error;
        //     d3.select('#chart2')
        //         .datum(data) // bind data to the div
        //         .call(donutFW) // draw chart in div
        // });

        // d3.tsv('/assets/data/servers.tsv', function(error, data) {
        //     if (error) throw error;
        //     d3.select('#chart3')
        //         .datum(data) // bind data to the div
        //         .call(donutUpdatesSum) // draw chart in div
        // });
        

});
