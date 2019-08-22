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

    playSonos: function (element) {

        var liIndex = $(element).closest('li').index();
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

        var html = '<div style="margin-left: 2em; background-position: initial;" class="icon-info">';
        html += '<p style="margin-left: 2em;">' + t('audioplayer_sonos', 'Details for error analysis') + '</p>';
        html += '<br>';
        html += '</div>';
        document.getElementById('SONOSTabView').classList.remove('hidden');
        document.getElementById('SONOSTabView').innerHTML = html;

        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/sonosdebug'),
            data: {'trackid': trackid},
            success: function (jsondata) {
                html = document.getElementById('SONOSTabView').innerHTML;
                html += '<p style="margin-left: 2em;">' + t('audioplayer_sonos', 'SMB link from user settings:') + '</p>';
                html += '<p style="margin-left: 2em;">' + jsondata.smb + '</p>';
                html += '<br>';
                html += '<p style="margin-left: 2em;">' + t('audioplayer_sonos', 'Combined link for your SONOS controller:') + '</p>';
                html += '<p style="margin-left: 2em;">' + jsondata.sonos + '</p>';
                document.getElementById('SONOSTabView').innerHTML = html;
            }
        });
    },

};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('#sonos_play').addEventListener('click', function () {
        var playIndicator = document.getElementById('#sonos_play');
        var action;

        if (playIndicator.classList.contains('playing')) {
            playIndicator.classList.remove('playing');
            action = 'pause';
        } else {
            action = 'play';
        }
        if(OCA.Audioplayer.Sonos.sonosAction(action)) playIndicator.classList.add('playing');
    });

    document.getElementById('sonos_prev').addEventListener('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('previous');
    });

    document.getElementById('sonos_next').addEventListener('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('next');
    });

    document.getElementById('sonos_up').addEventListener('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('up');
    });

    document.getElementById('sonos_down').addEventListener('click', function () {
        OCA.Audioplayer.Sonos.sonosAction('down');
    });

    if (document.getElementById('audioplayer_sonos').value === 'checked') {
        OCA.Audioplayer.Sidebar.registerSidebarTab({
            id: 'tabHeaderSONOS',
            class: 'SONOSTabView',
            tabindex: '5',
            name: t('audioplayer_sonos', 'SONOS'),
            action: OCA.Audioplayer.Sonos.SONOSTabView,
        });
    }
});