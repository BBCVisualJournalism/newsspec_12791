define(['lib/news_special/bootstrap', 'lib/vendors/autocomplete'], function (news) {
    var CountryAutocompleteMediator = function ($inputElement, onCountrySelect, baseDataPath) {
        this.$autocompleteInput = $inputElement;
        this.onCountrySelect = onCountrySelect;
        this.autocompleteSelectedCountry  = null;
        this.istatsSent = false;
        
        var that = this;
        require([baseDataPath + 'worldwide_country_list.js?callback=define'], function (worldwideCountriesList) {
            that.setupAutocomplete(worldwideCountriesList.data);
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
                    self.logiStats();
                },

                onInvalidateSelection: function () {
                    self.autocompleteSelectedCountry = null;
                    self.onCountrySelect();
                }
            });
        },

        getSelectedCountry: function () {
            return this.autocompleteSelectedCountry;
        },
        
        logiStats: function () {
            if (this.istatsSent === false) {
                var searchType = (this.$autocompleteInput.selector === '#country-search--text-input') ? 'initial-search' : 'animate-table-search';
                news.pubsub.emit('istats', ['autocomplete-used', searchType]);

                this.istatsSent = true;
            }
        }
    };

    return CountryAutocompleteMediator;
});
