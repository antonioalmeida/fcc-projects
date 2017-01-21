$(document).ready(function() {
    $("#search-button").click(function() {
        // Get input value and remove double whitespace
        var searchQuery = $("#search-input").val().replace(/\s\s+/g, '\s');

        if(searchQuery != undefined) {
            getSearchResults(searchQuery);
            $("#search-items").empty();
        }
    })

    var getSearchResults = function(query) {
        console.log("I'm actually inside");
        var callURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=&profile=fuzzy&search=" + query + "&callback=?";

        $.getJSON(callURL, function(data) {
            console.log(data);
            $("#search-title").html("<small>Search results for</small> " + data[0]);

            var size = data[1].length;
            var toAdd = "";

            for(var i = 0; i < size; i++) {
                toAdd+= "<h4>" + data[1][i] + "</h4>";
                toAdd+= "<p>" + data[2][i] + "</p>";
                toAdd+= "<a href=\"" + data[3][i] +"\"><button class=\"btn btn-info\">Go!</a></button><br><br>";
            }

            $("#search-items").append(toAdd);
        });
    }

})
