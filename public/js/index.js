console.log('loaded')
    $("#select-stock").on("click", function (event) {
      // Preventing the button from trying to submit the form
      event.preventDefault();
      // Storing the stock name
      var inputStock = $("#stock-input").val().trim().toUpperCase()
      // Running the searchStocks function(passing in the symbol as an argument)
      searchStocks(inputStock)
      // getOptions(inputStock);
      Newsfeed(inputStock)
      GetDetails(inputStock)
      console.log(inputStock);
    });

    function searchStocks(inputStock) {
      //Yahoo Finance Api
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail" + "?region=US&lang=en&symbol=" + inputStock,
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

    //Newsfeed
    function Newsfeed(inputStock) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-newsfeed?category=" + inputStock + "&region=US",
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "56d4ee9cfbmsh3f02729662260f9p141ca2jsnffa954ca7211"
        }
      }
      $.ajax(settings).done(function (response) {
        console.log(response);
        var news = Array.from(response.items["result"]);
        console.log(news)
        var newstitles = [];
        var newslinks = [];
        var newspublishers = [];
        var newspublishdate = [];
        for (var i = 0; i < 6; i++) {
          var CardTitle = $("#card-title");
          var newsTitle = news[i]['title']
          var newsLink = news[i]['link']
          var newsPublisher = news[i]['publisher']
          newstitles.push(newsTitle)
          newslinks.push(newsLink)
          newspublishers.push(newspublishers)
          FaviFinder(newsPublisher, newspublishers)
        }
        for (var i = 0; i < newstitles.length; i++) {
          $("#card-news-title" + i).append(newstitles[i]).text;
          console.log(newstitles[i])
        }
        for (var i = 0; i < newslinks.length; i++) {
          $("#card-news-link" + i).attr("href",newslinks[i]);
        }
        for (var i = 0; i < newspublishdate.length; i++) {
          $("#card-publish-date" + i).append(newspublishdate[i]);
        }
        function Favicon(Favicon) {
          for (var i = 0; i < newspublishers.length; i++) {
            $("#card-Logo" + i).attr("img", "src", Favicon);
            console.log(newspublishers)
          }
        }
      });
    }

    //Favicon Finder
    function FaviFinder(newsPublisher, newspublishers) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://faviconfinder.p.rapidapi.com/faviconurl/?url=https://www." + newsPublisher,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "faviconfinder.p.rapidapi.com",
          "x-rapidapi-key": "56d4ee9cfbmsh3f02729662260f9p141ca2jsnffa954ca7211"
        }
      }
      $.ajax(settings).done(function (response) {
        var Favicon = response.favicon_url
        newspublishers.push(Favicon)
      });
    }

    //Get-Details
    function GetDetails(inputStock) {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail?region=US&lang=en&symbol=" + inputStock,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "56d4ee9cfbmsh3f02729662260f9p141ca2jsnffa954ca7211"
        }
      }
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }