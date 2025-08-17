/* ********************************************************************
//
// D&B Direct+ Data Blocks Company Information data
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
import TableRow from './html/tableRow.js';

//Get operating status out of DUNS control status
function opStatus(ctrlStatus) {
    const arrRet = [];

    if(ctrlStatus?.operatingStatus?.description) arrRet.push(ctrlStatus.operatingStatus.description);
    if(ctrlStatus?.detailedOperatingStatus?.description) arrRet.push(ctrlStatus.detailedOperatingStatus.description);

    return arrRet;
}

//Add multilingual names
function addMultilingualNames(tableRows, header, multilingualNames) {
    const mlpn = multilingualNames.filter(elem => elem.language.dnbCode != 331) //Filter out US English

    if(mlpn.length) {
        const mapLanguages = new Map(mlpn.map(elem => [elem.language.dnbCode, elem.language.description]));

        mapLanguages.forEach((description, dnbCode) => 
            tableRows.push(new TableRow(
                header, 
                mlpn.filter(elem => elem.language.dnbCode === dnbCode).map(elem => elem.name),
                description
            ))
        )
    }
}

function tableRowsGeneral() {
    //This object will be returned
    const tableRows = [];

    if(this.map121.inqDuns !== this.map121.duns) {
        if(!isEmpty(this.map121.inqDuns)) tableRows.push(new TableRow('DUNS requested', this.map121.inqDuns));
        if(!isEmpty(this.map121.tradeUp)) tableRows.push(new TableRow('Trade-up', this.map121.tradeUp));
    }
    if(!isEmpty(this.map121.duns)) tableRows.push(new TableRow('DUNS delivered', this.map121.duns));
    if(!isEmpty(this.map121.primaryName)) tableRows.push(new TableRow('Primary name', this.map121.primaryName));
    if(!isEmpty(this.map121.countryISO)) tableRows.push(new TableRow('Country ISO', this.map121.countryISO));

    //Destructure the D&B Direct+ Company information Data Block
    const { registeredName, tradeStyleNames, dunsControlStatus,
                multilingualPrimaryName, multilingualRegisteredNames, multilingualTradestyleNames,
                businessEntityType, legalForm, registeredDetails,
                controlOwnershipType, preferredLanguage,
                startDate, incorporatedDate } = this.org;

    //Add Company Information attributes if they add value
    if(!isEmpty(registeredName)) tableRows.push(new TableRow('Registered name', registeredName));
    if(!isEmpty(tradeStyleNames)) tableRows.push(new TableRow('Trade styles', tradeStyleNames));
    if(!isEmpty(multilingualPrimaryName)) {
    }
    if(!isEmpty(dunsControlStatus)) {
        tableRows.push(new TableRow('Operating status', opStatus(dunsControlStatus)))
    }
    if(!isEmpty(multilingualPrimaryName)) addMultilingualNames(tableRows, 'Primary name', multilingualPrimaryName);
    if(!isEmpty(multilingualRegisteredNames)) addMultilingualNames(tableRows, 'Registered name', multilingualRegisteredNames);
    if(!isEmpty(multilingualTradestyleNames)) addMultilingualNames(tableRows, 'Trade styles', multilingualTradestyleNames);
    /*
    if(!isEmpty(businessEntityType)) tableRows.general.ci.businessEntityType = businessEntityType;
    if(!isEmpty(legalForm)) tableRows.general.ci.legalForm = legalForm;
    if(!isEmpty(registeredDetails)) tableRows.general.ci.registeredDetails = registeredDetails;
    if(!isEmpty(controlOwnershipType)) tableRows.general.ci.controlOwnershipType = controlOwnershipType;
    if(!isEmpty(preferredLanguage)) tableRows.general.ci.preferredLanguage = preferredLanguage;
    if(!isEmpty(startDate)) tableRows.general.ci.startDate = startDate;
    if(!isEmpty(incorporatedDate)) tableRows.general.ci.incorporatedDate = incorporatedDate;
    */
    return tableRows;
}

export {
    tableRowsGeneral
};
