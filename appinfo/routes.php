<?php
/**
 * Audio Player SONOS
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2019 Marcel Scherello
 */

namespace OCA\audioplayer_sonos\AppInfo;

$application = new Application();

$application->registerRoutes($this, ['routes' => [
    ['name' => 'setting#setValue', 'url' => '/setvalue', 'verb' => 'POST'],
    ['name' => 'setting#getValue', 'url' => '/getvalue', 'verb' => 'POST'],
    ['name' => 'setting#admin', 'url' => '/admin', 'verb' => 'POST'],
    ['name' => 'sonos#getStatus', 'url' => '/sonosstatus', 'verb' => 'POST'],
    ['name' => 'sonos#setQueue', 'url' => '/sonosqueue', 'verb' => 'POST'],
    ['name' => 'sonos#setAction', 'url' => '/sonosaction', 'verb' => 'POST'],
    ['name' => 'sonos#getDebugInfo', 'url' => '/sonosdebug', 'verb' => 'GET'],
    ['name' => 'sonos#getDeviceList', 'url' => '/sonosdevices', 'verb' => 'POST'],
]]);
