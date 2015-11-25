define([
    'jquery',
    'lib/news_special/imager',
    'lib/news_special/imager_image_sizes',
    'pubsub'
], function ($, Imager, imageSizes) {

    // responsive images
    var imager = new Imager({
        availableWidths: imageSizes,
        regex: /(\/news\/.*img\/)\d+(\/.*)$/i
    });
    $.on('resize_images', function () {
        imager.resize_images();
    });
    $.on('init_images', function () {
        imager.change_divs_to_imgs();
    });

    return {
        $: $,
        pubsub: $,
        sendMessageToremoveLoadingImage: function () {
            var spinner = document.getElementById('loading-spinner');
            if (spinner) {
                spinner.parentNode.removeChild(spinner);
            }
        }
    };

});