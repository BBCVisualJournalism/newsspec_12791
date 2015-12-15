define(function () {
    var replaceCharsLookup = {
        'À': 'A',
        'à': 'a',
        'È': 'E',
        'è': 'e',
        'Ì': 'I',
        'ì': 'i',
        'Ò': 'O',
        'ò': 'o',
        'Ù': 'U',
        'ù': 'u',
        'Á': 'A',
        'á': 'a',
        'É': 'E',
        'é': 'e',
        'Í': 'I',
        'í': 'i',
        'Ó': 'O',
        'ó': 'o',
        'Ú': 'U',
        'ú': 'u',
        'Ý': 'Y',
        'ý': 'y',
        'Â': 'A',
        'â': 'a',
        'Ê': 'E',
        'ê': 'e',
        'Î': 'I',
        'î': 'i',
        'Ô': 'O',
        'ô': 'o',
        'Û': 'U',
        'û': 'u',
        'Ã': 'A',
        'ã': 'a',
        'Ñ': 'N',
        'ñ': 'n',
        'Õ': 'O',
        'õ': 'o',
        'Ä': 'A',
        'ä': 'a',
        'Ë': 'E',
        'ë': 'e',
        'Ï': 'I',
        'ï': 'i',
        'Ö': 'O',
        'ö': 'o',
        'Ü': 'U',
        'ü': 'u',
        'Ÿ': 'Y',
        'ÿ': 'y',
        'ç': 'c',
        'Š': 'S',
        'š': 's',
        'Ç': 'C',
        'Ž': 'Z',
        'ď': 'd',
        'Ł': 'L',
        'ł': 'l',
        'ź': 'z',
        'ơ': 'o',
        'ư': 'u',
        'ộ': 'o',
        'Ō': 'O',
        'ō': 'o',
        'ẩ': 'a',
        'ả': 'a',
        'ā': 'a',
        'ă': 'a',
        'ą': 'a',
        'ố': 'o',
        'Đ': 'D',
        'ắ': 'a',
        'Å': 'A',
        'ệ': 'e',
        'ế': 'e',
        'ồ': 'o',
        'ĩ': 'i',
        'ı': 'i',
        'Ş': 'S',
        'ş': 's',
        'ə': 'a',
        'ț': 't',
        'å': 'a',
        'ș': 's',
        'ợ': 'o',
        'ớ': 'o',
        'ọ': 'o',
        'ø': 'o',
        'ő': 'o',
        'ứ': 'u',
        'ß': 'ss',
        'ė': 'e',
        'ū': 'u',
        'ğ': 'g',
        'ž': 'z',
        'ķ': 'k',
        'ủ': 'u',
        'ầ': 'a',
        'ạ': 'a',
        'ē': 'e',
        'ń': 'n',
        'ň': 'n',
        'İ': 'I',
        '\\$': 's',
        '\\.': '',
        '’': '',
        '/': '',
        ',': '-',
        '\\(': '',
        '\\)': '',
        '\'': '',
        ' ': ''
    };

    var normaliseText = function (string) {
        var normalisedString = string.toLowerCase();
        for (var key in replaceCharsLookup) {
            normalisedString = normalisedString.replace(new RegExp(key.toLowerCase(), 'g'), replaceCharsLookup[key].toLowerCase());
        }
        return normalisedString;
    };

    var enableButton = function ($button) {
        console.log('enabling button');
        $button.removeClass('disabled').removeAttr('disabled');
    };

    var disableButton = function ($button) {
        console.log('disabling button');
        $button.addClass('disabled').attr('disabled', 'disabled');
    };

    var publicApi = {
        normaliseText: normaliseText,
        enableButton: enableButton,
        disableButton: disableButton
    };

    return publicApi;
});