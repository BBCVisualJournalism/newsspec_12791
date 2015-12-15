define(['lib/news_special/bootstrap', 'mediator/countrySearchMediator'], function (news, CountrySearchMediator) {

    // vars 
    var autocompleteSelectedCountry;
    var autocompleteSelected;
    var countrysAutocomplete;
    var toggleInputIstats;
    var basePath;

    // elements 
    var $autocompleteddInput;
    var $autocompleteEl;
    var $dropdownInput;
    var $userInputWrapperEl;
    var $submitButton;
    var $cityDropDownEl;

    var init = function (baseDataPath) {
        // set defaults 
        autocompleteSelectedCountry = null;
        dropdownSelectedCountry = null;
        toggleInputIstats = false;

        basePath = baseDataPath;

        // element selectors 
        $autocompleteInput = news.$('#country-search--text-input');
        $autocompleteEl = news.$('.country-search--autocomplete');
        $userInputWrapperEl = news.$('.country-search--inputs');
        $submitButton = news.$('.country-search--submit');
        $cityDropDownEl = news.$('#city-search--dropdown-input');

        // populate the inputs 
        countrysAutocomplete = new CountrySearchMediator($autocompleteInput, updateButtonState, basePath);

        // event listeners
        $autocompleteInput.keypress(autocompleteInputKeypress);
    };

    var updateButtonState = function () {
        var disabled = true;
        if (countrysAutocomplete.getSelectedCountry() !== null) {
            disabled = false;
        }

        if (disabled) {
            $cityDropDownEl.addClass('disabled');
        } else {
            $cityDropDownEl.removeClass('disabled');
        }
    };

    var autocompleteInputKeypress = function (e) {
        var inputText = (e.target.value + String.fromCharCode(e.charCode)).toLowerCase();
        var $suggestionsHolder = news.$('.autocomplete-suggestions');
        var $autoCompletSuggestions = $suggestionsHolder.find('.autocomplete-suggestion');

        var keyCode = (window.event) ? e.which : e.keyCode;

        if (keyCode === 13 && !$cityDropDownEl.hasClass('disabled')) {
            //we've got a match and we've hit the enter key!
            if ($suggestionsHolder.css('display') === 'none') {
                $autocompleteInput.blur();
            }
            return;
        }

        if ($autoCompletSuggestions.length) {
            if (news.$($autoCompletSuggestions[0]).text().toLowerCase() === inputText) {
                $cityDropDownEl.removeClass('disabled');
            } else {
                $cityDropDownEl.addClass('disabled');
            }
        }
    };

    var getUserCountry = function () {
        return countrysAutocomplete.getSelectedCountry();
    };

    var publicApi = {
        init: init,
        getUserCountry: getUserCountry
    };

    return publicApi;
});
