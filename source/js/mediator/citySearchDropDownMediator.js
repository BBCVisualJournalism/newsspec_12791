define(['lib/news_special/bootstrap', 'utils'], function (news, utils) {

    /*
     * Declare Variables
    */
    var scrollTimeout;
    var $citiesDropdownSelectEl;
    var $submitButton;
    var selectedCityFileName;
    var basePath;

    var init = function (baseDataPath) {
        /*
         * Set Variables
        */
        $citiesDropdownSelectEl = news.$('#city-search--dropdown-input');
        $submitButton = news.$('.country-search--submit');
        basePath = baseDataPath;
        
        /*
         * Event Listeners
        */
        news.pubsub.on('user-autocomplete-country', loadCountriesCities);
        $citiesDropdownSelectEl.change(handleCitySelected);
        $submitButton.on('click', handleSubmitButtonClick);

    };

    var loadCountriesCities = function (countryName) {
        //load the city options for the country selected
        var countrySafePathName = utils.normaliseText(countryName);
        var countriesCityListFilePath = basePath + 'cities_list_' + countrySafePathName + '.js';

        //clear the dropdown list
        $citiesDropdownSelectEl.empty();

        //load the jsonp and populate the dropdown
        var that = this;
        require([countriesCityListFilePath + '?callback=define'], function (citiesList) {

            /*
             * Add explanation option and a blank space to make it look tidy
            */
            news.$("<option />", {
                val: undefined,
                text: 'Select city'
            }).appendTo($citiesDropdownSelectEl);

            news.$("<option />", {
                val: undefined,
                text: ''
            }).appendTo($citiesDropdownSelectEl);

            news.$(citiesList.data).each(function () {
                news.$("<option />", {
                    val: this.cityFileName,
                    text: this.cityName
                }).appendTo($citiesDropdownSelectEl);
            });

        }, function (err) {
            //couldn't load the cities for the selected country/region :s
        });

    };

    var handleCitySelected = function (e) {
        var cityFileName = e.target.value;
        selectedCityFileName = cityFileName;
        if (!cityFileName) {
            $submitButton.addClass('disabled');
            return;
        }
        $submitButton.removeClass('disabled');
    };

    var handleSubmitButtonClick = function (e) {
        news.pubsub.emit('user-submitted-city', [basePath, selectedCityFileName]);
    };

    var publicApi = {
        init: init
    };

    return publicApi;

});