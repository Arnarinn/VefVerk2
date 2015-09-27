$(document).ready(function() {
	//felur tómu töfluna
	$(".table").hide();
	$("#search").click(function(){
		var data = $("#search").val();
		//gáir hvor radio takkarnir eru settir
		if($("#arrivals").is(":checked"))
			var ArrivalOrDepart = "arrivals"
		else
			var ArrivalOrDepart = "departures"
		if ($("#is").is(":checked"))
			var language = "is"
		else
			var language = "en"
		//ajax til að sækja gögn
		$.ajax({
			'url': 'http://apis.is/flight',
			'type': 'GET',
			'dataType': 'json',
			'data': {'language': language, 'type': ArrivalOrDepart},
			'success': function(response) {
				//Tæmir töfluna áður en sótt eru ný gögn
				$(".returned").empty();
				$(".thead").empty();
				//Function fyrir stærð á objecti
				Object.size = function(response) {
				    var size = 0, key;
				    for (key in response) {
				        if (response.hasOwnProperty(key)) size++;
				    }
				    return size;
				}
				//Chékkar hvort valið tungumál sé enska eða íslenska
				if (language == "is") {
					var date = "Dagsetning";
					var flightnumber = "Flug Nr.";
					$("#search").prop("value", "Ná í gögn");
					$("#arrivalsOrDeprature").html("Veldu");
					$("#language").html("Tungumál");
					$(".arrivals").html("Lendingar");
					$(".depratures").html("Flugtök");
					if( ArrivalOrDepart == "arrivals"){
						var location = "Frá";
						var planedArrival = "Plönuð lending";
						var realArrival = "Alvöru lending";
					}
					else{
						var location = "Til";
						var planedArrival = "Planað flugtak";
						var realArrival = "Alvöru flugtak";
					}
				} //ensk variable
				else{
					var date = "Date";
					var flightnumber = "Flight Nr.";
					$("#search").prop("value", "Get data");
					$("#arrivalsOrDeprature").html("Choose");
					$("#language").html("Language");
					$(".arrivals").html("Arrivals");
					$(".depratures").html("Depratures");
					if( ArrivalOrDepart == "arrivals"){
						var location = "From";
						var planedArrival = "Planned arrival";
						var realArrival = "Real arrival";
					}
					else{
						var location = "To";
						var planedArrival = "Planned deprature";
						var realArrival = "Real departure";
					}
				}
				//sýnir töfluna aftur
				$(".table").show();
				//Setur upp töflu headerinn
				var thead = "<th width='180' class='theadSort'>";
				$('.thead').append(thead + date +"</th>"
					+ thead + flightnumber +"</th>"
					+ thead + location +"</th>"
					+ thead + planedArrival +"</th>"
					+ thead + realArrival +"</th>");
				//Loopa sem notar object stærðina til að fara í gegnum öll gögnin
				for (var i = 0; i < Object.size(response.results); i++) {
					//Stundum gefur þetta út tómt svo settið það sem unknown eða óvitað
					if (response.results[i].realArrival == "") {
						if (language == "is")
							response.results[i].realArrival = "Óvitað";
						else
							response.results[i].realArrival = "Unknown";
					}
					//setur upp töflu fyrir arrivals eða lendingar
					var tdtd = "</td><td>";
					if (ArrivalOrDepart == "arrivals") {
						$('.returned').append("<tr><td>" 
							+ response.results[i].date 
							+ tdtd + response.results[i].flightNumber 
							+ tdtd + response.results[i].from 
							+ tdtd + response.results[i].plannedArrival 
							+ tdtd +  response.results[i].realArrival 
							+ "</td></tr>");
					}
					//setur upp toflu fyrir depratures eða flugtök
					else{
						$('.returned').append("<tr><td>" + response.results[i].date 
							+ tdtd + response.results[i].flightNumber 
							+ tdtd + response.results[i].to
							+ tdtd + response.results[i].plannedArrival
							+ tdtd + response.results[i].realArrival 
							+ "</td></tr>");
					}
				}
			}
		})
	})
	$(".theadSort").click(function(){
		console.log("stuff");
	})
});