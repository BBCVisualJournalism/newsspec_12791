define(['lib/news_special/bootstrap', 'citySearchUserInput', 'countrySearchUserInput', 'mediator/citySearchDropDownMediator'], function (news, citySearchUserInput, countrySearchUserInput, citySearchDropDownMediator) {

    // declare variables
    var $cantFindCity;
    var $backToOriginalSearch;
    var $citySearchHolder;
    var $countrySearchHolder;

    var baseDataPath;

    var init = function (basePath) {
        // set variables
        $cantFindCity = news.$('#ns12791_cantFindCity');
        $backToOriginalSearch = news.$('#ns12791_backToOriginalSearch');
        $citySearchHolder = news.$('#ns12791_cityFreeTextSearchHolder');
        $countrySearchHolder = news.$('#ns12791_countryFreeTextSearchHolder');

        baseDataPath = basePath;

        // initialise modules
        citySearchUserInput.init(baseDataPath);
        citySearchDropDownMediator.init(baseDataPath);

        setEvents();
    };

    var setEvents = function () {
        var animationMovement = 40;
        var animationDuration = 180;

        // switch from city search to country search
        $cantFindCity.on('click', function (e) {
            e.preventDefault();
            $citySearchHolder.velocity({
                marginLeft: '-' + animationMovement + 'px',
                opacity: 0
            }, animationDuration, 'linear', function () {
                countrySearchUserInput.init(baseDataPath);
            });
            $countrySearchHolder.css('display', 'block')
                .velocity({
                    left: [0, (animationMovement * 1.5) + 'px'],
                    opacity: [1, 0]
                }, animationDuration * 1.2, 'linear');
            $cantFindCity.addClass('disabled');
            $backToOriginalSearch.removeClass('disabled');
        });

        // switch from country search to city search
        $backToOriginalSearch.on('click', function (e) {
            e.preventDefault();
            $citySearchHolder.velocity('reverse');
            $countrySearchHolder.velocity({
                left: [(animationMovement * 1.5) + 'px', 0],
                opacity: [0, 1]
            }, animationDuration * 1.2, 'linear', function () {
                $countrySearchHolder.css('display', 'none');
            });
            $backToOriginalSearch.addClass('disabled');
            $cantFindCity.removeClass('disabled');
        });
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});
