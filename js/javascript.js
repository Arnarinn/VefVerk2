$(document).ready(function() {
	$("#searchbar").click(function(){
		var data = $("#searchbar").val();
		$.ajax({
			'url': 'http://apis.is/flight',
			'type': 'GET',
			'dataType': 'json',
			'data': {'laguage': 'is', 'type': 'departures'},
			'success': function(response) {
				$(".result").empty();
				console.log(response)
				Object.size = function(response) {
				    var size = 0, key;
				    for (key in response) {
				        if (response.hasOwnProperty(key)) size++;
				    }
				    return size;
				};
				for (var i = 0; i < Object.size(response.results); i++) {
					if (response.results[i].house == 0) {
						response.results[i].house = "";
					}
					console.log(response.results[i])
					$('.result').append("<br><span>" + response.results[i].date+"<br>");
					$('.result').append(response.results[i].flightNumber+"<br>");
					$('.result').append(response.results[i].to+"<br>");
					$('.result').append(response.results[i].plannedArrival+"<br>");
					$('.result').append(response.results[i].realArrival+"<br>");
					$('.result').append(response.results[i].status+"</span><br>");
				};
			}
		})
	});	
});