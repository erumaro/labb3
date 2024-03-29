$(document).foundation();

// Code by Tobias Årud

$(document).ready(function(){
    var user = "Erumaro87";
    function showData(){
        $("#loading").show();
        $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user="+ user +"&api_key=d7c4e66cb9d80c4c8dede52e9805d669&format=json&callback=?", function(data){
            var html = "";
            
            // Conditional handles two errors that will occur when adding user in input.
            // 1. If user doesn't exist JSON wont have data.toptracks inside and console will throw undefined. (Good test: random letters and numbers)
            // 2. User might exist, but haven't played any tracks yet (Good test: anders).
            
            if(data.toptracks !== undefined && data.toptracks.track.length !== 0){
                $.each(data.toptracks.track, function (i, item) {
                    html += "<ul class='row'><li class='large-1 columns'><span class='list-order'>" + item["@attr"].rank + "</span></li><li class='large-2 columns'><img src=" + item.image[2]["#text"] + " /></li><li class='large-4 columns'><a href=" + item.artist.url + ">" + item.artist.name + "</a> - <a href=" + item.url + ">" + item.name + "</a></li><li class='large-2 columns'><p>Played: " + item.playcount + " times</p></li><li class='large-3 columns'></li></ul><br>";
                });
            } else{
                if(data.toptracks === undefined){
                    alert("This user doesn't exist. Please try another name.");
                } else if(data.toptracks.track.length === 0){
                    alert("This user lacks content to show, default user added.");
                }
                user = "Erumaro87";
                $("#showUser").html(user);
                showData();
                $("#loading").toggle();
            }
            
            $("#chart").append(html);
            $("#loading").toggle();
        });   
    };
    
    $(document).on("click", "#userButton", function(e){
        if(document.getElementById("newUser").value !== ""){
        e.preventDefault();
        document.getElementById("chart").innerHTML = "<div id='loading'><h2>Loading content, please wait</h2><img src='img/ajax-loader.gif' /></div><br>";
        user = document.getElementById("newUser").value;
        $("#showUser").html(user);
        showData();
        } else{
            alert("Please write a valid username");
        }
    });
    
    $(document).on("click", "#resetButton", function(e){
        document.getElementById("chart").innerHTML = "<img id='loading' src='img/ajax-loader.gif' />";
        user = "Erumaro87";
        $("#showUser").html(user);
        showData();
    });
    
    $("#showUser").html(user);
    
    showData();
});