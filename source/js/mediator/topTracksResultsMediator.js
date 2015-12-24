define(['lib/news_special/bootstrap'], function (news) {

    // declare variables
    var $showMoreTracksButton;
    var $showLessButton;
    var $snippetsPlayButtons;

    var init = function () {
        console.log('topTracksResultsMediator inited');
        
        // set variables
        $showMoreTracksButton = news.$('.ns12791_showMoreTracksButton');
        $showLessButton = news.$('.ns12791_showLessButton');
        
        // event listeners
        $showMoreTracksButton.on('click', handleShowMoreButtonCLick);
        $showLessButton.on('click', handleShowLessButtonClick);
    };

    var handleShowMoreButtonCLick = function () {
        console.log('show more button clicked');
        news.pubsub.emit('show-more-tracks');
    };

    var handleShowLessButtonClick = function () {
        console.log('show less button clicked');
        news.pubsub.emit('show-less-tracks');
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});