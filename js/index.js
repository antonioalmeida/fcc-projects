$(document).ready(function() {
    $("#search-button").click(function() {
        // Get input value and remove double whitespace
        var searchQuery = $("#search-input").val().replace(/\s\s+/g, '\s');

        if(searchQuery != undefined) {
            console.log("I'm in");
            getSearchResults(searchQuery);
        }
    })

    var getSearchResults = function(query) {
        console.log("I'm actually inside");
        var callURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=&profile=fuzzy&search=" + query + "&callback=?";

        $.getJSON(callURL, showData(data), callbackError);
    }

    var showData = function(data) {
        
    }

})
