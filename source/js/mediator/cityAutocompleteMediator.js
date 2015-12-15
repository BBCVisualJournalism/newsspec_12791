define(['lib/news_special/bootstrap', 'lib/vendors/autocomplete'], function (news) {
    var CityAutocompleteMediator = function ($inputElement, onCitySelect, baseDataPath) {
        this.$autocompleteInput = $inputElement;
        this.onCitySelect = onCitySelect;
        this.autocompleteSelectedCity = null;
        this.istatsSent = false;
        
        var self = this;
        require([baseDataPath + 'worldwide_city_list.js?callback=define'], function (worldwideCitiesList) {
            self.setupAutocomplete(worldwideCitiesList.data);
        });
    };

    CityAutocompleteMediator.prototype = {
        setupAutocomplete: function (autoCompleteData) {
            var self = this;

            this.$autocompleteInput.autocomplete({
                lookup: autoCompleteData,
                lookupLimit: 20,
                autoSelectFirst: true,
                onSelect: function (suggestion) {
                    if (suggestion.value !== self.autocompleteSelectedCity) {
                        self.autocompleteSelectedCity = suggestion.value;
                    }
                    self.onCitySelect();
                },

                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    if (suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1) {
                        return true;
                    }
                    self.logiStats();
                },

                onInvalidateSelection: function () {
                    self.autocompleteSelectedCity = null;
                    self.onCitySelect();
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

    return CityAutocompleteMediator;
});
