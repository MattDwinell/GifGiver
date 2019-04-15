$(document).ready(function () {
    //declaring initial variables and setting them equal to buttons. everything else can be on click.
    var topics = ["squirrels", "poop", "fish", "magic", "snake", "squid", "kangaroo"];
    renderer();

    // on click event handlers
    $(".submit").on("click", function () {
        var userSearch = $(".user-search").val().trim();
        topics.push(userSearch);
        renderer();
    })

    $(document).on("click", ".topics-buttons", gifGenerator);
    $(document).on("click", ".gif", startStop);

    function renderer() {
        $(".topics-holder").html("");
        for (var i = 0; i < topics.length; i++) {
            var buttonMaker = $("<button>").attr("class", "topics-buttons").text(topics[i]);
            buttonMaker.attr("data-name", topics[i]);
            $(".topics-holder").append(buttonMaker);
        }
    }



    function gifGenerator() {
        $(".gif-dump").html("");
        var gifNumber = $(".gif-number").val();
        var searchTopic = $(this).text().trim();
        if (!gifNumber) {
            gifNumber = 2;
        }
        if (searchTopic) {
            var queryURL = "https://api.giphy.com/v1/gifs/search? q=" + searchTopic + "&rating=g&apikey=nykJ4SpXw588S4B1fjOF8KYeZbl02QVR&limit=" + gifNumber;
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                for (var i = 0; i < gifNumber; i++) {
                    var gifDiv = $("<div>").css("display", "inline-block");
                    var rating = $("<p>").text("rating: G");
                    var gif = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
                    gif.attr("active", response.data[i].images.fixed_height.url);
                    gif.attr("still", response.data[i].images.fixed_height_still.url);
                    gif.attr("class", "gif");
                    gifDiv.append(rating, gif);
                    $(".gif-dump").append(gifDiv);
                }

            })
        }
    }
    function startStop() {
        var currentSRC = $(this).attr("src");
        var active = $(this).attr("active");
        var still = $(this).attr("still");
        console.log(currentSRC, active, still);
        if (currentSRC == still) {
            $(this).attr("src", active);
        } else {
            $(this).attr("src", still);
        }
    }
    // var searchUrl = $(this).attr("data-name");
    // var gifCount = $(numGifsRequested).val();
    // if (gifCount != 0) {
    //     for (var i = 0; i < gifCount; i++) {
    //         var queryURL = "https://api.giphy.com/v1/gifs/random?apikey=ZyUXN606XVdEZHZ5sk3RWjOKSzOOFOyk&tag=" + searchUrl;
    //         $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //         }).then(function (response) {
    //             console.log(searchUrl);
    //             console.log(response);
    //             var newGifDiv = $("<div>").attr("class", "gif-div");
    //             var newGif = $("<img>").attr("src", response.data.images.fixed_height_still.url);
    //             var newRating = $("<p>").text("rating: g");
    //             newGif.attr("active", response.data.images.fixed_height.url);
    //             newGif.attr("still", response.data.images.fixed_height_still.url);
    //             newGif.attr("class", "gif");
    //             newGifDiv.append(newRating, newGif);
    //             gifHolder.prepend(newGifDiv);
    //         })

    //         }
    //     }
    // }
    // function gifPlayer() {
    //     var currentSource = $(this).attr("src");
    //     var active = $(this).attr("active");
    //     var still = $(this).attr("still");
    //     console.log(currentSource, active, still);
    //     if (currentSource == active) {
    //         $(this).attr("src", still);
    //     } else {
    //         $(this).attr("src", active);
    //     }
    // }





















})