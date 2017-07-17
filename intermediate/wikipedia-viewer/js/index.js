$(document).ready(function() {
    $("#search-form").submit(function() {
        event.preventDefault();
        // Get input value and remove double whitespace
        var searchQuery = $("#search-input").val().replace(/\s\s+/g, '');

        if(searchQuery != undefined)
            getSearchResults(searchQuery);
    })

    var getSearchResults = function(query) {
        $("#search-items").empty();
        console.log("I'm actually inside");
        var callURL = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=&profile=fuzzy&search=" + query + "&callback=?";

        $.getJSON(callURL, function(data) {
            console.log(data);
            $("#search-title").html("<small>Search results for</small> " + data[0]);

            var size = data[1].length;
            var toAdd = "";

            if(size == 0) {
            toAdd = "<h4>No results were found for <i>" + data[0] + "</i>.</h4>";
                $("#search-items").append(toAdd);
                return;
            }

            for(var i = 0; i < size; i++) {

                var description = data[2][i];
                if(description.length == 0)
                    description = "<i>No description provided</i>";

                toAdd+= "<h4>" + data[1][i] + "</h4>";
                toAdd+= "<p>" + description + "</p>";
                toAdd+= "<a href=\"" + data[3][i] +"\"><button class=\"btn btn-info\">Go!</button></a><br><br>";
            }

            $("#search-items").append(toAdd);
        });
    }

})
