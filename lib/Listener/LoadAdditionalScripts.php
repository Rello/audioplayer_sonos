<?php

declare(strict_types=1);

/**
 * Audio Player SONOS
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2019 Marcel Scherello
 */

namespace OCA\audioplayer_sonos\Listener;

use OCA\audioplayer\Event\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

class LoadAdditionalScripts implements IEventListener
{
    public function handle(Event $event): void
    {
        if ($event instanceof LoadAdditionalScriptsEvent) {
            Util::addScript('audioplayer_sonos', 'sonos');
            Util::addStyle('audioplayer_sonos', 'sonos');
        }
    }
}