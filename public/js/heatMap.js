$("#select-stock").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the stock name
    var inputStock = $("#stock-input").val().trim().toUpperCase()
    // Running the searchStocks function(passing in the symbol as an argument)
    searchStocks(inputStock);
    getOptions(inputStock);
    console.log(inputStock);
  });

  function searchStocks(inputStock) {
    //Yahoo Finance Api
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail" +
        "?region=US&lang=en&symbol=" + inputStock,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "56d4ee9cfbmsh3f02729662260f9p141ca2jsnffa954ca7211"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response.quoteData[inputStock]);

      var symbolName = $("<h1>").text(response.quoteData[inputStock].longName);
      var symbolPrice = $("<h2>").text(response.quoteData[inputStock].regularMarketPrice.raw);

      $("#stock-div").empty();
      $("#stock-div").append(symbolName, symbolPrice);

    });
  }
  //Options 
  function getOptions(inputStock) {
    //Yahoo Finance Api
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-options?symbol=" + inputStock +
        "&date=1581033600",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "56d4ee9cfbmsh3f02729662260f9p141ca2jsnffa954ca7211"
      }
    }
    //Sets the first box in the Table to the name of the Stock
    $("#stock-name").text(inputStock)
    $.ajax(settings).done(function (response) {
      var call = response.contracts['calls'];
      var optionsarray = Array.from(response.contracts['calls']);
      var optionsarrayP = Array.from(response.contracts['puts']);

      $("#calloptions").empty();
      $("#IV").empty();
      $("#IVC").empty();
      $("#putoptions").empty();
      $("#strike-price").empty();
      $("#strike-priceP").empty();

      for (var i = 0; i < optionsarray.length; i++) {
        var td = $("<tr>").attr("id", "HeatIndex" + i);
        var addTD = $("#calloptions").add(td);
        var addTD = $("#IV").add(td);
        var addTD = $("#IVC").add(td);
        var addTD = $("#putoptions").add(td);
        var addTD = $("#strike-price").add(td);
        var addTD = $("#strike-priceP").add(td);
        var CallOptions = $("<h2>").text(optionsarray[i]['lastPrice']['fmt']);
        var IVC = $("<h2>").text(optionsarray[i]['impliedVolatility']['fmt']);
        var StrikePrice = $("<h2>").text(optionsarray[i]['strike']['fmt']);
        $("#calloptions").append(CallOptions);
        $("#IVC").append(IVC);
        $("#strike-price").append(StrikePrice);
      }
      for (var i = 0; i < optionsarrayP.length; i++) {
        var td = $("<tr>").attr("id", "HeadIndex" + i);
        var addTD = $("#IV").add(td);
        var addTD = $("#putoptions").add(td);
        var addTD = $("#strike-priceP").add(td);
        console.log(optionsarrayP.length)
        var IV = $("<h2>").text(optionsarrayP[i]['impliedVolatility']['fmt']);
        console.log(optionsarrayP[i])
        var PutOptions = $("<h2>").text(optionsarrayP[i]['lastPrice']['raw']);
        var StrikePriceP = $("<h2>").text(optionsarrayP[i]['strike']['fmt']);
        $("#IV").append(IV);
        $("#putoptions").append(PutOptions);
        $("#strike-priceP").append(StrikePriceP);
      }
    });

    $.ajax(settings).done(function (response) {


      //Creates an array based of the list of option calls

      var optionsarray = Array.from(response.contracts['puts']);

      for (var i = 0; i < optionsarray.length; i++) {
        var iOld = i;
        if (i - 1 > 0) {
          iOld = i - 1
        } else {
          iOld = i
        }
        console.log(i)
        console.log(optionsarray[i]['openInterest']);
        var OI = (optionsarray[i]['openInterest']['fmt']);
        var OIold = (optionsarray[iOld]['openInterest']['fmt']);
        var NewArray = Array.from($("#putoptions"))
        console.log(NewArray)
        if (OI < OIold) {
          console.log("Works")

          NewArray[i].addClass("RedHeat")
        } else {

          NewArray[i].addClass("GreenHeat")
        }
      }

    });
  }