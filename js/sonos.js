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

    SONOSTabView: function () {
        var trackid = document.getElementById('app-sidebar').dataset.trackid;

        OCA.Audioplayer.Sidebar.resetView();
        document.getElementById('tabHeaderSONOS').classList.add('selected');
        document.getElementById('SONOSTabView').classList.remove('hidden');
        document.getElementById('SONOSTabView').innerHTML = '<div style="text-align:center; word-wrap:break-word;" class="get-metadata"><p><img src="' + OC.imagePath('core', 'loading.gif') + '"><br><br></p><p>' + t('audioplayer_sonos', 'Reading data') + '</p></div>';

        var html = '<div style="margin-left: 2em; background-position: initial;" class="icon-info">';
        html += '<p style="margin-left: 2em;">' + t('audioplayer_sonos', 'Details for error analysis') + '</p>';
        html += '<br>';
        html += '</div>';
        $('#SONOSTabView').removeClass('hidden').html(html);

        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/sonosdebug'),
            data: {'trackid': trackid},
            success: function (jsondata) {
                html = $('#SONOSTabView').html();
                html += '<p style="margin-left: 2em;">' + t('audioplayer_sonos', 'SMB link from user settings:') + '</p>';
                html += '<p style="margin-left: 2em;">' + jsondata.smb + '</p>';
                html += '<br>';
                html += '<p style="margin-left: 2em;">' + t('audioplayer_sonos', 'Combined link for your SONOS controller:') + '</p>';
                html += '<p style="margin-left: 2em;">' + jsondata.sonos + '</p>';
                $('#SONOSTabView').html(html);
            }
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

    OCA.Audioplayer.Sidebar.registerSidebarTab({
        id: 'tabHeaderSONOS',
        class: 'SONOSTabView',
        tabindex: '5',
        name: t('audioplayer_sonos', 'SONOS'),
        action: OCA.Audioplayer.Sonos.SONOSTabView,
    });

});