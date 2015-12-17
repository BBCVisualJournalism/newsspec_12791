define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, ShareTools) {

    var $shareToolsHolder;
    var shareTools;

    var init = function () {
        $shareToolsHolder = news.$('.shareToolsHolder');
        shareTools = null;

        news.pubsub.on('display-share-tools', displayShareTools);
    };

    var displayShareTools = function (cityName, twinTown) {
        if (shareTools === null) {
            var cityNameNoSpaces = cityName.replace(' ', '');
            if (twinTown) {
                var twinTownCityCountryArray = twinTown.name.split(', ');
                var twinTownCityNoSpaces = twinTownCityCountryArray[0].replace(' ', '');
                var twinTownCountry = twinTownCityCountryArray[1];
                var twinTownString = twinTownCityNoSpaces + ', ' + twinTownCountry;
                createShareTools(cityNameNoSpaces, twinTownString);
            } else {
                createShareTools(cityNameNoSpaces);
            }
        } else {
            //sharetools has already been created
            //destroy and try again
            destroyShareTools();
            displayShareTools(cityName, twinTown);
        }
    };

    var createShareTools = function (userCity, twinTown) {
        var message;
        if (twinTown) {
            message = $shareToolsHolder.attr('data-share-message')
                .replace('{{cityName}}', userCity)
                .replace('{{twinTownName}}', twinTown);
        } else {
            message = $shareToolsHolder.attr('data-share-message-notwin')
                .replace('{{cityName}}', userCity);
        }
        var shareToolsOptions = {
            'header': 'Share',
            'message': message,
            'storyPageUrl': 'http://bit.ly/1TPWnqn',
            'template': 'dropdown'
        };
        shareTools = new ShareTools($shareToolsHolder, shareToolsOptions, 'ns12791');
    };

    var destroyShareTools = function () {
        shareTools._destroy();
        $shareToolsHolder.empty();
        shareTools = null;
    };

    var publicApi = {
        init: init
    };

    return publicApi;
})