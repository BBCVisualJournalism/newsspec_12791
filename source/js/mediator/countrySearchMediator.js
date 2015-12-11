define(['lib/news_special/bootstrap', 'lib/vendors/autocomplete'], function (news) {
    var CountrysAutocompleteMediator = function ($inputElement, onCountryChange, baseDataPath) {
        
        this.$autocompleteInput = $inputElement;
        this.onCountryChange = onCountryChange;
        this.autocompleteSelectedCountry  = null;
        this.istatsSent = false;
        this.$submitButton = news.$('.country-search--submit');
        this.citiesData = {};
        
        var that = this;
        require([baseDataPath + 'worldwide_country_list.js?callback=define'], function (worldwideCountriesList) {
            that.setupAutocomplete(worldwideCountriesList.data);
        });
    };

    CountrysAutocompleteMediator.prototype = {
        setupAutocomplete: function (autoCompleteData) {
            var countryAutocomplete = this;

            this.$autocompleteInput.autocomplete({
                lookup: autoCompleteData,
                lookupLimit: 20,
                autoSelectFirst: true,
                onSelect: function (suggestion) {

                    if (suggestion.value !== countryAutocomplete.autocompleteSelectedCountry) {
                        countryAutocomplete.autocompleteSelectedCountry = suggestion.value;
                        if (countryAutocomplete.onCountryChange) {
                            countryAutocomplete.onCountryChange(suggestion);
                        }
                    }
                    
                    if (!news.$('#country-search--text-input').is(':focus')) {
                        news.$('#country-search--text-input').focus();
                    }

                    news.pubsub.emit('user-autocomplete-country', suggestion.value);
                    

                },
                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    if (suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1) {
                        return true;
                    }
                    countryAutocomplete.logiStats();
                },
                onInvalidateSelection: function () {
                    countryAutocomplete.autocompleteSelectedCountry = null;
                    if (countryAutocomplete.onCountryChange) {
                        countryAutocomplete.onCountryChange();
                    }
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

    return CountrysAutocompleteMediator;
});
