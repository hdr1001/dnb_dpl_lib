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
        else {
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
    }

    toString() {
        return this.org.primaryName + ' (' + this.org.duns + ')'; 
    }
}

export { DplDBs };
