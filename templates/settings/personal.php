<?php
/**
 * Audio Player SONOS
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2016-2019 Marcel Scherello
 */

script('audioplayer_sonos', 'settings/personal');
?>

<div class="section" id="audioplayer_sonos">
    <h2><?php p($l->t('SONOS Player Settings')); ?></h2>
    <?php if ($_['audioplayer_sonos_admin'] !== "checked") { ?>
        <div>
            <p>
                <em><?php p($l->t('The SONOS plugin needs to be enabled by the administrator')); ?></em>
            </p>
        </div>

    <?php } else { ?>
        <div>
            <input type="checkbox" class="checkbox" id="sonos" <?php p($_['audioplayer_sonos']); ?>/>
            <label for="sonos"><?php p($l->t('SONOS Playback')); ?>&nbsp;</label>
            <p><em><?php p($l->t('All titles will be played on your SONOS speaker')); ?></em></p>
            <p><em><a href="https://github.com/Rello/audioplayer/wiki/SONOS"
                      target="_blank"><?php p($l->t('More information…')); ?></a></em></p>
            <br>
        </div>
        <div>
            <label for="sonos_controller"><?php p($l->t('SONOS Player:')); ?></label>
            <select id="sonos_controller">
                <option value=""></option>
            </select>
            <input type="hidden" id="sonos_current" value="<?php p($_['audioplayer_sonos_controller']); ?>">
            <input type="submit" id="sonos_controller_submit" value="<?php p($l->t('Save')); ?>">
            <p><em><?php p($l->t('Name of the SONOS player or group')); ?></em></p>
            <br>
        </div>
        <div>
            <label for="sonos_smb_path"><?php p($l->t('local SMB Path:')); ?></label>
            <input type="text" id="sonos_smb_path" value="<?php p($_['audioplayer_sonos_smb_path']); ?>"/>
            <input type="submit" id="sonos_smb_path_submit" value="<?php p($l->t('Save')); ?>">
            <p>
                <em><?php p($l->t('Server path to the SMB directory where all audio files are located')); ?></em><br>
                <em>e.g.: qnap/Multimedia/iTunes/Music/</em>
            </p>
            <br>
        </div>
    <?php } ?>
</div>
