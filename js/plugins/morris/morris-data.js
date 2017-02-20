// Morris.js Charts sample data for SB Admin template

$(function() {

    // Area Chart
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2016-09',
            treinos: 127,
            jogos: 53,
            reunioes: 13
        }, {
            period: '2016-10',
            treinos: 102,
            jogos: 53,
            reunioes: 6
        }, {
            period: '2016-11',
            treinos: 101,
            jogos: 45,
            reunioes: 23
        }, {
            period: '2016-12',
            treinos: 70,
            jogos: 20,
            reunioes: 6
        }, {
            period: '2017-01',
            treinos: 79,
            jogos: 24,
            reunioes: 21
        }, {
            period: '2017-02',
            treinos: 127,
            jogos: 53,
            reunioes: 13
        }],
        xkey: 'period',
        ykeys: ['treinos', 'jogos', 'reunioes'],
        labels: ['Treinos', 'Jogos', 'Reuniões'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

});
