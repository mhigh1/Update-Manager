     $(document).ready( function() {
            const colorsDG = ["#000000", "#dddddd", "#ff8c00", "#28B9F5", "#009e49", "#e81123", "#512bd4"];
            var donutDG = donutChart(colorsDG)
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('count')
            .category('state');

            const colorsFW = ["#009e49", "#ff8c00", "#28B9F5"];
            var donutFW = donutChart(colorsFW)
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('count')
            .category('label');

            var donutUpdatesSum = donutChart(colorsDG)
            .width(200)
            .height(180)
            .cornerRadius(3) // sets how rounded the corners are on each slice
            .padAngle(0.015) // effectively dictates the gap between slices
            .variable('count')
            .category('state');


    // Calling Datasets for each Donut
    // Helper function that invokes building the d3 svg element
    const buildChart =  function(element, data, visual) {
        d3.select(element).datum(data).call(visual);
    };

    // tmplLegendEntry
    const tmplLegendEntry = function(color, label, value) {
        return `
            <div style="border-left: 5px solid ${color}; margin-bottom: 6px;">
                <div style="padding-left:6px;">
                    <div style="font-size: .7em; line-height: .9em;">${label.toUpperCase()}</div>
                    <div style="font-size: 1.25em; line-height: 1em; font-weight: 600;">${value}</div>
                </div>
            </div>
        `
    };

    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Chart 1 - Device Group
    $.get(`/api/devices/updates?measure=true&targetGroupID=${urlParams.get('targetGroupID')}`).then(function(data) {
        
        const labels = ["INSTALLED", "NEEDED", "DOWNLOADED", "PENDING", "FAILED", "STATUS UNKNOWN"];
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

            legend += tmplLegendEntry(hexColor, item, value);
        });

        buildChart("#chart1", data, donutDG);
        $(`#cardUpdateStatus div.legend`).html(legend);
    });

    // Chart 2 - Devices
    $.get('/api/devices/groups').then(function(data) {

        const labels = [
            {label: "FISCAL WEEK 1", id: "WK1", hexColor: "#009e49"},
            {label: "FISCAL WEEK 2", id: "FW2", hexColor: "#ff8c00"},
            {label: "FISCAL WEEK 3", id: "FW3", hexColor: "#28B9F5"},
        ]
        let results = [];
        let legend = "";

        labels.forEach(label => {
            const array = data.filter((obj) => obj.name.includes(label.id));
            let deviceCount = 0;

            array.forEach(group => {
                deviceCount += group.deviceCount;
            });

            results.push({label: label.label, count: deviceCount});
            legend += tmplLegendEntry(label.hexColor, label.label, deviceCount);
        });

        buildChart("#cardDevByWeek div.d3Chart", results, donutFW);
        $("#cardDevByWeek div.d3Legend").html(legend);
    });

    // Chart 3 - Devices.hbs
    $.get('/api/devices/updates?measure=true').then(function(data) {
            
        const labels = ["INSTALLED", "NEEDED", "DOWNLOADED", "PENDING", "FAILED", "STATUS UNKNOWN"];
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
            
            legend += tmplLegendEntry(hexColor, item, value);
        });

        buildChart("#cardUpdateSummary div.d3Chart", data, donutUpdatesSum);
        $("#cardUpdateSummary div.d3Legend").html(legend);

    });
});
