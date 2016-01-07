define(['lib/news_special/bootstrap', 'lib/vendors/autocomplete'], function (news) {
    var CountryAutocompleteMediator = function ($inputElement, onCountrySelect, baseDataPath) {
        this.$autocompleteInput = $inputElement;
        this.onCountrySelect = onCountrySelect;
        this.autocompleteSelectedCountry  = null;
        
        var self = this;
        require([baseDataPath + 'worldwide_country_list.js?callback=define'], function (worldwideCountriesList) {
            self.setupAutocomplete(worldwideCountriesList.data);
        });
    };

    CountryAutocompleteMediator.prototype = {
        setupAutocomplete: function (autoCompleteData) {
            var self = this;

            this.$autocompleteInput.autocomplete({
                lookup: autoCompleteData,
                lookupLimit: 51,
                autoSelectFirst: true,
                onSelect: function (suggestion) {
                    news.istats.log('newsspec-interaction', 'country-autocomplete-used');
                    if (suggestion.value !== self.autocompleteSelectedCountry) {
                        self.autocompleteSelectedCountry = suggestion.value;
                    }
                    self.onCountrySelect();
                    news.pubsub.emit('user-autocomplete-country', suggestion.value);
                },

                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    if (suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1) {
                        return true;
                    }

                    if (suggestion.search_alternatives) {
                        for (var i = 0; i < suggestion.search_alternatives.length; i++) {
                            if (suggestion.search_alternatives[i].toLowerCase().indexOf(queryLowerCase) !== -1) {
                                return true;
                            }
                        }
                    }
                },

                onInvalidateSelection: function () {
                    self.autocompleteSelectedCountry = null;
                    self.onCountrySelect();
                }
            });
        },

        getSelectedCountry: function () {
            return this.autocompleteSelectedCountry;
        }
    };

    return CountryAutocompleteMediator;
});
