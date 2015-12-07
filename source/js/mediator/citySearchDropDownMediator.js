define(['lib/news_special/bootstrap'], function (news) {

    /*
     * Declare Variables
    */
    var scrollTimeout;
    

    var init = function () {


        /*
         * Set Variables
        */
        
        /*
         * Event Listeners
        */
        news.pubsub.on('user-autocomplete-country', loadCountriesCities);

    };

    var loadCountriesCities = function (countryName) {
        //load the city options for the country selected
        var locale = 'en';
        var countrySafePathName = countryName.replace(' ', '-').toLowerCase();
        var countriesCityListFilePath = 'http://newsimg.bbc.co.uk/news/special/2015/newsspec_12791_data/data/' + locale + '/cities_list_' + countrySafePathName + '.js';

        //load the above path and fill the dropdown list with the results!
    };

    var publicApi = {
        init: init
    };

    return publicApi;

});