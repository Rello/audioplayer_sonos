/**
 * Audio Player SONOS
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2016-2021 Marcel Scherello
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

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
            url: OC.generateUrl('apps/audioplayer_sonos/admin'),
            data: {
                'type': 'sonos',
                'value': user_value
            },
            success: function () {
                OCP.Toast.success(t('audioplayer_sonos', 'saved'))
            }
        });
    });
});