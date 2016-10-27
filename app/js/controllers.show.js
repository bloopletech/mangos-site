controllers.show = function(key) {
  var _this = this;

  var book = _.find(store, function(book) {
    return book.key == key;
  });

  var pageUrls = [];

  function inflatePageUrls(pageUrlsText) {
    var paths = [];
    var parts = pageUrlsText.split("|");

    for(let part of parts) {
      if(part.includes("/")) {
        var elements = part.split("/");
        var name = elements[0];
        var count = parseInt(elements[1]);

        var nameElements = name.split(".");
        var last_base = nameElements[0];
        var last_ext = nameElements[1];

        paths.push(name);

        for(var i = 0; i < count; i++) {
          last_base = succ(last_base);
          paths.push(last_base + "." + last_ext);
        }
      }
      else {
        paths.push(part);
      }
    }

    return paths;
  }

  function pageUrl(index) {
    return book.url + "/" + pageUrls[index - 1];
  }

  function squeezePortraitImage() {
    var image = $("#image")[0];
    if(image.naturalWidth < image.naturalHeight) {
      $("#image").css("max-width", "1000px");
    }
    else {
      $("#image").css("max-width", "100%");
    }
  }

  function preloadImage(index) {
    var image = new Image();
    image.src = pageUrl(index);
  }

  function preloadImages() {
    _(book.pages).times(function(i) {
      preloadImage(i + 1);
    });
  }

  this.init = function() {
    console.log("starting show");

    pageUrls = inflatePageUrls(book.pageUrls);

    $("#image").attr("src", "img/blank.png");

    //var image = $("#image")[0];
    //image.onload = squeezePortraitImage;

    initPaginator();
    $("#view-show").show().addClass("current-view");
    $("title").text(book.title + " - Mangos");
    //setTimeout(preloadImages, 5000);
  }

  function initPaginator() {
    $("#page-back").click(function(e) {
      e.stopPropagation();
      utils.page(utils.page() - 1);
    });
    $("#page-back-10").click(function(e) {
      e.stopPropagation();
      utils.page(utils.page() - 10);
    });
    $("#page-next").click(function(e) {
      e.stopPropagation();
      utils.page(utils.page() + 1);
    });
    $("#page-next-10").click(function(e) {
      e.stopPropagation();
      utils.page(utils.page() + 10);
    });
    $("#page-home").click(function(e) {
      e.stopPropagation();
      if(lastControllerLocation != "") {
        location.hash = lastControllerLocation;
      }
      else {
        window.close();
      }
    });

    $(window).keydown(function(event) {
      if(event.keyCode == 39 || ((event.keyCode == 32 || event.keyCode == 13)
        && utils.scrollDistanceFromBottom() <= 0)) {
        event.preventDefault();
        utils.page(utils.page() + 1);
      }
      else if(event.keyCode == 8 || event.keyCode == 37) {
        event.preventDefault();
        utils.page(utils.page() - 1);
      }
    });
  }

  this.render = function() {
    window.scrollTo(0, 0);

    var index = utils.page();

    $("#image").attr('src', pageUrl(index));

    if((index + 1) <= book.pages) {
      preloadImage(index + 1);
    }
  }

  this.destroy = function() {
    console.log("destroying show");
    destroyPaginator();
    $("#view-show").hide().removeClass("current-view");
  }

  function destroyPaginator() {
    $(".paginator").unbind("click");
    $(window).unbind("keydown");
  }
}

