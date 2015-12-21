define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller'], function (news, ShareTools) {

    var $shareToolsHolder;
    var shareTools;

    var init = function () {
        $shareToolsHolder = news.$('.shareToolsHolder');
        shareTools = null;

        news.pubsub.on('display-share-tools', displayShareTools);
    };

    var displayShareTools = function (userCity, twinTown) {
        if (shareTools === null) {
            var userCityHashtag = makeCityHashtag(getCityFromString(userCity));
            var userCountry = getCountryFromString(userCity);
            var userCityString = userCityHashtag + ', ' + userCountry;
            if (twinTown) {
                var twinTownCityHashtag = makeCityHashtag(getCityFromString(twinTown.name));
                var twinTownCountry = getCountryFromString(twinTown.name);
                var twinTownString = twinTownCityHashtag + ', ' + twinTownCountry;
                createShareTools(userCityString, twinTownString);
            } else {
                createShareTools(userCityString);
            }
        } else {
            //sharetools has already been created
            //destroy and try again
            destroyShareTools();
            displayShareTools(userCity, twinTown);
        }
    };

    var getCityFromString = function (string) {
        return string.slice(0, string.indexOf(', '));
    };

    var getCountryFromString = function (string) {
        return string.slice(string.indexOf(', ') + 2);
    };

    var makeCityHashtag = function (cityName) {
        return cityName
            .replace(/[^\w\s]/g, '')
            .replace(/ /g, '');
    };

    var createShareTools = function (userCity, twinTown) {
        var message = '';
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