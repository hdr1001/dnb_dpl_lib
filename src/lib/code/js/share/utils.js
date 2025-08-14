/* ********************************************************************
//
// Miscellaneous utility functions
//
// Copyright 2025 Hans de Rooij
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, 
// software distributed under the License is distributed on an
// "AS IS" BASIS,WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied. See the License for the specific  
// language governing permissions and limitations under the 
// License.
//
// ***************************************************************** */

import { constDnbDplDBs } from '../dnbDplDBs/const.js';

//Prepare JS content for display in HTML
const htmlContent = inp => {
    if (inp == null) return ''; //Handle null or undefined

    if (typeof inp === 'string') { //Handle strings
        return inp.replace(
            /[&<>'"]/g,
            tag =>
                ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&#39;',
                    '"': '&quot;'
                }[tag] || tag
            ))
    }

    return String(inp);
};

//Determine if a value is empty (null, undefined, or empty string)
const isEmpty = value => {
    //Null or undefined are both empty
    if(value == null) return true;

    switch(typeof value) {
        //An empty string is empty
        case 'string':
            return value.trim() === '';

        //Numbers and booleans are not empty
        case 'number':
        case 'boolean':
            return false;

        case 'object':
            if(Array.isArray(value))
                return value.length === 0;
            else
                return value.constructor === Object && Object.keys(value).length === 0;

        default:
            console.error(`Unexpected type in function isEmpty: ${typeof value}, ${value}`);
            return false;
    }
};

//Split a blockID like "principalscontacts_L3_v2" and return an object version
const splitBlockID = ( obj, blockID, reqResp = 'req' ) => {
    const arrBlockID = blockID.split('_');

    obj[arrBlockID[constDnbDplDBs.blockIDs.key]] = {
        [reqResp]: {
            level: parseInt( arrBlockID[constDnbDplDBs.blockIDs.level].substring(1) ),
            version: parseInt( arrBlockID[constDnbDplDBs.blockIDs.ver].substring(1) )
        }
    }

    return arrBlockID[constDnbDplDBs.blockIDs.key];
};

export {
    htmlContent,
    isEmpty,
    splitBlockID
};
