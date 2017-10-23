$(document).ready(function() {

    function showChartFFS() {
      var chartData = sessionStorage.getItem('chartData');
      sessionStorage.removeItem('chartData');
      console.log('chartData');
      console.log(chartData);



      if(chartData != undefined && chartData != '') {
        // Area Chart
        Morris.Area({
            element: 'morris-area-chart',
            data: JSON.parse(chartData),
            xkey: 'period',
            ykeys: ['treinos', 'jogos', 'reunioes'],
            labels: ['Treinos', 'Jogos', 'Reuniões'],
            pointSize: 2,
            hideHover: 'auto',
            resize: true
        });
      }
    }

    setTimeout(showChartFFS, 500);
});
