'use strict';

function _toConsumableArray(arr: string | any[] | Iterable<unknown> | ArrayLike<unknown>) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { glob } from "glob";
import fs from 'fs'

/**
 * Get Consolidated JSON Report Array
 * @param {string} options.parallelExecutionReportDirectory - Path to Parallel Execution Report Directory where all the Reports will be saved
 * @return {Array}
 */
var getConsolidatedArray = function getConsolidatedArray(options: { parallelExecutionReportDirectory: string; }): Array<any> {

    try {

        var jsonArray = [];

        var jsonReportPaths = glob.sync(options.parallelExecutionReportDirectory + '/*.json', { sync: true });

        if (jsonReportPaths != null) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = jsonReportPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    var content = fs.readFileSync(value, 'utf8');
                    var data = JSON.parse(content);
                    jsonArray = [].concat(_toConsumableArray(jsonArray), _toConsumableArray(data));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var filteredArray = [];
            jsonArray.forEach(function (item) {
                if (item.hasOwnProperty('elements')) {
                    var existing = filteredArray.filter(function (element) {
                        return element.id == item.id;
                    });
                    if (existing.length) {
                        var existingIndex = filteredArray.indexOf(existing[0]);
                        filteredArray[existingIndex].elements = filteredArray[existingIndex].elements.concat(item.elements);
                    } else {
                        filteredArray.push(item);
                    }
                }
            });

            return filteredArray;
        } else {
            console.log('No JSON Files found in ' + options.parallelExecutionReportDirectory);
        }
    } catch (e) {
        console.log('Error: ', e);
    }
};

export default getConsolidatedArray;