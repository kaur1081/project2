/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/rovers",
      type: "GET"
    });
  },

  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);



//Default Picture
var mySpaceImg = $('<img alt="image">').attr('src', 'https://apod.nasa.gov/apod/image/1901/sombrero_spitzer_1080.jpg');

$('#myPictureArea').append(mySpaceImg);


// Pic of the Day Data
$('#apod_search_btn').on("click", function() {
  var date = $("#apod_search").val();
  console.log('date', date);
  var queryURL = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=Yg0nubAuazdBXPOMSsk7GcCa4wjJjAIaYVSBjB78";
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(res) {
    console.log('SUCCESS - Loaded daily image', res);
    $("#myPictureArea").html('<img src="' + res.url + '" alt="daily image" />');
    $("#apod_title").html("<h2>" + res.title + "</h2>");
    $("#apod_date").html("<h4>Picture of the day for: " + res.date + "</h4>");
    $("#apod_expl").html("<p>" + res.explanation + "</p>");
  })
    .error(function(err) {
      console.error("ERR - Failed to load Daily Image", err);
    });
});

// console.log("$('#apod_search_btn')", $('#apod_search_btn'));