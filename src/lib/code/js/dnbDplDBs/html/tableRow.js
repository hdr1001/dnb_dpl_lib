/* ********************************************************************
//
// Table row for listing D&B Direct+ Data Blocks data-elements
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

import { htmlContent } from './utils.js';

class TableRow {
    constructor(header, content, note) {
        this.header = {};
        this.header.text = header;
        this.header.note = note;
        this.content = content;
    }

    htmlRender() {
        //Return a single table row
        if(!Array.isArray(this.content) || (Array.isArray(this.content) && this.content.length === 1)) {
            return `
                <tr>
                    <th scope="row"}">
                        ${htmlContent(this.header.text) + 
                            (this.header.note ? `<br /><small>${'*' + htmlContent(this.header.note)}</small>` : '')}
                    </th>
                    <td>${Array.isArray(this.content) ? this.content[0] : htmlContent(this.content)}</td>
                </tr>
            `;
        }

        //Return a multiple table rows
        return this.content.map((elem, index) => `
            <tr>
                ${index === 0 ? `
                <th scope="row" rowspan="${this.content.length}">
                    ${htmlContent(this.header.text) +
                        (this.header.note ? `<br /><small>${'*' + htmlContent(this.header.note)}</small>` : '')}
                </th>
                ` : ''}
                <td>${htmlContent(elem)}</td>
            </tr>
        `).join('');
    }
}

export default TableRow;
