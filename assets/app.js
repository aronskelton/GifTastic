
var topics = ["Ren and stimpy", "Legends of the hidden temple", "Spice Girls", "Pokemon", "Nintendo", "Dragon Ball Z", "Nickelodean", "Furby", "Dunkaroos", "Power Rangers"];
var currentGif; var pausedGif; var animatedGif; var stillGif;


function createButtons(){
	$('#ninetiesButtons').empty();
	for(var i = 0; i < topics.length; i++){
		var showBtn = $('<button>').text(topics[i]).addClass('showBtn').attr({'data-name': topics[i]});
		$('#ninetiesButtons').append(showBtn);
	}


	$('.showBtn').on('click', function(){
		$('.display').empty();

		var thisNostalgia = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" + thisNostalgia + "&limit=10&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: giphyURL, 
            method: 'GET'})
        
        .done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

$('#addNostalgia').on('click', function(){
	var newNostalgia = $('#nostalgiaInput').val().trim();
	topics.push(newNostalgia);
	createButtons();
	return false;
});

createButtons();