define(['lib/news_special/bootstrap', 'mediator/topTracksResultsMediator'], function (news, topTracksResultsMediator) {

    var init = function () {
        news.pubsub.on('user-submitted-city', handleCitySubmit);
        topTracksResultsMediator.init();
    };

    var handleCitySubmit = function (basePath, cityFileName) {
        require([basePath + cityFileName + '?callback=define'], function (selectedCityModel) {
            displayResults(selectedCityModel);
        });
    };

    var displayResults = function (resultsModel) {
        news.pubsub.emit('display-selected-city-name', [resultsModel.data.cityName]);
        news.pubsub.emit('display-city-tracks-results', [resultsModel.data.topTracks]);
        news.pubsub.emit('display-twin-town-results', [resultsModel.data.twinTown]);
        news.pubsub.emit('display-share-tools', [resultsModel.data.cityName, resultsModel.data.twinTown]);
        news.pubsub.emit('display-random-city-section');
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});