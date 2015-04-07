
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var NYT_KEY="3f53ddc9b61e040a08306ff599eca474:0:71763026";

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $greeting.text('So, you want to live at ' + address + '?');

    //GOOGLE MAPS
    var url = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + '';
    var img = "<img class='bgimg' src='" + url + "'>";
    $body.append(img);

    //NYTIMES
    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="
            + city + "&sort=newest&api-key=" + NYT_KEY;

    $.getJSON(URL, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main+'</a>' +
                '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('ERROR RETRIEVING DATA FROM NEW YORK TIMES');
    });

    //WIKIPEDIA

    //End of function, return
    return false;
};

$('#form-container').submit(loadData);
