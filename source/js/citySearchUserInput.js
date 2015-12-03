define(['lib/news_special/bootstrap', 'mediator/citySearchMediator'], function (news, CitySearchMediator) {

    /* Vars */
    var autocompleteSelectedCity;
    var autocompleteSelected;
    var citysAutocomplete;
    var toggleInputIstats;

    /* Elements */
    var $autocompleteddInput;
    var $autocompleteEl;
    var $dropdownInput;
    var $userInputWrapperEl;
    var $submitButton;

    var init = function () {
        /* Set defaults */
        autocompleteSelectedCity = null;
        dropdownSelectedCity = null;
        toggleInputIstats = false;

        /* Element selectors */
        $autocompleteInput = news.$('#city-search--text-input');
        $autocompleteEl = news.$('.city-search--autocomplete');
        $userInputWrapperEl = news.$('.city-search--inputs');
        $submitButton = news.$('.city-search--submit');

        /* Populate the inputs */
        citysAutocomplete = new CitySearchMediator($autocompleteInput, updateButtonState);

        /* LISTENERS */
        $autocompleteInput.keypress(autocompleteInputKeypress);
        $submitButton.on('click', submit);
    };

    var updateButtonState = function () {
        var disabled = true;
        if (citysAutocomplete.getSelectedCity() !== null) {
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

    var getUserCity = function () {
        return citysAutocomplete.getSelectedCity();
    };

    var submit = function () {
        news.pubsub.emit('istats', ['find-automation-clicked']);

        news.pubsub.emit('user-submitted-city', getUserCity());
    };

    var publicApi = {
        init: init,
        getUserCity: getUserCity
    };

    return publicApi;

});
