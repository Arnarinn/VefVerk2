$(document).ready(function() {
	$("#search").click(function(){
		var data = $("#search").val();
		if($("#arrivals").is(":checked")){
			var ArrivalOrDepart = "arrivals"
		}
		else{
			var ArrivalOrDepart = "departures"
		}
		if ($("#is").is(":checked")) {
			var language = "is"
		}
		else{
			var language = "en"
		}
		$.ajax({
			'url': 'http://apis.is/flight',
			'type': 'GET',
			'dataType': 'json',
			'data': {'language': language, 'type': ArrivalOrDepart},
			'success': function(response) {
				$(".returned").empty();
				console.log(response)
				Object.size = function(response) {
				    var size = 0, key;
				    for (key in response) {
				        if (response.hasOwnProperty(key)) size++;
				    }
				    return size;
				};
				for (var i = 0; i < Object.size(response.results); i++) {
					if (response.results[i].status == null) {
						response.results[i].status = "";
					}
					console.log(response.results[i])
					if (ArrivalOrDepart == "arrivals") {
						$('.returned').append("<li class='result'>" + response.results[i].date + "<br>" + response.results[i].flightNumber + "<br>" + response.results[i].plannedArrival + "<br>" +  response.results[i].realArrival + "<br>" +  response.results[i].status + "</li>");
					}
					else{
						$('.returned').append("<li class='result'>" + response.results[i].date + "<br>" + response.results[i].flightNumber + "<br>" + response.results[i].to + "<br>" +  response.results[i].plannedArrival + "<br>" +  response.results[i].realArrival + "<br>" +  response.results[i].status + "</li>");
					}
					// $('.returned').prepend(response.results[i].date);
					// $('.returned').prepend(response.results[i].flightNumber);
					// $('.returned').prepend(response.results[i].to);
					// $('.returned').prepend(response.results[i].plannedArrival);
					// $('.returned').prepend(response.results[i].realArrival);
					// $('.returned').prepend(response.results[i].status);
					// $('.returned').prepend("</li>");
				};
			}
		})
	});	
});