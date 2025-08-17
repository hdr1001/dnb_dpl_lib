/* ********************************************************************
//
// D&B Direct+ Data Blocks JavaScript object wrapper
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

import { reqBlockIDs, respBlockStatus, reqRespBlockStatus } from './reqResp.js';
import { htmlGeneral } from './html/companyInfo.js';
import { htmlReqRespBlockStatus } from './html/reqResp.js';

//Check if a variable is an object reference to D&B Direct+ data blocks
function isDnbDplDBsJsObj(dbs) {
    if(typeof dbs === 'object' && dbs.organization) return true;

    return false;
}

//D&B Direct+ Data Blocks JavaScript object wrapper
class DplDBs {
    constructor(dbs) {
        if(isDnbDplDBsJsObj(dbs)) {
            //Store a reference to the object passed in to the constructor
            this.dplDBs = dbs;
        }
        else { //Assume a JSON string or buffer is passed in
            try {
                this.dplDBs = JSON.parse(dbs);

                if(!this.dplDBs.organization) {
                    throw new Error('Invalid D&B Direct+ Data Blocks object: missing organization attribute');
                }
            }
            catch(err) {
                console.error(err.message);
                throw(err);
            }
        }

        //Create a shortcut to the organization attribute
        this.org = this.dplDBs.organization;

        //One-to-one mappings
        this.map121 = { //Directly mapped values
            //Inquiry detail
            inqDuns: this.dplDBs?.inquiryDetail?.duns,
            tradeUp: this.dplDBs?.inquiryDetail?.tradeUp,
            custRef: this.dplDBs?.inquiryDetail?.customerReference,

            //Base data-elements
            duns:        this.org?.duns,
            primaryName: this.org?.primaryName,
            countryISO:  this.org?.countryISOAlpha2Code
        }
    }

    //List the D&B Direct+ Data Blocks requested with level and version
    get reqBlockIDs() { return reqBlockIDs.call(this) }

    //List the D&B Direct+ Data Blocks response with status and reason
    get respBlockStatus() { return respBlockStatus.call(this) }

    //List all the D&B Direct+ Data Blocks request & response details
    get reqRespBlockStatus() { return reqRespBlockStatus.call(this) }

    //D&B Direct+ Data Blocks request & response details in HTML format
    get htmlReqRespBlockStatus() { return htmlReqRespBlockStatus.call(this) }

    //D&B Direct+ Data Blocks base data in HTML format
    get htmlGeneral() { return htmlGeneral.call(this) }

    toString() {
        return `DUNS ${this.map121.duns}: ${this.map121.primaryName} (${this.map121.countryISO})`; 
    }
}

export { DplDBs };
