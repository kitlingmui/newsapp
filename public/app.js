// Click Events 
var mysavedarticle = []

// When on click Scrape new articles using ajax, add articles to db
$(document).on("click", "#scrape-btn", function() {
    $.ajax({
        type: "GET",
        url: "/scrape"
    })
    displaynews()
})

// When on click Saved Articles, grap all article from mongodb Saved Schema
$(document).on("click", "#saved-btn", function() {
    for (let i = 0; i < mysavedarticle.length; i++){
        $.ajax({
            type: "POST",
            url: "/savedarticle",
            data: { 
                     id: mysavedarticle[i].id,
                     title: mysavedarticle[i].title,
                     summary: mysavedarticle[i].summary,
                     url: mysavedarticle[i].url              
                    }
        })
        .then(function(data){
            console.log(data)
        })
        .catch(function(err){
            console.log(err)
        })
    }
    displaysavednews()
})

// When on click save article button on each of new, save that article to saved schema
$(document).on("click", "#save-article", function() {
    var thisId = $(this).attr("data-id")
  
    // Get selected article by id
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }) 
    .then(function(data) {
        mysavedarticle.push({id: data.id, title: data.title, summary: data.summary, url: data.url})
        console.log('get news')
        console.log(mysavedarticle)
    }) 
    .catch(function(err){
        console.log(err)
    })
})

// When on click delete article button on each of new, delete that article to saved schema
$(document).on("click", "#delete-article", function() {
    console.log('user click delete')
})




// display current grapped news
function displaynews() {
    $('#results').empty();
    $.getJSON("/read", function(data) {

        if (data.length > 0){
            // loop for each article
            for (let i = 0; i < data.length; i++) {
                var dis = '<div class="row">'
                dis = dis + '<div class="col s12">'
                dis = dis + '<div class="card blue darken-1">'
                dis = dis + '<div class="card-content white-text">'
                dis = dis + '<span class="card-title">' + data[i].id + '. ' + data[i].title  +'</span>' 
                dis = dis + '<button class="btn waves-effect waves-light" id="save-article" type="submit" name="action" data-id='+ data[i].id +'>Save Article</button>'
                dis = dis + '</div>'
                dis = dis + '<div class="card-action white">'
                dis = dis + '<p>'+ data[i].summary +'</p>'
                dis = dis + '<a href="'+ data[i].url +'">link to article</a>'                                
                dis = dis + '</div>'                              
                dis = dis + '</div>'                              
                dis = dis + '</div>'                              
                dis = dis + '</div>'    

                $('#results').append(dis);
            }
        }
        else{
            alert('No article find!')
        }

    })
}


// display my saved news
function displaysavednews() {
    $.getJSON("/readsaved", function(data) {

        if (data.length > 0){
            // loop for each article
            $('#savedresults').empty();
            for (var i = 0; i < data.length; i++) {
                var dis = '<div class="row">'
                dis = dis + '<div class="col s12">'
                dis = dis + '<div class="card blue darken-1">'
                dis = dis + '<div class="card-content white-text">'
                dis = dis + '<span class="card-title">'+ data[i].title + '</span>' 
                dis = dis + '<button class="btn waves-effect waves-light" id="delete-article" type="submit" name="action">Delete Article</button>'
                dis = dis + '</div>'
                dis = dis + '<div class="card-action white">'
                dis = dis + '<p>'+ data[i].summary +'</p>'
                dis = dis + '<a href="'+ data[i].url +'">link to article</a>'                                
                dis = dis + '</div>'                              
                dis = dis + '</div>'                              
                dis = dis + '</div>'                              
                dis = dis + '</div>'    

                $('#savedresults').append(dis);
            }
        }
        else{
            alert('No saved article find!')
        }
    })
}

