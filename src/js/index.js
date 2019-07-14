(function() {
  console.log("test");
  $("#gamburger").on("click", function() {
    $("#gamburger").toggleClass("gamburger-rotate");
    //   console.log($("#gamburger").hasClass("gamburger-rotate"));
    $(".navbar").css({
      width: "230px"
    });
    $(".navbar__control-title").show(1000);
    $(".icon-down-open-big").show(100);

    if ($("#gamburger").hasClass("gamburger-rotate") === false) {
      $(".navbar").css({
        width: "60px"
      });
      $(".navbar__control-title").hide(200);
      $(".icon-down-open-big").hide();
    }
    //   console.log("rotate");
  });
  $.get("json/servers_catalog.json", data => {
    let displayData;
    let tableHead =
      "<tr>" +
      "<th>Provider</th>" +
      "<th>Brand</th>" +
      '<th>Location</th>' +
      "<th>CPU</th>" +
      "<th>Drive</th>" +
      "<th>Price</th>" +
      "</tr>";
    for (elem in data.data) {
      // console.log(data.data[elem]);
      //  console.log(data[elem]);
      displayData +=
        "<tr>" +
        "<td>" +
        data.data[elem].provider_name +
        "</td>" +
        "<td>" +
        data.data[elem].brand +
        "</td>" +
        "<td>" +
        data.data[elem].location +
        "</td>" +
        "<td>" +
        data.data[elem].cpu +
        "</td>" +
        "<td>" +
        data.data[elem].drive_label +
        "</td>" +
        "<td>" +
        "$ " +
        data.data[elem].price +
        "</td>" +
        "</tr>";
      // + "<tr>" + "</tr>";
    }
    $("#data-json").html(tableHead + displayData);
  });
})();
