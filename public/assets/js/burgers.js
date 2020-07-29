$(document).ready(function () {
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger_input").val().trim(),
      devoured: 0,
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("New burger created!");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".eat_burger").on("click", function (event) {
    var id = $(this).data("id");

    var newDevourState = {
      devoured: true,
    };

    // Send the PUT request.
    $.ajax(`/burgers/${id}`, {
      type: "PUT",
      data: newDevourState,
    }).then(function () {
      console.log("Burger devoured!");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-burger").on("click", function (event) {
    let id = $(this).data("id");

    // Send the DELETE request.
    $.ajax(`/burgers/${id}`, {
      type: "DELETE",
    }).then(function () {
      console.log("Deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
