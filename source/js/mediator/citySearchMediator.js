define(['lib/news_special/bootstrap', 'lib/vendors/autocomplete'], function (news) {
    var CitysAutocompleteMediator = function ($inputElement, onCityChange) {
        
        this.$autocompleteInput = $inputElement;
        this.onCityChange = onCityChange;
        this.autocompleteSelectedCity  = null;
        this.istatsSent = false;
        this.$submitButton = news.$('.city-search--submit');
        this.citiesData = {};
        
        // this.setupAutocomplete();
        var that = this;
        require(['http://newsimg.bbc.co.uk/news/special/2015/newsspec_12791_data/data/worldwide_city_list_en.js?callback=define'], function (worldwideCitiesList) {
            that.setupAutocomplete(worldwideCitiesList.data);
        });
    };

    CitysAutocompleteMediator.prototype = {
        setupAutocomplete: function (autoCompleteData) {
            var cityAutocomplete = this;

            this.$autocompleteInput.autocomplete({
                lookup: autoCompleteData,
                lookupLimit: 20,
                autoSelectFirst: true,
                onSelect: function (suggestion) {

                    if (suggestion !== cityAutocomplete.autocompleteSelectedCity) {
                        cityAutocomplete.autocompleteSelectedCity = suggestion;
                        if (cityAutocomplete.onCityChange) {
                            cityAutocomplete.onCityChange(suggestion);
                        }
                    }

                    cityAutocomplete.$submitButton.removeClass('disabled');
                    
                    if (!news.$('#city-search--text-input').is(':focus')) {
                        news.$('#city-search--text-input').focus();
                    }

                },
                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    if (suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1) {
                        return true;
                    }
                    cityAutocomplete.logiStats();
                },
                onInvalidateSelection: function () {
                    cityAutocomplete.autocompleteSelectedCity = null;
                    if (cityAutocomplete.onCityChange) {
                        cityAutocomplete.onCityChange();
                    }
                }

            });
        },
        getSelectedCity: function () {
            return this.autocompleteSelectedCity;
        },
        logiStats: function () {
            if (this.istatsSent === false) {
                var searchType = (this.$autocompleteInput.selector === '#city-search--text-input') ? 'initial-search' : 'animate-table-search';
                news.pubsub.emit('istats', ['autocomplete-used', searchType]);

                this.istatsSent = true;
            }
        }
    };

    return CitysAutocompleteMediator;
});
