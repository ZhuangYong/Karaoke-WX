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
}

export default copydev;
