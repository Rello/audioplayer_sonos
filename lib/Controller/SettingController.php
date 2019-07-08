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

namespace OCA\audioplayer_sonos\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\IConfig;
use OCP\Files\IRootFolder;
use OCP\ITagManager;
use OCP\IDbConnection;
use OCP\ISession;


/**
 * Controller class for main page.
 */
class SettingController extends Controller {
	
	private $userId;
    private $config;
	private $rootFolder;
    private $tagger;
    private $tagManager;
    private $db;
    private $session;
    private $DBController;

    public function __construct(
        $appName,
        IRequest $request,
        $userId,
        IConfig $config,
        IDBConnection $db,
        ITagManager $tagManager,
        IRootFolder $rootFolder,
        ISession $session,
        DbController $DBController
    )
    {
		parent::__construct($appName, $request);
		$this->appName = $appName;
		$this->userId = $userId;
        $this->config = $config;
        $this->db = $db;
        $this->tagManager = $tagManager;
        $this->tagger = null;
        $this->rootFolder = $rootFolder;
        $this->session = $session;
        $this->DBController = $DBController;
	}

    /**
     * @param $type
     * @param $value
     * @return JSONResponse
     */
    public function admin($type, $value)
    {
        //\OCP\Util::writeLog('audioplayer', 'settings save: '.$type.$value, \OCP\Util::DEBUG);
        $this->config->setAppValue($this->appName, $type, $value);
        return new JSONResponse(array('success' => 'true'));
    }

    /**
     * @NoAdminRequired
     * @param $type
     * @param $value
     * @return JSONResponse
     * @throws \OCP\PreConditionNotMetException
     */
	public function setValue($type, $value) {
		//\OCP\Util::writeLog('audioplayer', 'settings save: '.$type.$value, \OCP\Util::DEBUG);
        $this->config->setUserValue($this->userId, $this->appName, $type, $value);
		return new JSONResponse(array('success' => 'true'));
	}

    /**
     * @NoAdminRequired
     * @param $type
     * @return JSONResponse
     */
	public function getValue($type) {
        $value = $this->config->getUserValue($this->userId, $this->appName, $type);

		//\OCP\Util::writeLog('audioplayer', 'settings load: '.$type.$value, \OCP\Util::DEBUG);

		if ($value !== '') {
			$result = [
					'status' => 'success',
					'value' => $value
				];
		} else {
			$result = [
					'status' => 'false',
					'value' =>'nodata'
				];
		}
		
		$response = new JSONResponse();
		$response -> setData($result);
		return $response;
	}

}