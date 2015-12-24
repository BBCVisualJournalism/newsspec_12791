define([
	'lib/news_special/bootstrap',
	'bump-3',
    'playlister/snippets',
	], function (news, $, snippets) {

    // declare variables
    var $resultsSection;
    var $resultsCityName;
    var $songResultsFirstHalf;
    var $songResultsSecondHalf;
    var $showMoreTracksButton;
    var $showLessTracksButton;
    var $twinTownSection;
    var $contentCovers;

    var init = function () {
        // set variables
        $resultsSection = news.$('.ns12791_resultsHolder');
        $resultsCityName = news.$('#ns12791_resultsCityName');
        $songResultsFirstHalf = news.$('#ns12791_songResultsFirstHalf');
        $songResultsSecondHalf = news.$('#ns12791_songResultsSecondHalf');
        $showMoreTracksButton = news.$('.ns12791_showMoreTracksButton');
        $showLessTracksButton = news.$('.ns12791_showLessButton');
        $twinTownSection = news.$('.ns12791_twinTown');
        $contentCovers = news.$('.ns12791_contentCover');
        
        // event listeners
        news.pubsub.on('display-city-tracks-results', displayResults);
        news.pubsub.on('display-selected-city-name', displayCityName);
        news.pubsub.on('show-more-tracks', showMoreTracks);
        news.pubsub.on('show-less-tracks', showLessTracks);
    };

    var showMoreTracks = function () {
        $songResultsSecondHalf.removeClass('ns12791_songResultsSecondHalf--mobHidden');
        $showMoreTracksButton.removeClass('ns12791_button--show');
        $showLessTracksButton.addClass('ns12791_button--show');
        $songResultsSecondHalf.velocity('slideDown', {
            duration: 750,
            display: ''
        });
    };

    var showLessTracks = function () {
        $songResultsSecondHalf.velocity('slideUp', {
            duration: 750,
            display: '',
            complete: function () {
                $showLessTracksButton.removeClass('ns12791_button--show');
                $showMoreTracksButton.addClass('ns12791_button--show');
                $songResultsSecondHalf.addClass('ns12791_songResultsSecondHalf--mobHidden');
            }
        });
    };

    var displayCityName = function (cityName) {
        $resultsCityName.text(cityName);
    };

    var displayResults = function (tracksArr) {
        populateSongResults(tracksArr);
        loadSnippets();
        fadeInContent();
    };

    var populateSongResults = function (tracksArr) {
        $songResultsFirstHalf.empty();
        $songResultsSecondHalf.empty();

        var songBoxHolderMarkupTemplateStr =
            '<div class="ns12791_songBoxHolder">' +
                '<div class="ns12791_trackNumAndSnippetHolder">' +
                    '<div class="ns12791_trackNumber">{{trackNum}}</div>' +
                    '<div class="ns12791_snippetHolder">' +
                        '<bbc-snippet data-record-id="{{songId}}"></bbc-snippet>' +
                    '</div>' +
                '</div>' +
                '<img src="{{imgSrc}}" alt="{{songName}}" width="84" height="84" class="ns12791_songBoxImage">' +
                '<div class="ns12791_songBoxTitleAndArtistHolder">' +
                    '<div class="ns12791_songBoxArtist">{{artistName}}</div>' +
                    '<div class="ns12791_songBoxTitle">{{songName}}</div>' +
                '</div>' +
            '</div>';

        for (var i = 0; i < tracksArr.length; i++) {
            var songBoxMarkupStr = songBoxHolderMarkupTemplateStr;

            var imgSrc = (tracksArr[i].imgSrc) ?
                tracksArr[i].imgSrc :
                'data:image/png;base64,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';

            songBoxMarkupStr = (tracksArr[i].songId) ?
                songBoxMarkupStr.replace('{{songId}}', tracksArr[i].songId) :
                songBoxMarkupStr.replace('<bbc-snippet data-record-id="{{songId}}"></bbc-snippet>', '')
                    .replace('class="ns12791_snippetHolder"', 'class="ns12791_snippetHolder ns12791_snippetHolderNoSong"');
            songBoxMarkupStr = songBoxMarkupStr.replace('{{trackNum}}', (i + 1 + ''))
                .replace('{{artistName}}', tracksArr[i].artist)
                .replace(new RegExp('{{songName}}', 'g'), tracksArr[i].songTitle) // regexp/g because multiple occurrences of {{songName}}
                .replace('{{imgSrc}}', imgSrc);

            (i < 5) ? $songResultsFirstHalf.append(songBoxMarkupStr) : $songResultsSecondHalf.append(songBoxMarkupStr);
        }
    };

    var loadSnippets = function () {
        // init the snippets
        snippets.init({
            lang: "en",
            continuous: false,
            base_url: "http://www.bbc.co.uk/modules/snippet",
            pause_enabled: true,
            uk: null,
            context: null
        });

        // stop current playing snippet when new city is loaded
        snippets.cmd('stop');
    };

    var fadeInContent = function () {
        $resultsSection.show();
        $twinTownSection.show();
        $contentCovers.css({ 'opacity': '1', 'display': 'block' });
        $resultsSection.velocity('scroll', { duration: 750, easing: 'easeOutSine' });
        $contentCovers.velocity('fadeOut', { delay: 250, duration: 750, easing: 'linear' });
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});