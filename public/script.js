const xs = [];
        const ys = [];
        getdata();
        async function getdata() {
            let url_path = 'https://data.gov.il/api/action/datastore_search?offset=';
            let offset = 0;
            let url_end = '&resource_id=2de7b543-e13d-4e7e-b4c8-56071bc4d3c8';
            let total = 9015;
            while (offset < total) {
                let url = url_path  + offset + url_end;
                const response = await fetch(url);
                const json = await response.json();
                let records = json.result.records;

                let avg = 0;
                let count = 0;
                records.forEach(element => {                    
                    avg += element['Kinneret_Level'];
                    count++;
                });
                ys.push(avg/count);

                let date = new Date(records[0]['Survey_Date']);
                xs.push(date.getMonth() + "/" + date.getFullYear());
                console.log(xs);
                if (offset == 0)
                    total = json.result.total;
                offset += 100;
                console.log(total + " " + offset);
            }
        }


        createChart();

        function createChart() {
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: xs,
                    datasets: [{
                        label: ':מפלס המים',
                        //backgroundColor: 'rgb(0, 99, 132)',
                        borderColor: 'rgb(0, 0, 255)',
                        data: ys,
                        borderWidth: 1,
                        fill: false,
                        showLine: true,
                        pointRadius: 0
                    }]
                },

                // Configuration options go here
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function (value, index, values) {
                                    return value + ' m';
                                }
                            }
                        }]
                    },
                    plugins: {
                        zoom: {
                            // Container for pan options
                            pan: {
                                // Boolean to enable panning
                                enabled: true,

                                // Panning directions. Remove the appropriate direction to disable 
                                // Eg. 'y' would only allow panning in the y direction
                                mode: 'xy'
                            },

                            // Container for zoom options
                            zoom: {
                                // Boolean to enable zooming
                                enabled: true,

                                // Zooming directions. Remove the appropriate direction to disable 
                                // Eg. 'y' would only allow zooming in the y direction
                                mode: 'xy',
                            }
                        }
                    }
                }
            });
        }