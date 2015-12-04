define([
    'lib/news_special/bootstrap',
    'bump-3',
    'playlister/snippets',
    'mediator/screenSizeMediator',
    'citySearchUserInput'
    ], function (news, $, snippets, screenSizeMediator, citySearchUserInput) {

	/*
	 * variable declarations
	*/
    var $cantFindCity = news.$('#ns12791_cantFindCity');

	/*
	 * init stuff
	*/
    news.sendMessageToremoveLoadingImage();

    snippets.init({
        lang: "en",
        continuous: false,
        base_url: "http://www.bbc.co.uk/modules/snippet",
        pause_enabled: true,
        uk: null,
        context: null
    });

    /*
     * model components init
    */
    citySearchUserInput.init();

    /*
     * mediator components init
    */
    screenSizeMediator.init();

    /*
     * view components init
    */

    /*
     * button listeners
    */
    $cantFindCity.on('click', function () {
        /*
         * switch from the city search to the country search
        */
        var citySearchV = news.$v('#ns12791_cityFreeTextSearchHolder');
        var countrySearchV = news.$v('#ns12791_countryFreeTextSearchHolder');

        var animationMovement = 40;
        var animationDuration = 180;

        citySearchV.velocity({
                marginLeft: '-' + animationMovement + 'px',
                opacity: 0
            }, animationDuration, 'linear', function() {
                //dsfg
            }
        );

        countrySearchV.css({
            'display': 'block'
        });

        countrySearchV.velocity({
                left: [0, (animationMovement * 1.5) + 'px'],
                opacity: [1, 0]
            }, animationDuration * 1.2, 'linear', function() {
                //adsfg
            }
        );

    });


    /*
     * event listeners
    */
    news.pubsub.on('user-submitted-city', function (cityName) {
        console.log('cityName = ', cityName);
    });


});