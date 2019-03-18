     $(document).ready( function() {
             
            var donut1 = donutChart()
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('Percentage')
            .category('Status');

    //   var dataDetails = [
    //                             {
    //                             Status: "Installed",
    //                             Percentage: "0.40",
    //                             ServerCount: "0.045296463390387814"
    //                             },
    //                             {
    //                             Status: "Needed",
    //                             Percentage: "0.20",
    //                             ServerCount: "0.045296463390387814"
    //                             },
    //                             {
    //                             Status: "Downloaded",
    //                             Percentage: "0.10",
    //                             ServerCount: "0.045296463390387814"
    //                             },
    //                             {
    //                             Status: "Pending",
    //                             Percentage: "0.10",
    //                             ServerCount: "0.045296463390387814"
    //                             },
    //                             {
    //                             Status: "Failed",
    //                             Percentage: ".05",
    //                             ServerCount: "0.03390387814"
    //                             },
    //                                 {
    //                             Status: "Unknown",
    //                             Percentage: ".05",
    //                             ServerCount: "0.03390387814"
    //                             }
    //                         ];


    //     d3.json(dataDetails, function(error, data) {
    //         if (error) throw error;
    //             d3.select('#chart1')
    //                 .datum(data) // bind data to the div
    //                 .call(donut1) // draw chart in div
    //     });

        d3.tsv('/assets/js/servers.tsv', function(error, data) {
                    if (error) throw error;
                    d3.select('#chart1')
                        .datum(data) // bind data to the div
                        .call(donut1) // draw chart in div
                        // .call(donut2); // draw chart in div
                });


});
