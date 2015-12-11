define(['lib/news_special/bootstrap'], function (news) {

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
        });
    };

    var displayResults = function (resultsModel) {
        news.pubsub.emit('display-city-tracks-results', [resultsModel.topTracks]);

    }

    var publicApi = {
        init: init
    };

    return publicApi;

});