<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Scheduler\Generator;

use Symfony\Component\Scheduler\RecurringMessage;

/**
 * @internal
 *
 * @extends \SplHeap<array{\DateTimeImmutable, int, RecurringMessage}>
 *
 * @experimental
 */
final class TriggerHeap extends \SplHeap
{
    public function __construct(
        public \DateTimeImmutable $time,
    ) {
    }

    /**
     * @param array{\DateTimeImmutable, int, RecurringMessage} $value1
     * @param array{\DateTimeImmutable, int, RecurringMessage} $value2
     */
    protected function compare(mixed $value1, mixed $value2): int
    {
        return $value2[0] <=> $value1[0] ?: $value2[1] <=> $value1[1];
    }
}
