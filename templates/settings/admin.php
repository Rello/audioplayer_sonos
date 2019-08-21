<?php
/**
 * Audio Player
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2016-2019 Marcel Scherello
 */

script('audioplayer_sonos', 'settings/admin');
?>

<div class="section" id="audioplayer_sonos"><br>
    <h2><?php p($l->t('SONOS Player Plugin')); ?></h2>
    <div>
        <p>
            <em><?php p($l->t('The SONOS plugin needs to be enabled by the administrator')); ?></em>
            <br>
            <em><a href="https://github.com/Rello/audioplayer_sonos/wiki/SONOS"
                   target="_blank"><?php p($l->t('More information…')); ?></a></em>
        </p>
        <br>
        <input type="checkbox" class="checkbox" id="sonos" <?php p($_['audioplayer_sonos_admin']); ?>/>
        <label for="sonos"><?php p($l->t('Enable for all users')); ?></label>
        <br>
    </div>
</div>
