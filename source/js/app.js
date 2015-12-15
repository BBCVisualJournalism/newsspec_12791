define([
    'lib/news_special/bootstrap',
    'mediator/screenSizeMediator',
    'mediator/citySearchDropDownMediator',
    'mediator/resultsMediator',
    'view/topTracksResultsView',
    'view/twinTownResultsView',
    'citySearchUserInput',
    'countrySearchUserInput'
], function (news, screenSizeMediator, citySearchDropDownMediator, resultsMediator, topTracksResultsView, twinTownResultsView, citySearchUserInput, countrySearchUserInput) {

	// variable declarations
    var locale = news.$('.main').attr('id').replace('locale_', '');
    var baseDataPath = 'http://newsimg.bbc.co.uk/news/special/2015/newsspec_12791_data/data/' + locale + '/';
    
    var $cantFindCity = news.$('#ns12791_cantFindCity');
    var $backToOriginalSearch = news.$('#ns12791_backToOriginalSearch');
    var citySearchV = news.$v('#ns12791_cityFreeTextSearchHolder');
    var countrySearchV = news.$v('#ns12791_countryFreeTextSearchHolder');

    news.sendMessageToremoveLoadingImage();
    citySearchUserInput.init(baseDataPath);

    // init mediator components
    screenSizeMediator.init();
    citySearchDropDownMediator.init(baseDataPath);
    resultsMediator.init();

    // init view components
    topTracksResultsView.init();
    twinTownResultsView.init();

    // button listeners
    $cantFindCity.on('click', function () {
        // switch from city search to country search
        var animationMovement = 40;
        var animationDuration = 180;

        citySearchV.velocity({
                marginLeft: '-' + animationMovement + 'px',
                opacity: 0
            }, animationDuration, 'linear', function () {
                countrySearchUserInput.init(baseDataPath);
            }
        );
        countrySearchV.css({
            'display': 'block'
        });
        countrySearchV.velocity({
                left: [0, (animationMovement * 1.5) + 'px'],
                opacity: [1, 0]
            }, animationDuration * 1.2, 'linear'
        );

        $cantFindCity.addClass('disabled');
        $backToOriginalSearch.removeClass('disabled');
    });

    $backToOriginalSearch.on('click', function () {
        // switch from country search to city search
        var animationMovement = 40;
        var animationDuration = 180;

        citySearchV.velocity('reverse');
        countrySearchV.velocity({
                left: [(animationMovement * 1.5) + 'px', 0],
                opacity: [0, 1]
            }, animationDuration * 1.2, 'linear', function () {
                countrySearchV.css({
                    'display': 'none'
                });
            }
        );

        $cantFindCity.removeClass('disabled');
        $backToOriginalSearch.addClass('disabled');
    });
});