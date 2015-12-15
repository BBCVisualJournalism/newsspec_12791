define(['lib/news_special/bootstrap'], function (news) {

    /*
     * Declare Variables
    */
    var $showMoreTracksButton;
    var $showLessButton;

    var init = function () {
        /*
         * Set Variables
        */
        $showMoreTracksButton = news.$('.ns12791_showMoreTracksButton');
        $showLessButton = news.$('.ns12791_showLessButton');
        
        /*
         * Event Listeners
        */
        $showMoreTracksButton.on('click', handleShowMoreButtonCLick);
        $showLessButton.on('click', handleShowLessButtonClick);
    };

    var handleShowMoreButtonCLick = function (e) {
        news.pubsub.emit('show-more-tracks');
    };

    var handleShowLessButtonClick = function (e) {
        news.pubsub.emit('show-less-tracks');
    };

    var publicApi = {
        init: init
    };

    return publicApi;

});