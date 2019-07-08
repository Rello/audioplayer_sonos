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

namespace OCA\audioplayer\Controller;

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OCP\IL10N;
use OCP\IDbConnection;
use OCP\Share\IManager;
use OCP\ILogger;
use OCP\ITagManager;

/**
 * Controller class for main page.
 */
class DbController extends Controller
{

    private $userId;
    private $l10n;
    private $db;
    private $shareManager;
    private $tagManager;
    private $logger;

    public function __construct(
        $appName,
        IRequest $request,
        $userId,
        IL10N $l10n,
        IDbConnection $db,
        ITagManager $tagManager,
        IManager $shareManager,
        ILogger $logger
    )
    {
        parent::__construct($appName, $request);
        $this->userId = $userId;
        $this->l10n = $l10n;
        $this->db = $db;
        $this->shareManager = $shareManager;
        $this->tagManager = $tagManager;
        $this->logger = $logger;
    }

    /**
     * Get file id for single track
     * @param int $trackId
     * @return int
     */
    public function getFileId($trackId)
    {
        $SQL = "SELECT `file_id` FROM `*PREFIX*audioplayer_tracks` WHERE  `user_id` = ? AND `id` = ?";
        $stmt = $this->db->prepare($SQL);
        $stmt->execute(array($this->userId, $trackId));
        $row = $stmt->fetch();
        return $row['file_id'];
    }

}