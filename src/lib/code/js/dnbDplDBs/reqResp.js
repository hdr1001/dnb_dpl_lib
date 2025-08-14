/* ********************************************************************
//
// D&B Direct+ Data Blocks request/response data
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

import { splitBlockID } from '../share/utils.js';

//List the D&B Direct+ Data Blocks requested with level and version
//Input, for example:
// blockIDs: [
//   "companyinfo_L2_v1",
//   "principalscontacts_L3_v2"
// ]
//
//Output:
// {
//   companyinfo: { req: { level: 2, version: 1 } },
//   principalscontacts: { req: { level: 3, version: 2 } }
// }
//
function reqBlockIDs() {
    //Return an array in case blockIDs is null or undefined
    if(!this.dbData?.generic?.base?.inquiryDetail?.blockIDs == null) return [];

    //Throw a type error if blockIDs is not an array
    if(!Array.isArray(this.dbData?.generic?.base?.inquiryDetail?.blockIDs)) throw new TypeError('inquiryDetail.blockIDs must be an array');

    //Transform the blockID array of strings
    return this.dbData.generic.base.inquiryDetail.blockIDs.reduce((obj, blockID) => { splitBlockID(obj, blockID); return obj; }, {});
}

//List the D&B Direct+ Data Blocks response with status and reason
//Input, for example:
// blockStatus: [ 
//   { blockID: "companyinfo_L2_v1", status: "ok", reason: null },
//   { blockID: "principalscontacts_L3_v2", status: "ok", reason: null }
// ]
//
//Output:
// {
//   companyinfo: { resp: {level: 2, version: 1, status: "ok", reason: null} },
//   principalscontacts: { resp: {level: 3, version: 2, status: "ok", reason: null} }
// }
//
function respBlockStatus() {
    //Return an array in case blockStatus is null or undefined
    if(this.dbData?.generic?.base?.blockStatus == null) return [];

    //Throw a type error if blockStatus is not an array
    if(!Array.isArray(this.dbData?.generic?.base?.blockStatus)) throw new TypeError('blockStatus must be an array');

    //Transform the blockStatus array of strings
    return this.dbData.generic.base.blockStatus.reduce((obj, block) => {
        const ID = splitBlockID(obj, block.blockID, 'resp');

        obj[ID].resp.status = block.status;
        obj[ID].resp.reason = block.reason;

        return obj;
    }, {});
}

//List all the D&B Direct+ Data Blocks request & response details
//Input, for example:
// {
//   companyinfo: { req: { level: 2, version: 1 } },
//   principalscontacts: { req: { level: 3, version: 2 } }
// }
//
// ... and:
// {
//   companyinfo: { resp: {level: 2, version: 1, status: "ok", reason: null} },
//   principalscontacts: { resp: {level: 3, version: 2, status: "ok", reason: null} },
//   baseinfo: { resp: {level: 1, version: 1, status: "ok", reason: null} }
// }
//
//Output:
// {
//   companyinfo: {
//       req: { level: 2, version: 1 },
//       resp: {level: 2, version: 1, status: "ok", reason: null} }
//   },
//   principalscontacts: {
//       req: { level: 3, version: 2 } },
//       resp: {level: 3, version: 2, status: "ok", reason: null}
//   },
//   baseinfo: {
//       req: { level: 1, version: 1 } },
//       resp: {level: 1, version: 1, status: "ok", reason: null}
//   }
// }
//
function reqRespBlockStatus() {
    //Get both the request and response block status
    const reqBlockIDs = this.reqBlockIDs;
    const respBlockStatus = this.respBlockStatus;

    //Get the data for the requested blocks
    const oReqResp = Object.keys(reqBlockIDs).reduce((obj, blockID) => {
        obj[blockID] = {
            req: reqBlockIDs[blockID].req,
            resp: respBlockStatus[blockID]?.resp
        };
        
        return obj;
    }, {});

    //Get the block status for unrequested blocks
    const keysObjReqResp = Object.keys(oReqResp);

    Object.keys(respBlockStatus).filter(blockID => !keysObjReqResp.includes(blockID)).reduce((obj, blockID) => {
        obj[blockID] = {
            resp: respBlockStatus[blockID].resp
        };

        return obj;
    }, oReqResp);

    //All the information is now combined and ready to be returned
    return oReqResp;
}

export { reqBlockIDs, respBlockStatus, reqRespBlockStatus };
