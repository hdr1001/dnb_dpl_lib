/* ********************************************************************
//
// Destructure D&B Direct+ Data Blocks
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

import { isEmpty } from '../share/utils.js';

export function destructureDbData() {
    //This object will be returned
    const dbData = {};

    //Destructure the D&B Direct+ Data Blocks base info
    const { transactionDetails, inquiryDetail, blockStatus } = this.dplDBs;

    dbData.generic = { base: {} }

    //Add attributes if they add value
    if(!isEmpty(transactionDetails)) dbData.generic.base.transactionDetails = transactionDetails;
    if(!isEmpty(inquiryDetail)) dbData.generic.base.inquiryDetail = inquiryDetail;
    if(!isEmpty(blockStatus)) dbData.generic.base.blockStatus = blockStatus;

    if(!Object.keys(dbData.generic.base).length) delete dbData.generic;

    return dbData;
}
