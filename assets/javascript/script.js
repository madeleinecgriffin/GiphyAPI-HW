
$( document ).ready(function() {

	//giphy API
	var APIKey = "tLR5a1KoLHQT6lcC95Wsi62UaPesVSiJ";

	// Here we are building the URL we need to query the database
	var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + 
	"q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;
	
	//list of starting buttons
	var startList = ["goat", "cat", "hamster", "dog", "frog"];
	//storage vairable when making a button
	var storeButton;
	//current count of displayed buttons
	var countButton = 0;
	//storage variable for button name
	var storeInput;
	//variable for pulling id when button is clicked
	var id;

	//function to make a button for a new category
	function makeButton() {
		storeButton = $("<button>");
		storeButton.addClass("gif-button");
		storeButton.attr("id", storeInput);
		storeButton.text(storeInput);
		$("#hold-buttons").append(storeButton);
	}

	//function for getting list of 10 gifs from giphy
	function getGifs() {
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + id +
		"&api_key=" + APIKey + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			//stores API response object in a variable
			var results = response.data;
			console.log(results);

			//cyles through this data for all gifs
			for (var i = 0; i < results.length; i++) {
				var rating = results[i].rating;

			}
			
		})
	}

	//make buttons for categories upon loading page
	for (var i = 0; i < startList.length; i++) {
		countButton++;
		storeInput = startList[i];
		makeButton();
	}

	//add new button if the user types input and clicks "Add Category"
	$("#add-gif").on("click", function () {
		countButton++;
		storeInput = $("#gif-input").val().trim();
		makeButton();
	})

	//execute if a button for gif category is clicked
	$(".gif-button").on("click", function () {

		//stores id of button clicked
		id = $(this).attr("id");

		//runs function to use API to pull 10 gifs
		getGifs();

	})

})