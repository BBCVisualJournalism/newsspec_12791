define(['lib/news_special/bootstrap', 'utils', 'lib/news_special/numberFormatter'], function (news, utils, NumberFormatter) {
    
    // declare variables
    var $twinTownResult;
    var $twinTownCityName;
    var $twinTownMilesAway;
    var $twinTownKmAway;
    var $tracksInCommonNumber;
    var $tracksInCommonList;
    var $twinTownFound;
    var $noTwinTown;

    var language;

    var init = function () {
        // set variables
        $twinTownResult = news.$('.ns12791_twinTownResult');
        $twinTownCityName = news.$('.ns12791_twinTownCityName');
        $twinTownCountryName = news.$('.ns12791_twinTownCountryName');
        $twinTownMilesAwayText = news.$('.ns12791_twinTownDistance_miles');
        $twinTownMilesAway = news.$('.ns12791_twinTownDistance_miles_number');
        $twinTownKmAway = news.$('.ns12791_twinTownDistance_km_number');
        $tracksInCommonNumber = news.$('#ns12791_tracksInCommon_number');
        $tracksInCommonText = news.$('#ns12791_tracksInCommon_text');
        $tracksInCommonList = news.$('.ns12791_tracksInCommon_list');
        $twinTownFound = news.$('.ns12791_twinTownFound');
        $noTwinTown = news.$('.ns12791_noTwinTown');

        language = utils.getLanguage();

        // event listeners
        news.pubsub.on('display-twin-town-results', displayResults);
    };

    var updateCityName = function (twinTownString) {
        $twinTownCityName.text(utils.getCityFromString(twinTownString));
        $twinTownCountryName.text(utils.getCountryFromString(twinTownString));
    };

    var updateDistance = function (milesAway) {
        var kmAway = Math.round(milesAway / 0.6214);
        if (language === 'english') {
            $twinTownMilesAway.text(NumberFormatter.format(language, milesAway));
        } else {
            $twinTownMilesAwayText.remove();
        }
        $twinTownKmAway.text(NumberFormatter.format(language, kmAway));
    };

    var updateTracksInCommon = function (commonTracksArray) {

        // if param number is between 1-9, returns the number as a word
        // english only - returns digits for all other languages
        var convertNumberToWord = function (number) {
            var numberString = number.toString();
            if (language !== 'english') {
                return numberString;
            } else {
                var numberLookup = {
                    '1': 'One',
                    '2': 'Two',
                    '3': 'Three',
                    '4': 'Four',
                    '5': 'Five',
                    '6': 'Six',
                    '7': 'Seven',
                    '8': 'Eight',
                    '9': 'Nine'
                };
                if (number >= 10) {
                    return numberString;
                } else {
                    for (var key in numberLookup) {
                        numberString = numberString.replace(key, numberLookup[key]);
                    }
                    return numberString;
                }
            }
        };

        $tracksInCommonNumber.text(convertNumberToWord(commonTracksArray.length));
        if (commonTracksArray.length === 1) {
            $tracksInCommonText.text($tracksInCommonText.attr('data-singular'));
        } else {
            $tracksInCommonText.text($tracksInCommonText.attr('data-plural'));
        }

        $tracksInCommonList.empty();
        news.$.each(commonTracksArray, function (index, value) {
            var li = $('<li>').text(value).appendTo($tracksInCommonList);
        });
    };

    var noTwinTown = function () {
        $twinTownFound.hide();
        $noTwinTown.show();
    };

    var twinTownFound = function (twinTownData) {
        updateCityName(twinTownData.name);
        updateDistance(twinTownData.distanceMiles);
        updateTracksInCommon(twinTownData.commonTracksList);
        $noTwinTown.hide();
        $twinTownFound.show();
    }

    var displayResults = function (twinTownData) {
        if (twinTownData) {
            twinTownFound(twinTownData);
        } else {
            noTwinTown();
        }
    };

    var publicApi = {
        init: init
    };

    return publicApi;
});