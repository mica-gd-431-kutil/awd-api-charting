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


      displayCharts();
    };


    displayCharts = function displayChartsF() {

    };

    getEntries();

})(jQuery);
