(function() {
  // VARIBLES
  let bigData = [];
  let displayData;
  let provider = [];
  let locationServ = [];
  let upDown = true;
  let dataJsonTable = $("#data-json");
  let tableHead =
    '<tr id="table-header">' +
    "<th>" +
    '<select class="provider-name" id="provider">' +
    provider +
    "</select>" +
    "</th>" +
    '<th id="brands">Brand<i class="icon-sort-name"> ⇧</i></th>' +
    "<th>" +
    '<select class="location-name" id="location-serv">' +
    locationServ +
    "</select>" +
    "</th>" +
    '<th id="cpu">CPU<i class="icon-sort-name"> ⇧</i></th>' +
    '<th id="drives">Drive<i class="icon-sort-name"> ⇧</i></th>' +
    '<th id="prices">Price<i class="icon-sort-name"> ⇧</i></th>' +
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
    if ($(".navbar").innerWidth() >= 230) {
      console.log("test 230px");
      $(".navbar__menu-container:hover .menu").css({
        position: "static",
        display: "",
        width: "auto"
      });
    }
    if ($(".navbar").innerWidth() >= 60) {
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
  /* ******************************************* */
  /* RETRIEVING AND DISPLAYING JSON DATA */
  $.getJSON("json/servers_catalog.json", function(data) {
    // console.log(locationServ);
    $.each(data.data, elems => {
      bigData.push(data.data[elems]);
      provider.push(data.data[elems].provider_name.toLowerCase());
      locationServ.push(data.data[elems].location.toLowerCase());
    });
    // SORT DROPDOWN DATA
    provider.sort();
    locationServ.sort();
    /* ********************** */
  }).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });

  $("#menu-table").on("click", () => {
    $("#menu-table").toggleClass("active");
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
        content.price +
        "</td>" +
        "</tr>";
    });
    $("#data-json")
      .html(tableHead + displayData)
      .toggle();
    delRepeatElem(provider).forEach(value => {
      select1 += "<option>" + value + "</option>";
    });
    $(".provider-name").html(selectTitle1 + select1);
    /* ******************************************** */
    delRepeatElem(locationServ).forEach(value => {
      select2 += "<option>" + value + "</option>";
    });
    $(".location-name").html(selectTitle2 + select2);
    /* ********************************************** */
    // Heandler "click" on a table header
    $("#table-header th").on("click", event => {
      upDown = !upDown;
      console.log(event.target.id);
      switch (event.target.id) {
        case "provider":
          sortProvider();
          break;
        case "brands":
          sortBrand();
          break;
        case "location-serv":
          sortLocation();
          break;
        case "cpu":
          sortCPU();
          break;
        case "drives":
          sortDrive();
          break;
        case "prices":
          sortPrice();
          break;
        default:
          console.log("I do not know what you want.");
          break;
      }
    });
  });
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
  /* RETRIEVING AND DISPLAYING JSON DATA end */
  /* ********************************************* */
  /* ******** SORTING FUNTIONS ******** */
  const sortProvider = () => {
    let selectValue = $("#provider").val();
    if ($("#location-serv").val() !== "Location") {
      $("#location-serv").val($("#location-serv option:first-of-type").val());
    }
    let filterDataProvider;
    if (selectValue !== "Provider") {
      filterDataProvider = dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .filter(function() {
          let resultFilter = $(this).find("td:nth-of-type(1)");
          if (resultFilter.text().toLowerCase() === selectValue.toLowerCase()) {
            $(this).show();
            $(this, ":nth-of-type(odd)").css("background-color", "#d3d3d3");
          } else {
            $(this).hide();
          }
          return resultFilter;
        });
      $("#data-json")
        .find("tr:nth-of-type(n+2)")
        .replaceWith(filterDataProvider);
    }
  };
  const sortBrand = () => {
    if (upDown === false) {
      dataJsonTable.find("th:nth-of-type(2) i").css("transform", "rotate(0)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return $("td:nth-of-type(2)", omega)
            .text()
            .localeCompare($("td:nth-of-type(2)", alpha).text());
        })
        .appendTo(dataJsonTable);
    } else {
      dataJsonTable
        .find("th:nth-of-type(2) i")
        .css("transform", "rotate(180deg)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return $("td:nth-of-type(2)", alpha)
            .text()
            .localeCompare($("td:nth-of-type(2)", omega).text());
        })
        .appendTo(dataJsonTable);
    }
  };
  const sortLocation = () => {
    let selectValue = $("#location-serv").val();
    if ($("#provider").val() !== "Provider") {
      $("#provider").val($("#provider option:first-of-type").val());
    }
    let filterDataLocation;
    if (selectValue !== "Location") {
      filterDataLocation = dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .filter(function() {
          let resultFilter = $(this).find("td:nth-of-type(3)");
          if (resultFilter.text().toLowerCase() === selectValue.toLowerCase()) {
            $(this).show();
            $(this, ":nth-of-type(odd)").css("background-color", "#d3d3d3");
          } else {
            $(this).hide();
          }
          return resultFilter;
        });
      $("#data-json")
        .find("tr:nth-of-type(n+2)")
        .replaceWith(filterDataLocation);
    }
  };
  const sortCPU = () => {
    if (upDown === false) {
      dataJsonTable.find("th:nth-of-type(4) i").css("transform", "rotate(0)");
      dataJsonTable.find("th:nth-of-type(6) i").css("transform", "rotate(0)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return $(alpha)
            .find("td:nth-of-type(4)")
            .text() >
            $(omega)
              .find("td:nth-of-type(4)")
              .text()
            ? 1
            : -1;
        })
        .appendTo(dataJsonTable);
    } else {
      dataJsonTable
        .find("th:nth-of-type(4) i")
        .css("transform", "rotate(180deg)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return $(omega)
            .find("td:nth-of-type(4)")
            .text() >
            $(alpha)
              .find("td:nth-of-type(4)")
              .text()
            ? 1
            : -1;
        })
        .appendTo(dataJsonTable);
    }
  };
  const sortDrive = () => {
    if (upDown === false) {
      dataJsonTable.find("th:nth-of-type(5) i").css("transform", "rotate(0)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return $("td:nth-of-type(5)", omega)
            .text()
            .localeCompare($("td:nth-of-type(5)", alpha).text());
        })
        .appendTo(dataJsonTable);
    } else {
      dataJsonTable
        .find("th:nth-of-type(5) i")
        .css("transform", "rotate(180deg)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return $("td:nth-of-type(5)", alpha)
            .text()
            .localeCompare($("td:nth-of-type(5)", omega).text());
        })
        .appendTo(dataJsonTable);
    }
  };
  const sortPrice = () => {
    if (upDown === false) {
      dataJsonTable.find("th:nth-of-type(6) i").css("transform", "rotate(0)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return parseInt(
            $(alpha)
              .find("td:nth-of-type(6)")
              .text()
          ) >
            parseInt(
              $(omega)
                .find("td:nth-of-type(6)")
                .text()
            )
            ? 1
            : -1;
        })
        .appendTo(dataJsonTable);
    } else {
      dataJsonTable
        .find("th:nth-of-type(6) i")
        .css("transform", "rotate(180deg)");
      dataJsonTable
        .find("tr:nth-of-type(n+2)")
        .sort(function(alpha, omega) {
          return parseInt(
            $(omega)
              .find("td:nth-of-type(6)")
              .text()
          ) >
            parseInt(
              $(alpha)
                .find("td:nth-of-type(6)")
                .text()
            )
            ? 1
            : -1;
        })
        .appendTo(dataJsonTable);
    }
  };
})();
