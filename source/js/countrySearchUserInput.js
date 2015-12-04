define(['lib/news_special/bootstrap', 'mediator/countrySearchMediator'], function (news, CountrySearchMediator) {

    /* Vars */
    var autocompleteSelectedCountry;
    var autocompleteSelected;
    var countrysAutocomplete;
    var toggleInputIstats;

    /* Elements */
    var $autocompleteddInput;
    var $autocompleteEl;
    var $dropdownInput;
    var $userInputWrapperEl;
    var $submitButton;

    var init = function () {
        /* Set defaults */
        autocompleteSelectedCountry = null;
        dropdownSelectedCountry = null;
        toggleInputIstats = false;

        /* Element selectors */
        $autocompleteInput = news.$('#country-search--text-input');
        $autocompleteEl = news.$('.country-search--autocomplete');
        $userInputWrapperEl = news.$('.country-search--inputs');
        $submitButton = news.$('.country-search--submit');

        /* Populate the inputs */
        countrysAutocomplete = new CountrySearchMediator($autocompleteInput, updateButtonState);

        /* LISTENERS */
        $autocompleteInput.keypress(autocompleteInputKeypress);
        $submitButton.on('click', submit);
    };

    var updateButtonState = function () {
        var disabled = true;
        if (countrysAutocomplete.getSelectedCountry() !== null) {
            disabled = false;
        }

        if (disabled) {
            $submitButton.addClass('disabled');
        } else {
            $submitButton.removeClass('disabled');
            // $submitButton.focus();
        }
    };

    var autocompleteInputKeypress = function (e) {
        var inputText = (e.target.value + String.fromCharCode(e.charCode)).toLowerCase();
        var $suggestionsHolder = news.$('.autocomplete-suggestions');
        var $autoCompletSuggestions = $suggestionsHolder.find('.autocomplete-suggestion');

        var keyCode = (window.event) ? e.which : e.keyCode;

        if (keyCode == 13 && !$submitButton.hasClass('disabled')) {
            //we've got a match and we've hit the enter key!
            if ($suggestionsHolder.css('display') == 'none') {
                $submitButton.trigger("click");
                $autocompleteInput.blur();
            }
            return;
        }

        if ($autoCompletSuggestions.length) {
            if (news.$($autoCompletSuggestions[0]).text().toLowerCase() == inputText) {
                $submitButton.removeClass('disabled');
            }
            else {
                $submitButton.addClass('disabled');
            }
        }
    };    

    var getUserCountry = function () {
        return countrysAutocomplete.getSelectedCountry();
    };

    var submit = function () {
        news.pubsub.emit('istats', ['find-automation-clicked']);

        news.pubsub.emit('user-submitted-country', getUserCountry());
    };

    var publicApi = {
        init: init,
        getUserCountry: getUserCountry
    };

    return publicApi;

});
