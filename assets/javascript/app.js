$(document).ready(function () {
    //declaring initial variables and setting them equal to buttons. everything else can be on click.
    var topics = ["squirrels", "poop", "fish", "magic", "snake", "squid", "kangaroo"];
    //running initial functions to populate buttons/saved gifs.
    renderer();
    populateFavorites();
    // on click event handlers for clicking the submit button, on any topic button, or on any generated gif:
    $(".submit").on("click", function () {
        var userSearch = $(".user-search").val().trim();
        topics.push(userSearch);
        renderer();
    })

    $(document).on("click", ".topics-buttons", gifGenerator);
    $(document).on("click", ".gif", startStop);

    //creating the buttons by looping through the topics array. the buttons will be re-created every time the user hits submit.
    function renderer() {
        $(".topics-holder").html("");
        for (var i = 0; i < topics.length; i++) {
            var buttonMaker = $("<button>").attr("class", "topics-buttons").text(topics[i]);
            buttonMaker.attr("data-name", topics[i]);
            $(".topics-holder").append(buttonMaker);
        }
    }


    //function for generating gifs. I will walk through what I'm doing here:
    function gifGenerator() {

        //first I clear any current gifs on the screen.
        $(".gif-dump").html("");

        // this pulls the users input from their search topic and number of gifs, and selects a random page between 0 and 49 to access on the api data.
        var gifNumber = $(".gif-number").val();
        var searchTopic = $(this).text().trim();
        var offset = Math.floor(Math.random() * 50);

        //in case the user does not specify the number of gifs to retrieve, the program will default to two. this avoids a search with a a limit of 0.
        if (!gifNumber) {
            gifNumber = 2;
        }

        //this check is to verify that there is a text value inside the button clicked on, to prevent someone adding buttons consisting of a single space.
        if (searchTopic) {

            //setting up the ajax call. query url takes into account the search topic, my api key, a random page, a number of gifs to retrieve, and I specifically set the rating of those gifs to be g to avoid anything remotely inappropriate. 
            var queryURL = "https://api.giphy.com/v1/gifs/search? q=" + searchTopic + "&rating=g&apikey=nykJ4SpXw588S4B1fjOF8KYeZbl02QVR&limit=" + gifNumber + "&offset=" + offset;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                //looping through the api data to put the gifs as still images onto the screen with their rating above them. by assigning the active, still, and src attributes I can easily change them on click.
                for (var i = 0; i < gifNumber; i++) {
                    var favButton = $("<button>").attr("active", response.data[i].images.fixed_height.url).text("add this gif to favorites");
                    favButton.attr("still", response.data[i].images.fixed_height_still.url);
                    favButton.attr("class", "fav-button");
                    var gifDiv = $("<div>").css("display", "inline-block").attr("class", "gif-div");
                    var title = $("<p>").text("title: " + response.data[i].title);
                    var rating = $("<p>").text("rating: G");
                    var gif = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
                    gif.attr("active", response.data[i].images.fixed_height.url);
                    gif.attr("still", response.data[i].images.fixed_height_still.url);
                    gif.attr("class", "gif");
                    gifDiv.append(rating, title, favButton, gif);
                    $(".gif-dump").append(gifDiv);
                }
                $('.spacer').css("display", "block")

            })
        }
    }

    //this simply changes the url to a still picture if it's currently a gif, or vice versa. 
    function startStop() {
        var currentSRC = $(this).attr("src");
        var active = $(this).attr("active");
        var still = $(this).attr("still");
        if (currentSRC == still) {
            $(this).attr("src", active);
        } else {
            $(this).attr("src", still);
        }
    }



    //section for local storage and saving favorites//

    //on click handler for when a user clicks a button to favorite a gif
    $(document).on("click", ".fav-button", newFavorite);

    //on click handler when user hits the clear favorites button
    $('.clear').on("click", function(){
        localStorage.clear();
       $('.favorites').html(" ");

    })

  //the new favorite function first checks to see if there's anything in local storage. if there is, it pulls it, 
  // splits it into an array to iterate through, and then creates the img elements with the sources from those arrays.
  //I could not get the JSON.stringify and JSON.parse to work properly for some reason, so instead I used the js methods to convert the arrays to strings and back again.
    function newFavorite() {
        $('.favorites').html(" ");
        if (localStorage.getItem("stillURLS")) {
            var favGifStillString = localStorage.getItem('stillURLS');
            var favGifActiveString = localStorage.getItem('activeURLS');
           var favGifStillArray = favGifStillString.split(" ");
           var favGifActiveArray = favGifActiveString.split(" ");
            console.log(favGifActiveArray, favGifStillArray);
    
        } else {
            var favGifStillArray = [];
            var favGifActiveArray = [];
            console.log(favGifActiveArray, favGifStillArray);
        }

        $(this).css("display", "none");
        favGifStillArray.push($(this).attr("still"));
        favGifActiveArray.push($(this).attr("active"));
        for (var i=0; i<favGifStillArray.length; i++){
            console.log(favGifStillArray[i])
            var gif = $("<img>").attr("src", favGifStillArray[i]);
            gif.attr("active", favGifActiveArray[i]);
            gif.attr("still", favGifStillArray[i]);
            gif.attr("class", "gif");
            $(".favorites").append(gif);
        }

        //after rendering the favorite gifs, we want to save their src urls in case of a reload.
        localStorage.setItem("activeURLS", favGifActiveArray.join(' '));
        localStorage.setItem("stillURLS", favGifStillArray.join(' '));
    }

    //this is almost identical to newfavorite except without pushing the urls into the arrays. I couldn't think of a way to DRY up the code properly, but I'm sure there is one.
function populateFavorites (){
    if (localStorage.getItem("stillURLS")) {
        var favGifStillString = localStorage.getItem('stillURLS');
        var favGifActiveString = localStorage.getItem('activeURLS');
       var favGifStillArray = favGifStillString.split(" ");
       var favGifActiveArray = favGifActiveString.split(" ");
       console.log(favGifStillString, favGifActiveString);
        console.log(favGifActiveArray, favGifStillArray);

    } else {
        var favGifStillArray = [];
        var favGifActiveArray = [];
        console.log(favGifActiveArray, favGifStillArray);
    }
    for (var i=0; i<favGifStillArray.length; i++){
        console.log(favGifStillArray[i])
        var gif = $("<img>").attr("src", favGifStillArray[i]);
        gif.attr("active", favGifActiveArray[i]);
        gif.attr("still", favGifStillArray[i]);
        gif.attr("class", "gif");
        $(".favorites").append(gif);
    }
    localStorage.setItem("activeURLS", favGifActiveArray.join(' '));
    localStorage.setItem("stillURLS", favGifStillArray.join(' '));
}

})