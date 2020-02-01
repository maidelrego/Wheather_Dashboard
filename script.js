// b9c5e4cc235bdc5c627de10d824323d1
// http://api.openweathermap.org/img/w/10n.png 

$('#searchBtn').on('click', function getWeather(){
  var searchInput = $('#searchInput').val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=b9c5e4cc235bdc5c627de10d824323d1&cnt=1&units=imperial";
   $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){

      console.log(response);

      var currentWeather = $('#jumbo2');
      var replaceChild = currentWeather[0].childNodes.length;
      var searchHistory = $('#searchHistory');

     

      for( var i = 0; i < replaceChild; replaceChild--){
        currentWeather[0].childNodes[i].remove();
      }

      var iconValue = response.weather[0].icon;
      var icon = $('<img>');
      icon.attr('src', 'http://openweathermap.org/img/wn/' + iconValue + '.png');
      var cityName = $('<h1>').text(response.name);
      var buttonHistory = $('<button>');
      buttonHistory.attr('class', 'list-group-item list-group-item-action');
      buttonHistory.text(response.name);
      searchHistory.append(buttonHistory);
      var tempeture = $('<p>').text('Tempeture: ' + response.main.temp + ' °F');
      var humidityEl =  $('<p>').text('Humididty: ' + response.main.humidity + ' %');
      var windEl =  $('<p>').text('Wind Speed: ' + response.wind.speed + ' MPH');
      currentWeather.append(cityName, tempeture, humidityEl, windEl, icon);
      currentWeather.removeAttr('hidden');
      

      

      var citylon = response.coord.lon;
      var citylat = response.coord.lat;

    

      var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=b9c5e4cc235bdc5c627de10d824323d1&lat=" + citylat + "&lon=" + citylon + "&cnt=1";
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response){

        console.log(response);

        var currentWeather = $('#jumbo2');
        var uvIndex = $('<p>');
        var span1 = $('<span>').text('UV Index: ');
        var span2 = $('<span>').text(response.value);
        span2.attr('id', 'spanIndex');
        uvIndex.append(span1, span2);
        currentWeather.append(uvIndex);
        
        if(response.value <= 2){
          span2.attr('class', 'bg-success')
        }

        if (response.value >= 3 && 5){
          span2.attr('class', 'bg-warning')
        }

        if(response.value > 6){
          span2.attr('class', 'bg-danger')
        }

        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=b9c5e4cc235bdc5c627de10d824323d1&units=imperial";
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(response){

        console.log(response);

        var results = response.list;
        var replaceChild = $('#forecast')[0].childNodes.length;
        var fiveDay = $('#fiveday');
        for( var i = 0; i < replaceChild; replaceChild--){
          $('#forecast')[0].childNodes[i].remove();
        }

        for( var i = 4; i < results.length; --i ){
          var forecastDiv = $('<div>');
          forecastDiv.attr('class', 'col-sm');
          forecastDiv.attr('class', 'bg-dark');
          forecastDiv.attr('id', 'forecastDiv');
          var iconValue = results[i].weather[0].icon;
          var icon2 = $('<img>');
          icon2.attr('src', 'http://openweathermap.org/img/wn/' + iconValue + '.png');
          var date = $('<h5>').text(results[i].dt_txt);
          var tempeture = $('<h5>').text('Tempeture: ' + results[i].main.temp + ' °F');
          var humidityEl =  $('<h5>').text('Humididty: ' + results[i].main.humidity + ' %');
          forecastDiv.append(date, icon2, tempeture, humidityEl);
          $('#forecast').prepend(forecastDiv);
          fiveDay.removeAttr('hidden');
        }

        

      });


    });

  });
    
  

});





    
    

  