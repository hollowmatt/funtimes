
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
    var NYT_URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="
            + city + "&sort=newest&api-key=" + NYT_KEY;

    $.getJSON(NYT_URL, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + city);
        var articles = data.response.docs;
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
    var WIKI_URL = "http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search="
                 + city + "&format=json&callback=wikiCallback";

    $.ajax({
        url: WIKI_URL,
        dataType: "jsonp"
    }).success(function(data){
        var articles = data[1];
        console.log(articles);
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $wikiElem.append('<li class="article">' +
                    '<a href="http://en.wikipedia.org/wiki/' + article + '">' + article +'</a>');
        }
    }).error(function(e) {
        $wikiElem.append("Error retrieving Wikipedia Information");
    });

    //End of function, return
    return false;
};

$('#form-container').submit(loadData);
