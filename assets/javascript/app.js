//GLOBAL Variables
let topics = [];
const queryBaseURL = "https://api.giphy.com/v1/gifs/search?";
const apiKey = "api_key=r3tgS87AKU51FhXnottIw31nW29GMrUv";
const query = "&q=";
const limit = "&limit=10";
let queryURL = queryBaseURL+apiKey+query;

$("#submit-button").on('click',function(e){

    //TO DO: DELETE WHEN HOOKED TO API / TESTING OFFLINE
    e.preventDefault();

    console.log("Clicked");

    if($("#add-topic").val() == null || $("#add-topic").val() == ""){
        //TO DO: THROW AN ALERT THAT INPUT IS EMPTY
        console.log("Fuck You");
    }else{ // User has text in input
        let newTopic = $("#add-topic").val();
        //Add topic to the array
        if(topics.includes(newTopic)){
            //TO DO: ADD ALERT HERE THAT THIS TOPIC IS ALREADY IN USE
            console.log("Nope Already There")
        }else{
            topics.push(newTopic);
            addTopicsFromArrayToUIContainer($("#category-container"));
        }
        

    
        logTopics(); // FOR TESTING ONLY

    }  
});

//Binds the click event to the category container since it exists at the time the dom is loaded
$("#category-container").on('click','.category-button',function(event){ 
    console.log("Clicked Category button");
    
    callGiphyWithCategory($(this).text());
});

function callGiphyWithCategory(category){
    $.ajax({
        url:queryURL+category+limit,
        method:"GET"
    
    }).then(function(response){
        console.log(response);
        parseResponse(response);

    });

    console.log(queryURL+category);
}

function parseResponse(response){
    $("#giphy-container").empty();
    for(var i = 0;i< response.data.length;i++){
        console.log(i);
        var image = $("<img>");
        image.attr("alt","Image "+ i);
        image.attr("src",response.data[i].images.fixed_height.url);
        $("#giphy-container").append(image);
    }
}
function addTopicsFromArrayToUIContainer($uiContainer){
    $uiContainer.empty();
    for(var i = 0;i<topics.length;i++){
        let $newButton = $('<button class="btn btn-primary mx-auto"></button>');
        $newButton.attr('id',topics[i]);
        $newButton.addClass("category-button");
        $newButton.text(topics[i]);
        $uiContainer.append($newButton);
    }
}
function logTopics(){
    for(var i = 0; i< topics.length;i++){
        console.log("Topic "+ i+" "+topics[i]);
    }
}

