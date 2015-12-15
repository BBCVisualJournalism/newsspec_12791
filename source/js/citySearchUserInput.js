define(['lib/news_special/bootstrap', 'mediator/cityAutocompleteMediator', 'utils'], function (news, CityAutocompleteMediator, utils) {

    var $searchForm;
    var $searchInput;
    var $searchSubmit;

    var cityAutocomplete;
    var basePath;

    var init = function (baseDataPath) {
        $searchForm = news.$('#ns12791_cityFreeTextSearchHolder');
        $searchInput = news.$('#city-search--text-input');
        $searchSubmit = news.$('.city-search--submit');

        basePath = baseDataPath;

        cityAutocomplete = new CityAutocompleteMediator($searchInput, onCitySelect, basePath);

        $searchInput.on('focus', function () {
            var $this = $(this);
            if ($this.val() !== '') {
                $this.val('');
            }
        });

        $searchForm.on('submit', onSubmit);
    };

    var onCitySelect = function () {
        if (getUserCity() !== null) {
            utils.enableInput($searchSubmit);
        } else {
            utils.disableInput($searchSubmit);
        }
    };

    var onSubmit = function () {
        news.pubsub.emit('istats', ['find-automation-clicked']);

        var cityFileName = utils.normaliseText(getUserCity()) + '.js';

        news.pubsub.emit('user-submitted-city', [basePath, cityFileName]);
        return false;
    };

    var getUserCity = function () {
        return cityAutocomplete.getSelectedCity();
    };

    var publicApi = {
        init: init,
        getUserCity: getUserCity
    };

    return publicApi;
});
