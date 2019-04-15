$(document).ready(function () {

    //creating the entire scaffolding for the html for practice. I'm aware it's more difficult/error prone and I won't do it on future projects.
    var buttonHolder = $("<div>").attr("class", "button-holder");
    var body = $("body");
    var gifHolder = $("<div>").attr("class", "gif-holder");
    body.append(gifHolder);
    var randomGifMockUp = ["assets/images/fluffy.jpg", "assets/images/fluffy.jpg", "assets/images/fluffy.jpg", "assets/images/fluffy.jpg", "assets/images/fluffy.jpg", "assets/images/fluffy.jpg", "assets/images/fluffy.jpg"]
    body.prepend(buttonHolder);
    var topics = ["squirrels", "poop", "fluffers", "slivers", "boopersnoots", "arghlewarghle", "kangaroo"];
    renderer();
    
    var clickForNewButton = $("<div>").attr("class", "new-button-maker").text("submit");
    $("body").append(clickForNewButton);
    var userTextForm = $("<input>").attr("class", "user-text-form");
    userTextForm.attr("placeholder", "new gif topic");
    $("body").append(userTextForm);
    var numGifsRequested = $("<input>").attr("class", "user-gif-limit");
    numGifsRequested.attr("placeholder", "number of gifs to return.");
    $("body").append(numGifsRequested);

    clickForNewButton.on("click", function () {
        event.preventDefault();
        var userTopic = userTextForm;
        userTopic.textContent = (userTopic.val().trim());
        topics.push(userTopic.val().trim());
        userTextForm.val("");
        buttonHolder.html("");
        renderer();
      
    })

    $(document).on("click", ".topic-button", gifGenerator);
    $(document).on("click",".gif", gifPlayer);
    

    function gifGenerator() {
        gifHolder.html("");
        var searchUrl = $(this).attr("data-name");
        var gifCount = $(numGifsRequested).val();
        if (gifCount != 0){
        for (var i = 0; i < gifCount; i++) {
            var queryURL = "https://api.giphy.com/v1/gifs/random?apikey=ZyUXN606XVdEZHZ5sk3RWjOKSzOOFOyk&tag=" +searchUrl;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(searchUrl);
                console.log(response);
                var newGifDiv = $("<div>").attr("class", "gif-div");
            var newGif = $("<img>").attr("src", response.data.images.fixed_height_still.url);
            var newRating = $("<p>").text("rating: g");
            newGif.attr("active", response.data.images.fixed_height.url);
            newGif.attr("still", response.data.images.fixed_height_still.url);
            newGif.attr("class", "gif");
            newGifDiv.append(newRating, newGif);
            gifHolder.prepend(newGifDiv);
            })
            
        }
    }
    }
    function gifPlayer(){
        var currentSource = $(this).attr("src");
        var active = $(this).attr("active");
        var still = $(this).attr("still");
        console.log(currentSource, active, still);
        if (currentSource == active){
            $(this).attr("src",still );
        } else {
            $(this).attr("src",active );
        }
    }

    function renderer(){ for (i = 0; i < topics.length; i++) {
        var buttonMaker = $("<btn>").attr("class", "topic-button").text(topics[i]);
        $(buttonMaker).attr("data-name", topics[i]);
        buttonHolder.append(buttonMaker);
        console.log(buttonMaker);
        console.log($(buttonMaker).attr("data-name"));
    }
}



















})