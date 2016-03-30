$(document).foundation();

// Code by Tobias Årud
$(document).ready(function(){
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=Erumaro87&api_key=d7c4e66cb9d80c4c8dede52e9805d669&format=json&callback=?", function(json){
        var html = "";  
        
        var backgroundnewURL = json.toptracks.track[0].image[3]["#text"];
        
        $.each(json.toptracks.track, function(i, item) {  
            /*
            html += "<p><a href=" + item.url + " target='_blank'>" + item.name + " - " + "Play count : " +item.playcount + "</a></p>";
            */
            html += "<ul class='row'><li class='large-1 columns'><span class='list-order'>" + item["@attr"].rank + "</span></li><li class='large-2 columns'><img src="+ item.image[2]["#text"] +" /></li><li class='large-4 columns'><a href="+ item.artist.url +">"+ item.artist.name +"</a> - <a href="+ item.url +">"+ item.name +"</a></li><li class='large-4 columns'>" + item.playcount + "</li><li class='large-1 columns'><span class='list-order'>" + item.streamable["#text"] + "</span></li></ul><br>";
        });
        /*
        $("body").css({
            "background-image": "url('"+ backgroundnewURL +"')"
        });
        */
        $("#chart").append(html);
    });
});