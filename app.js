var Youtube_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
	var query = {
		part: 'snippet',
		key: 'AIzaSyDV-hWlGqtJe9QnjQSlrFSgTqssSu0rre8',
		q: searchTerm
	}
$.getJSON(Youtube_URL, query, callback);
}

function displayYoutubeData(data){
	var resultElement = '';
	var lightboxes = '';
	if (data.items) {
	data.items.forEach(function(item){
		resultElement += '<p><a href="#lightbox ' + item.id.videoID + '">' + item.snippet.title + '</a></p>' + '<br>' +
		'<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' +
		'<img src=' + item.snippet.thumbnails.medium.url + '></a>';
		lightboxes += '<div id="lightbox ' + item.id.videoID + '" class="hidden">' + '<div class="lightbox-content">' +
		'<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
		item.id.videoId + '" frameborder="0" allowfullscreen></iframe></div></div>';
		
		});
	} else {
		resultElement += '<p>No results</p>';
	}
	$('.js-search-results').html(resultElement);
	$('.videoDisplay').html(lightboxes);
}

function watchVideo(){
	$('.js-search-results').on('click', 'p', function(event){
		$('#lightbox').removeClass('hidden');
	})
}

function watchSubmit() {
	$('.js-search-form').submit(function(e){
		e.preventDefault();
		var query = $(this).find('.js-query').val();
		getDataFromApi(query, displayYoutubeData);
	});
}

$(function(){
	watchSubmit();
});