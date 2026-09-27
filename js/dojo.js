(function () {

    var script = document.currentScript;
    var siteRoot = new URL("../", script.src);

    function fixSitePaths() {
        document.querySelectorAll("[data-site-path]").forEach(function (element) {

            var path = element.getAttribute("data-site-path");

            if (element.tagName.toLowerCase() === "img") {
                element.src = new URL(path, siteRoot).href;
            }
            else {
                element.href = new URL(path, siteRoot).href;
            }

        });
    }

    function imagePreload(){
        var preload = [
            '../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-home.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-characters.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-game-modes.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-how-to-play.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-items.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-music.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-notices.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/banners/head-stages.png'

            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/uncategorized.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/characters.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/game-modes.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/how-to-play.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/items.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/music.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/notices.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/stages.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/rss.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/playSSF2.png'
            
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/uncategorized-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/characters-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/game-modes-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/how-to-play-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/items-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/music-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/notices-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/stages-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/rss-lit.png'
            ,'../../../SSF2dojoV6/wp-content/themes/DojoTheme3.0/images/icons/playSSF2-lit.png'


        ];
        var images = [];
        for (i = 0; i < preload.length; i++) {
            //console.log('Preloading'+i)
            images[i] = new Image();
            images[i].src = preload[i];
        }
    }

    function setHeader() {
        var headerName = document.body.getAttribute("data-header");

        if (!headerName) {
            headerName = "home";
        }

        var header = document.getElementById("header");
        var header2 = document.getElementById("header2");

        if (!header || !header2) {
            return;
        }

        var imageURL = new URL(
            "wp-content/themes/DojoTheme3.0/images/banners/head-" +
            headerName +
            ".png",
            siteRoot
        ).href;

        header.style.background =
            "url('" + imageURL + "') no-repeat top center";
        header2.style.background =
            "url('" + imageURL + "') no-repeat top center";
    }

    function setupActiveCategory() {
        var category = document.body.getAttribute("data-category");
        if (!category) {
            return;
        }

        var button = document.getElementById(
            "categoryButton-" + category
        );

        if (button) {
            button.classList.add("activeMenu");
            var iconWrap = document.getElementById(
                "categoryIconWrap-" + category
            );

            if (iconWrap) {
                iconWrap.style.marginLeft = "13px";
            }
        }
    }

    function categoryMenuOut(menu) {
        var iconWrap = $("#categoryIconWrap-" + menu);
        var icon = $("#categoryIcon-" + menu);

        iconWrap.stop().animate({
            "margin-left": "13px"
        }, {
            duration: 100,
            easing: "linear"
        });

        icon.attr(
            "src",
            new URL(
                "wp-content/themes/DojoTheme3.0/images/icons/" +
                menu + "-lit.png",
                siteRoot
            ).href
        );
    }

    function categoryMenuIn(menu) {
        var button = $("#categoryButton-" + menu);

        if (!button.hasClass("clicked") &&
            !button.hasClass("activeMenu")) {

            $("#categoryIconWrap-" + menu).stop().animate({
                "margin-left": "5px"
            }, {
                duration: 100,
                easing: "linear"
            });

            $("#categoryIcon-" + menu).attr(
                "src",
                new URL(
                    "wp-content/themes/DojoTheme3.0/images/icons/" +
                    menu + ".png",
                    siteRoot
                ).href
            );

            $("#categoryText-" + menu).stop().css({
                "text-decoration": "none"
            });
        }
    }

    function setupCategories() {
        var categories = [
            "characters",
            "how-to-play",
            "game-modes",
            "stages",
            "items",
            "music",
            "notices",
            "rss",
            "playSSF2",
            "uncategorized"
        ];

        categories.forEach(function (category) {
            var button = $("#categoryButton-" + category);
            if (!button.length) {
                return;
            }
            if (!button.hasClass("activeMenu")) {
                button.on("mouseenter", function () {
                    categoryMenuOut(category);
                });
                button.on("mouseleave", function () {
                    categoryMenuIn(category);
                });
            }
        });
    }

    function showContent() {
        $("#content").animate({
            'margin-top': '0px',
            'opacity': '1'
        });
        setUpFadeStart("post-row");
        setUpFadeStart("post-mini");
    }

    function setUpFadeStart(fieldClass) {
        var count = 0;
        $.each($('.' + fieldClass), function () {
            count++;
            var curDomObj = $(this);
            window.setTimeout(function () {
                curDomObj.animate({
                    'opacity': '1'
                });
            },100*count);
        });
    }

    function hideContent() {

        $("#content").animate({
            "margin-top": "20px",
            "opacity": "0"
        });
    }

    function navigateTo(url) {
        hideContent();
        var category = null;

        if (url.indexOf("characters") >= 0) {
            category = "characters";
        }
        else if (url.indexOf("game-modes") >= 0) {
            category = "game-modes";
        }
        else if (url.indexOf("how-to-play") >= 0) {
            category = "how-to-play";
        }
        else if (url.indexOf("items") >= 0) {
            category = "items";
        }
        else if (url.indexOf("music") >= 0) {
            category = "music";
        }
        else if (url.indexOf("notices") >= 0) {
            category = "notices";
        }
        else if (url.indexOf("stages") >= 0) {
            category = "stages";
        }

        if (category) {
            $(".vectorCategoryBox").removeClass("clicked");
            $("#categoryButton-" + category).addClass("clicked");
            categoryMenuOut(category);
        }

        window.setTimeout(function () {window.location = url;}, 500);
    }

    function setupLinks() {
        $(document).on("click", "a", function (event) {
            var href = $(this).prop("href");

            if (!href ||
                href.indexOf(window.location.origin) !== 0) {
                return;
            }

            event.preventDefault();
            navigateTo(href);
        });
    }

    function magicStuff() {
        console.log("MAGHGGGGIIIICC");
        console.log($(".wrap"));

        $("body").transition({
            rotate: "+=360deg"
        }, 1000);
    }

    function setupSecretButton() {
        $(document).on("click", "#secret", function (event) {
            event.preventDefault();
            magicStuff();
        });
    }

    function adjustSize() {
        var tallest = 0;
        var tallSources = [
            $(window).height(),
            $("#sidebar").height() + 125,
            $("#content-overflow").height() + 150
        ];
        for (var i = 0; i < tallSources.length; i++) {
            if (tallSources[i] >= tallest) {
                tallest = tallSources[i];
            }
        }
        $("body").css("height", tallest);
    }

    function setupSearch() {
        var search = $("#quickSearch");
        if (!search.length || !$.fn.autocomplete) {
            return;
        }

        search.autocomplete({
            minLength: 2,
            source: function (request, response) {
                $.getJSON(
                    "http://ssfdojo.mcleodgaming.com/",
                    {
                        s: request.term
                    },
                    response
                );
            },

            focus: function (event, ui) {
                return false;
            },

            select: function (event, ui) {
                navigateTo(ui.item.value);
                return false;
            },

            search: function () {
                $("#quickSearchIcon").removeClass("hidden");
                $("#quickSearch").css("background",
                    "rgba(0,0,0,0.5) url(" +
                    new URL(
                        "wp-content/themes/DojoTheme3.0/images/ajax-loader.gif",
                        siteRoot
                    ).href +
                    ") right no-repeat"
                );
            },

            response: function () {
                $("#quickSearchIcon").addClass("hidden");
                $("#quickSearch").css(
                    "background",
                    "rgba(0,0,0,0.5)"
                );
            }
        });
    }

    function setupJakeAnimation() {
        window.setInterval(function () {

            var jake = $("#jakesiegers");
            if (!jake.length) {
                return;
            }

            var color = jake.css("color");

            if (color === "rgb(255, 0, 0)") {
                jake.transition({
                    color: "rgb(98, 78, 255)"
                }, 500);
            }
            else if (color === "rgb(98, 78, 255)") {
                jake.transition({
                    color: "rgb(28, 147, 0)"
                }, 500);
            }
            else if (color === "rgb(28, 147, 0)") {
                jake.transition({
                    color: "rgb(255, 0, 0)"
                }, 500);
            }

        }, 2000);
    }



    imagePreload()

    fixSitePaths();

    setHeader();
    setupActiveCategory();

    setupCategories();
    setupLinks();
    setupSecretButton();
    setupSearch();
    setupJakeAnimation();

    showContent();
    adjustSize();

    $(window).on("resize", function () {
        adjustSize();
    });

})();