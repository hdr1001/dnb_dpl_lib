/* ********************************************************************
//
// D&B Direct+ Data Blocks in HTML format
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

import { htmlContent } from '../share/utils.js';
import { reqRespBlockStatus } from './reqResp.js';

function htmlReqRespBlockStatus() {
    const data = reqRespBlockStatus.call(this);

    if(!data) return '';

    let sHTML = `
<table>
    <caption>D&amp;B Direct+ request &amp; response block status</caption>

    <thead>
        <tr>
            <th></th>
            <th colspan="2">Request</th>
            <th colspan="4">Response</th>
        </tr>

        <tr>
            <th scope="col">Block ID</th>
            <th scope="col">Level</th>
            <th scope="col">Version</th>
            <th scope="col">Level</th>
            <th scope="col">Version</th>
            <th scope="col">Status</th>
            <th scope="col">Reason</th>
        </tr>
    </thead>

    <tbody>
`;

    sHTML += Object.keys(data).map(block => `
        <tr>
            <th scope="row">${htmlContent(block)}</th>
            <td>${htmlContent(data[block].req?.level)}</td>
            <td>${htmlContent(data[block].req?.version)}</td>
            <td>${htmlContent(data[block].resp?.level)}</td>
            <td>${htmlContent(data[block].resp?.version)}</td>
            <td>${htmlContent(data[block].resp?.status)}</td>
            <td>${htmlContent(data[block].resp?.reason)}</td>
        </tr>
    `).join('\n');

    sHTML += `
    </tbody>
</table>
`;

    return sHTML;
}

function htmlBase() {
    let sHTML = `
<table>
    <thead>
        <tr>
            <th colspan="2">Common data</th>
        </tr>
    </thead>

    <tbody>
        ${this.map121.inqDuns !== this.map121.duns ? `
        <tr>
            <th scope="row">DUNS requested</th>
            <td>${htmlContent(this.map121.inqDuns)}</td>
        </tr>
        <tr>
            <th scope="row">Trade-up</th>
            <td>${htmlContent(this.map121.tradeUp)}</td>
        </tr>
        ` : ''}
        <tr>
            <th scope="row">DUNS delivered</th>
            <td>${htmlContent(this.map121.duns)}</td>
        </tr>
        <tr>
            <th scope="row">Primary Name</th>
            <td>${htmlContent(this.map121.primaryName)}</td>
        </tr>
        <tr>
            <th scope="row">Country ISO</th>
            <td>${htmlContent(this.map121.countryISO)}</td>
        </tr>
    </tbody>
</table>
`;

    return sHTML;
}

export {
    htmlReqRespBlockStatus,
    htmlBase
};
