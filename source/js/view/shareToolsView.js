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
            if (twinTown) {
                var twinTownName = twinTown.name.split(',')[0];
                createShareTools(cityName, twinTownName);
            } else {
                createShareTools(cityName);
            }
        } else {
            //sharetools has already been created
            //destroy and try again
            destroyShareTools();
            displayShareTools(cityName, twinTown);
        }
    };

    var createShareTools = function (cityName, twinTownName) {
        var message;
        if (twinTownName) {
            message = $shareToolsHolder.attr('data-share-message')
                .replace('{{cityName}}', cityName)
                .replace('{{twinTownName}}', twinTownName);
        } else {
            message = $shareToolsHolder.attr('data-share-message-notwin')
                .replace('{{cityName}}', cityName);
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