define(['lib/news_special/bootstrap', 'utils', 'lib/vendors/autocomplete'], function (news, utils) {
    var CityAutocompleteMediator = function ($inputElement, onCitySelect, baseDataPath) {
        this.$autocompleteInput = $inputElement;
        this.onCitySelect = onCitySelect;
        this.autocompleteSelectedCity = null;
        
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
                lookupLimit: 51,
                autoSelectFirst: true,
                onSelect: function (suggestion) {
                    news.istats.log('newsspec-interaction', 'city-autocomplete-used');
                    if (suggestion.value !== self.autocompleteSelectedCity) {
                        self.autocompleteSelectedCity = suggestion.value;
                    }
                    self.onCitySelect();
                },

                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    if (utils.removeDiacritics(suggestion.value.toLowerCase()).indexOf(utils.removeDiacritics(queryLowerCase)) !== -1) {
                        return true;
                    }
                },

                onInvalidateSelection: function () {
                    self.autocompleteSelectedCity = null;
                    self.onCitySelect();
                }
            });
        },

        getSelectedCity: function () {
            return this.autocompleteSelectedCity;
        }
    };

    return CityAutocompleteMediator;
});
