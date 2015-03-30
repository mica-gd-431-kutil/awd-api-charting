'use strict';

/*
Self Executing function
(function (){

})();
*/

(function ($) {
    var getEntries,
        parseEntries,
        displayEntries,
        displayCharts,
        resultsArr = [],
        shotsArr = [],
        totalLikes = 0;

    getEntries = function getEntriesF() {
      var req,
          form = $('#search');

      form.on('submit', function (event) {
        var value = $('#dribbbleId').val();

        event.preventDefault();

        if (value !== "") {
          req = $.ajax({
            url: 'http://api.dribbble.com/players/' + value + '/shots',
            dataType: 'jsonp',
            type: 'GET'
          });

          req.done(parseEntries);

          req.error(function (data, error){
            alert(error);
          });
        } else {
          alert('Please enter a value');
        };

      });





    };

    parseEntries = function parseEntriesF(data) {
        var i = 0,
            shots = data.shots;
        for (i = shots.length; i--;) {
          resultsArr.push(shots[i]);
          shotsArr.push({
            id: shots[i].id,
            title: shots[i].title,
            image_url: shots[i].image_url,
            likes_count: shots[i].likes_count,
            player_name: shots[i].player.name,
            player_location: shots[i].player.location
          });

          totalLikes = totalLikes + shots[i].likes_count;
        }

        displayEntries();
    };

    displayEntries = function displayEntriesF() {
      console.log(resultsArr);
      var $content = $('#content');
      var $contentTable = $('<table>', {class: 'results table', id: 'results'});
      for (var i = shotsArr.length - 1; i >= 0; i--) {
        var shot = shotsArr[i];
        var $row = $('<tr>', {id: 'result-' + shot.id });
        var nameCol = '<th><h2>' + shot.player_name + '</h2><p>' + shot.player_location + '</p>';
        var shotImg = document.createElement("img");
          shotImg.src = shot.image_url;
          shotImg.width = 400;
          shotImg.id = 'image-' + shot.id;
        var $imgCol = $('<td>').append(shotImg);
        var $count = $('<h2>', {html: shot.likes_count});
        var $countChart = $('<canvas>', {id: 'chart-' + shot.id, width: '400', height: '400' });
        var $countCol = $('<td>').append($count, $countChart);
        $row.append(nameCol, $imgCol, $countCol);
        $contentTable.append($row);
      };
      $content.append($contentTable);

      displayCharts();
    };


    displayCharts = function displayChartsF() {
      for (var i = shotsArr.length - 1; i >= 0; i--) {
        var shot = shotsArr[i];
        console.log('#chart-' + shot.id);
        var $chart = $('#chart-' + shot.id);
        var $img = $('#image-' + shot.id);

        var ctx = $chart[0].getContext('2d');
        var polarChart = new Chart(ctx).Doughnut([{
          value: shot.likes_count,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: shot.player_name
        },{
          value: totalLikes,
          color: '#ccc'
        }]);
      }
    };

    getEntries();

})(jQuery);
