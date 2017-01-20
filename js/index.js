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
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Portugal&namespace=&profile=fuzzy',
            /*
            action: 'opensearch',
            format: 'json',
            search: query,
            namespace: '0',
            profile: 'fuzzy',
            */
            headers: { 'Api-User-Agent': 'wikipedia-viewer (https://antonioalmedia.github.io/wikipedia-viewer/; theantonioalmeida@gmail.com) made for FreeCodeCamp' },
            success: function(data) {
                    console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

    }
})
