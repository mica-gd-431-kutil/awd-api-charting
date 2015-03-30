(function ($) {
  var apiKey = 'AIzaSyC_fxfI_gPAJ2a8NDXk7FQk32WaKqgPYG8';
  var getEntries;
  var getLocations;
  var displayEntries;
  var resultsArr = [];
  var allLocationsArr = [];


  getEntries = function getEntriesF () {
    req = $.ajax({
      url: 'http://api.dribbble.com/shots/everyone',
      dataType: 'jsonp',
      type: 'GET'
    });

    req.done(getLocations);
  };

  getLocations = function getLocationsF (data) {
    var i = 0;
    var shots = data.shots;

    for (var i = shots.length - 1; i >= 0; i--) {
      var shot = shots[i];

      console.log(shot.player.location);
    };
  };

  displayEntries = function displayEntriesF () {

  };

  getEntries();

})(jQuery);
