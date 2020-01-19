// b9c5e4cc235bdc5c627de10d824323d1
$("#searchBtn").on("click", searchWheather);

function searchWheather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=london,uk&appid=b9c5e4cc235bdc5c627de10d824323d1";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){

      console.log(response);

    });
}



    
    

  