<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Templating\Loader;

use Symfony\Component\Templating\Storage\FileStorage;
use Symfony\Component\Templating\Storage\Storage;
use Symfony\Component\Templating\TemplateReferenceInterface;

/**
 * CacheLoader is a loader that caches other loaders responses
 * on the filesystem.
 *
 * This cache only caches on disk to allow PHP accelerators to cache the opcodes.
 * All other mechanism would imply the use of `eval()`.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 */
class CacheLoader extends Loader
{
    protected $loader;
    protected $dir;

    /**
     * @param string $dir The directory where to store the cache files
     */
    public function __construct(LoaderInterface $loader, string $dir)
    {
        $this->loader = $loader;
        $this->dir = $dir;
    }

    public function load(TemplateReferenceInterface $template): Storage|false
    {
        $key = hash('sha256', $template->getLogicalName());
        $dir = $this->dir.\DIRECTORY_SEPARATOR.substr($key, 0, 2);
        $file = substr($key, 2).'.tpl';
        $path = $dir.\DIRECTORY_SEPARATOR.$file;

        if (is_file($path)) {
            $this->logger?->debug('Fetching template from cache.', ['name' => $template->get('name')]);

            return new FileStorage($path);
        }

        if (false === $storage = $this->loader->load($template)) {
            return false;
        }

        $content = $storage->getContent();

        if (!is_dir($dir) && !@mkdir($dir, 0777, true) && !is_dir($dir)) {
            throw new \RuntimeException(sprintf('Cache Loader was not able to create directory "%s".', $dir));
        }

        file_put_contents($path, $content);

        $this->logger?->debug('Storing template in cache.', ['name' => $template->get('name')]);

        return new FileStorage($path);
    }

    public function isFresh(TemplateReferenceInterface $template, int $time): bool
    {
        return $this->loader->isFresh($template, $time);
    }
}
