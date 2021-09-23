<?php
/**
 * Audio Player SONOS
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the LICENSE.md file.
 *
 * @author Marcel Scherello <audioplayer@scherello.de>
 * @copyright 2016-2021 Marcel Scherello
 */

namespace OCA\audioplayer_sonos\Controller;

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OCP\IL10N;
use OCP\IDBConnection;
use Psr\Log\LoggerInterface;
/**
 * Controller class for main page.
 */
class DbController extends Controller
{

    private $userId;
    private $db;
    private $logger;

    public function __construct(
        $appName,
        IRequest $request,
        $userId,
        IDbConnection $db,
        LoggerInterface $logger
    )
    {
        parent::__construct($appName, $request);
        $this->userId = $userId;
        $this->db = $db;
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