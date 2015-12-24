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
                '/news/special/2015/newsspec_12791/content/english/img/album_art_placeholder.png';

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