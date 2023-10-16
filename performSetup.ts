'use strict';

import featureFileSplitter from "./featureFileSplitter";

var tmpFeatureFiles = new featureFileSplitter();
import fs from 'fs-extra'

/**
 * Compile and create splitted files
 * @param {string} options.sourceSpecDirectory - glob expression for sourceSpecDirectory
 * @param {string} options.tmpSpecDirectory - Path to temp folder containing the Temporary Feature Files 
 * @param {string} [options.tagExpression] - Tag expression to parse
 * @param {string} [options.ff] - Feature File Name to parse
 * @param {string} [options.lang] - Language of sourceSpecDirectory
 * @param {Boolean} [options.cleanTmpSpecDirectory] - Boolean for cleaning the Temp Spec Directory 
 * @return {Promise<void>}
 */
var performSetup = function performSetup(options) {
    try {

        if (options.cleanTmpSpecDirectory) {
            //Remove Tmp Spec Directory during setup & Create One
            fs.removeSync(options.tmpSpecDirectory);
        }

        fs.ensureDirSync(options.tmpSpecDirectory);

        //Compile and Create Split Feature Files
        tmpFeatureFiles.compile({
            sourceSpecDirectory: options.sourceSpecDirectory,
            tmpSpecDirectory: options.tmpSpecDirectory,
            tagExpression: options.tagExpression,
            ff: options.ff,
            lang: options.lang
        });
    } catch (e) {
        console.log('Error: ', e);
    }
};

export default performSetup;