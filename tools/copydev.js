/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from "path";
import chokidar from "chokidar";
import {cleanDir, copyDir, copyFile, makeDir} from "./lib/fs";
import {format} from "./run";

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copydev() {
    await makeDir('build');
    await Promise.all([
        copyFile('src/apple-touch-icon.png', 'build/apple-touch-icon.png'),
        copyFile('src/favicon.ico', 'build/favicon.ico'),
        copyFile('src/tile.png', 'build/tile.png'),
        copyFile('src/tile-wide.png', 'build/tile-wide.png'),
        copyDir('testapi', 'build'),
    ]);

    if (process.argv.includes('--watch')) {
        const watcher = chokidar.watch([
            'public/**/*',
        ], {ignoreInitial: true});

        watcher.on('all', async (event, filePath) => {
            const start = new Date();
            const src = path.relative('./', filePath);
            const dist = path.join('build/', src.startsWith('src') ? path.relative('src', src) : src);
            switch (event) {
                case 'add':
                case 'change':
                    await makeDir(path.dirname(dist));
                    await copyFile(filePath, dist);
                    break;
                case 'unlink':
                case 'unlinkDir':
                    cleanDir(dist, {nosort: true, dot: true});
                    break;
                default:
                    return;
            }
            const end = new Date();
            const time = end.getTime() - start.getTime();
            console.info(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
        });
    }
}

export default copydev;
