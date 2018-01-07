
$( document ).ready(function() {

	//giphy API
	var APIKey = "tLR5a1KoLHQT6lcC95Wsi62UaPesVSiJ";
	
	//list of starting buttons
	var topics = ["goat", "cat", "hamster", "dog", "frog"];

	//storage vairable when making a button
	var storeButton;
	
	//storage variable for button name
	var storeInput;
	//variable for pulling id when button is clicked
	var dataName;

	//storage variables for making gif divs and images
	var rating;
	var storeRating;
	var storePic;
	var storeGif;
	var staticSrc;
	var animateSrc;
	var currentState;

	//function to make a button for a new category
	function makeButton() {
		for (var i = 0; i < topics.length; i++) {
			storeInput = topics[i];
			storeButton = $("<button>");
			storeButton.addClass("gif-button");
			storeButton.attr("data-name", storeInput);
			storeButton.text(storeInput);
			$("#hold-buttons").append(storeButton);
		}
	}

	//function for getting list of 10 gifs from giphy
	function getGifs() {

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dataName +
		"&api_key=" + APIKey + "&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {

			//stores API response object in a variable
			var results = response.data;
			console.log(results);
			console.log(queryURL);

			//cyles through this data for all gifs
			for (var i = 0; i < results.length; i++) {
				
				//makes a div to store individual gifs and ratings
				storeGif = $("<div>");
				storeGif.addClass("gif-div");
				storeGif.attr("gif-state", "still");
				storeGif.attr("data-name", "gif"+i);

				//creates rating <p> element and assigns properties and adds to div
				rating = results[i].rating;
				storeRating = $("<p>");
				storeRating.addClass("gif-rating");
				storeRating.text("Rating: " + rating);
				storeGif.append(storeRating);

				//creates gif <img> element and assigns properties
				staticSrc = results[i].images.fixed_height_still.url;
				animateSrc = results[i].images.fixed_height.url;
				storePic = $("<img>");
				storePic.addClass("gif-image");
				storePic.attr("src", staticSrc);
				storePic.attr("data-still", staticSrc);
				storePic.attr("data-animate", animateSrc);
				storeGif.append(storePic);
				
				//adds all this to the box that holds gifs
				$("#hold-gifs").append(storeGif);
			}
			
		})
		

	}

	makeButton();

	//add new button if the user types input and clicks "Add Category"
	$("#add-gif").on("click", function() {
		$("#hold-buttons").html("");
		storeInput = $("#gif-input").val().trim();
		topics.push(storeInput);
		console.log(topics);
		makeButton();
		$("#gif-input").val(null);
	})

	//execute if a button for gif category is clicked
	$(".gif-button").on("click", function(event) {

		//clears gif holder box of previous gifs
		$("#hold-gifs").html("");

		//stores id of button clicked
		dataName = $(this).attr("data-name");
		console.log(dataName);

		getGifs();
	})

	$(".gif-image").on("click", function(event) {

		currentState = $(this).attr("gif-state");
		if (currentState == "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("gif-state", "animate");
		}
		else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("gif-state", "still");
		}
	})

})