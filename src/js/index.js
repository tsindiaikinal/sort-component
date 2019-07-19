(function() {
  // VARIBLES
  let bigData = [];
  let displayData;
  let provider = [];
  let locationServ = [];
  let tableHead =
    '<tr id="table-header">' +
    "<th>" +
    '<select class="provider-name">' +
    provider +
    "</select>" +
    "</th>" +
    '<th id="brands">Brand</th>' +
    "<th>" +
    '<select class="location-name">' +
    locationServ +
    "</select>" +
    "</th>" +
    '<th id="cpu">CPU</th>' +
    '<th id="drives">Drive</th>' +
    '<th id="prices">Price</th>' +
    "</tr>";
  let select1;
  let select2;
  let selectTitle1 = "<option>Provider</option>";
  let selectTitle2 = "<option>Location</option>";
  /* ***************** VARIBLES end ********************** */
  /* NAVBAR */
  $("#gamburger").on("click", () => {
    $("#gamburger").toggleClass("gamburger-rotate");
    $(".navbar").css({
      width: "230px"
    });
    if($(".navbar").innerWidth() >= 230) {
      console.log("test 230px");
      $(".navbar__menu-container:hover .menu").css({
        position: "static",
        display: "",
        width: "auto"
      });
    }
    if ($(".navbar").innerWidth() >= 60) {
      // console.log($(".navbar").innerWidth());
      $(".navbar__menu").css({ width: "100%" });
      $(".navbar__control-title").toggle(300);
      $(".navbar__menu-arrow").toggle(300);
    }

    if ($("#gamburger").hasClass("gamburger-rotate") === false) {
      $(".navbar").css({
        width: "60px"
      });
    }
  });
  /* NAVBAR end */
  $(".navbar__menu").on("click", () => {
    $(".navbar__menu").toggleClass("active");
    if ($(".navbar").innerWidth() !== 60) {
      $(".menu").toggle("slow");
      // console.log("I am 60");
    }
  });

  $("#menu-table").on("click", () => {
    $("#menu-table").toggleClass("active");
    //
    $("#data-json")
      .html(tableHead + displayData)
      .toggle();
  });
  /* ******************************************* */
  /* RETRIEVING AND DISPLAYING JSON DATA */
  $.get("json/servers_catalog.json", function(data) {
    // console.log(locationServ);
    for (elems in data.data) {
      bigData.push(data.data[elems]);
      provider.push(data.data[elems].provider_name.toLowerCase());
      locationServ.push(data.data[elems].location.toLowerCase());
    }
    bigData.forEach(content => {
      displayData +=
        "<tr>" +
        "<td>" +
        content.provider_name +
        "</td>" +
        "<td>" +
        content.brand +
        "</td>" +
        "<td>" +
        content.location +
        "</td>" +
        "<td>" +
        content.cpu +
        "</td>" +
        "<td>" +
        content.drive_label +
        "</td>" +
        "<td>" +
        "$ " +
        content.price +
        "</td>" +
        "</tr>";
    });
  });
  const writeDataJson = () => {
    // $("#data-json").html(tableHead + displayData);
  };
  // $("#data-json").html(tableHead + displayData);
  // SORT DROPDOWN DATA
  provider.sort();
  locationServ.sort();
  console.log(provider);
  /* ********************** */
  function delRepeatElem(elem) {
    for (var q = 1, i = 1; q < elem.length; q++) {
      if (elem[q] !== elem[q - 1]) {
        elem[i++] = elem[q];
      }
    }
    elem.length = i;
    // console.log(elem);
    return elem;
  }

  delRepeatElem(provider).forEach(value => {
    select1 += "<option>" + value + "</option>";
  });
  $(".provider-name").html(selectTitle1 + select1);
  /* ******************************************** */
  delRepeatElem(locationServ).forEach(value => {
    select2 += "<option>" + value + "</option>";
  });
  $(".location-name").html(selectTitle2 + select2);
  // console.log(this);
  /* RETRIEVING AND DISPLAYING JSON DATA end */
  $("#table-header th").on("click", event => {
    // console.log(event);
    console.log(event.target.id);
    switch (event.target.id) {
      case "brands":
        bigData.sort(function(a, b) {
          let nameA = a.brand,
            nameB = b.brand;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        writeDataJson();

      case "cpu":
      case "drives":
      case "prices":
        console.log("I am child");
        console.log(bigData);
        break;

      default:
        console.log("I am not child");
        break;
    }
    console.log(bigData[0].provider_name);
  });
})();
