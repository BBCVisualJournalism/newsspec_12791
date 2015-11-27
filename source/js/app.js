define([
    'lib/news_special/bootstrap',
    'bump-3',
    'playlister/snippets',
    'mediator/screenSizeMediator'
    ], function (news, $, snippets, screenSizeMediator) {

	/*
	 * variable declarations
	*/

	/*
	 * init stuff
	*/
    news.sendMessageToremoveLoadingImage();

    screenSizeMediator.init();

    snippets.init({
        lang: "en",
        continuous: false,
        base_url: "http://www.bbc.co.uk/modules/snippet",
        pause_enabled: true,
        uk: null,
        context: null
    });

    console.log('snippets = ', snippets);


});