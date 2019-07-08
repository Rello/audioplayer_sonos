/**
 * Audio Player SONOS
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2016-2019 Marcel Scherello
 */

'use strict';

$(document).ready(function () {

    $('#sonos').on('click', function () {
        var user_value;
        if ($('#sonos').prop('checked')) {
            user_value = 'checked';
        }
        else {
            user_value = '';
        }
        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/setvalue'),
            data: {
                'type': 'sonos',
                'value': user_value
            },
            success: function () {
                OC.Notification.showTemporary(t('audioplayer_sonos', 'saved'));
            }
        });
    });

    $('#sonos_controller_submit').on('click', function () {
        var user_value = $('#sonos_controller').val();
        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/setvalue'),
            data: {
                'type': 'sonos_controller',
                'value': user_value
            },
            success: function () {
                OC.Notification.showTemporary(t('audioplayer_sonos', 'saved'));
            }
        });
    });

    $('#sonos_smb_path_submit').on('click', function () {
        var user_value = $('#sonos_smb_path').val();
        $.ajax({
            type: 'POST',
            url: OC.generateUrl('apps/audioplayer_sonos/setvalue'),
            data: {
                'type': 'sonos_smb_path',
                'value': user_value
            },
            success: function () {
                OC.Notification.showTemporary(t('audioplayer_sonos', 'saved'));
            }
        });
    });

    $.ajax({
        type: 'POST',
        url: OC.generateUrl('apps/audioplayer_sonos/sonosdevices'),
        data: {},
        success: function (jsondata) {
            $(jsondata).each(function (i, el) {
                $('#sonos_controller').append($('<option>', {
                    value: el[0],
                    text: el[2][0]
                }));
            });
            $('#sonos_controller').val($('#sonos_current').val());
        }
    });

});