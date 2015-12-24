define(['lib/news_special/bootstrap', 'mediator/countryAutocompleteMediator', 'utils'], function (news, CountryAutocompleteMediator, utils) {

    var $searchInput;
    var $cityDropDown;
    var $searchSubmit;

    var countryAutocomplete;
    var basePath;

    var init = function (baseDataPath) {
        $searchInput = news.$('#country-search--text-input');
        $cityDropDown = news.$('#city-search--dropdown-input');
        $searchSubmit = news.$('.country-search--submit');

        basePath = baseDataPath;

        countryAutocomplete = new CountryAutocompleteMediator($searchInput, onCountrySelect, basePath);

        $searchInput.on('focus', function () {
            var $this = $(this);
            if ($this.val() !== '') {
                $this.val('');
                utils.disableInput($cityDropDown);
                utils.disableInput($searchSubmit);
            }
        });
    };

    var onCountrySelect = function () {
        if (getUserCountry() !== null) {
            utils.enableInput($cityDropDown);
        } else {
            utils.disableInput($cityDropDown);
            utils.disableInput($searchSubmit);
        }
    };

    var getUserCountry = function () {
        return countryAutocomplete.getSelectedCountry();
    };

    var publicApi = {
        init: init,
        getUserCountry: getUserCountry
    };

    return publicApi;
});
