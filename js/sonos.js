/**
 * Audio Player Sonos
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2016-2019 Marcel Scherello
 */

/* global Audios */
// OK because ./js/app.js is sourced before in html

'use strict';

if (!OCA.Audioplayer) {
    /**
     * @namespace
     */
    OCA.Audioplayer = {};
}

if (!OCA.Audioplayer.Sonos) {
    /**
     * @namespace
     */
    OCA.Audioplayer.Sonos = {};
}

/**
 * @namespace OCA.Audioplayer.Sonos
 */
OCA.Audioplayer.Sonos = {

    playSonos: function (liIndex) {

        var playIndicator = $('#sonos_play');
        var trackids = [];

        $( '.albumwrapper li' ).each(function() {
            var trackid = $(this).data('trackid');
            trackids.push(trackid);
        });

        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/sonosqueue'),
            data: {
                'trackArray': trackids,
                'fileIndex': liIndex
            },
            success: function (jsondata) {
                if (jsondata === false) {
                    OCA.Audioplayer.Sonos.sonosGone();
                }
                playIndicator.addClass('playing');
            },
            error: function(){
                OCA.Audioplayer.Sonos.sonosGone();
            },
            timeout: 3000
        });
    },

    sonosGone: function () {
        OC.dialogs.alert(t('audioplayer_sonos', 'SONOS Player not availble.'), t('audioplayer_sonos', 'Error'), function(){
            window.location = OC.linkTo('settings','user/audioplayer');
        });
    },

    sonosAction: function (action) {
        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/sonosaction'),
            data: {
                'action': action
            },
            success: function (jsondata) {
                if (jsondata === false) {
                    OCA.Audioplayer.Sonos.sonosGone();
                }
                return true;
            },
            error: function(){
                OCA.Audioplayer.Sonos.sonosGone();
            },
            timeout: 3000
        });
    },

};

document.addEventListener('DOMContentLoaded', function () {
    $('#sonos_play').on('click', function () {
        var playIndicator = $('#sonos_play');
        var action;

        if (playIndicator.hasClass('playing')) {
            playIndicator.removeClass('playing');
            action = 'pause';
        } else {
            action = 'play';
        }
        if(OCA.Audioplayer.Sonos.sonosAction(action)) playIndicator.addClass('playing');
    });

    $('#sonos_prev').on('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('previous');
    });

    $('#sonos_next').on('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('next');
    });

    $('#sonos_up').on('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('up');
    });

    $('#sonos_down').on('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('down');
    });
});