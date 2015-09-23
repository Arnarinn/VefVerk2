$(document).ready(function() {
	$("#searchbar").on("input",function(){
		var data = $("#searchbar").val();
		$.ajax({
			'url': 'http://apis.is/address',
			'type': 'GET',
			'dataType': 'json',
			'data': {'address': data},
			'success': function(response) {
				$(".result").empty();
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
					$('.result').append("<br><span>" + response.results[i].street+" ");
					$('.result').append(response.results[i].house+"<br>");
					$('.result').append(response.results[i].city+"<br>Póstnúmer:");
					$('.result').append(response.results[i].zip+"<br>");
					$('.result').append(response.results[i].apartment+"<br>");
					$('.result').append(response.results[i].letter+"</span>");
				};
			}
		})
	});	
});