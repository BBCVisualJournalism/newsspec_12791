define(['lib/news_special/bootstrap', 'mediator/topTracksResultsMediator'], function (news, topTracksResultsMediator) {

    /*
     * Declare Variables
    */
    // var scrollAnimSupport = true;    

    var init = function () {


        /*
         * Set Variables
        */
        
        /*
         * Event Listeners
        */
        news.pubsub.on('user-submitted-city', handleCitySubmit);

    };

    var handleCitySubmit = function (basePath, cityFileName) {
        require([basePath + cityFileName + '?callback=define'], function (selectedCityModel) {
            displayResults(selectedCityModel);
            topTracksResultsMediator.init();
        });
    };

    var displayResults = function (resultsModel) {
        console.log('resultsModel = ', resultsModel);
        news.pubsub.emit('display-city-tracks-results', [resultsModel.data.topTracks]);
        news.pubsub.emit('display-selected-city-name', [resultsModel.data.cityName]);
        // news.pubsub.emit('display-twin-city-results', [resultsModel.data.topTracks]);

    }

    var publicApi = {
        init: init
    };

    return publicApi;

});