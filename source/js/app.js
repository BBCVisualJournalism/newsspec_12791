define(['lib/news_special/bootstrap', 'bump-3', 'playlister/snippets'], function (news, $, snippets) {

	/*
	 * variable declarations
	*/

	/*
	 * init stuff
	*/
    news.sendMessageToremoveLoadingImage();

    snippets.init({
        // lang: "en",
        // continuous: false,
        // base_url: "/modules/snippet",
        // pause_enabled: true,
        // uk: null,
        // context: null
    });


});