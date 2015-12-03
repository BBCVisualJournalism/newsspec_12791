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


});