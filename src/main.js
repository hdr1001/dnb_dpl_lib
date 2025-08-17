/* ********************************************************************
//
// The main JavaScript code file powering the app's index page
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

import { DplDBs } from './lib/exp.js';

const dnbDplDBs = new DplDBs( {
      inquiryDetail: {
        duns: "489478007",
        blockIDs: [
            "companyinfo_L2_v1",
            "principalscontacts_L3_v2"
        ],
        tradeUp: "hq"
      },
      organization: {
        primaryName: 'Test Org',
        duns: '123456789',
        countryISOAlpha2Code: 'NL',
        registeredName:"Reg name",
        tradeStyleNames: ['Trade Style 1', 'Trade Style 2', 'Trade Style 3'],
        "multilingualPrimaryName": [
            {
                "language": {
                    "description": "Chinese",
                    "dnbCode": 339
                },
                "name": "美商鄧白氏股份有限公司台灣分公司",
                "writingScript": {}
            },
            {
                "language": {
                    "description": "US English",
                    "dnbCode": 331
                },
                "name": "Dun & Bradstreet International, Ltd. TAIWAN BRANCH",
                "writingScript": {}
            }
        ],
        dunsControlStatus: {
          operatingStatus: {
              description: "Active",
              dnbCode: 9074,
              startDate: null
          },
          operatingSubStatus: {
              description: "Active",
              dnbCode: 9074,
              startDate: null
          },
          detailedOperatingStatus: {
              description: "Operationally Active",
              dnbCode: 29929
          }
        },
      },
      blockStatus: [
        {
            blockID: "companyinfo_L2_v1",
            status: "ok",
            reason: null
        },
        {
            blockID: "principalscontacts_L3_v2",
            status: "ok",
            reason: null
        },
        {
            blockID: "baseinfo_L1_v1",
            status: "ok",
            reason: null
        }
      ]
    });

document.querySelector('#app').innerHTML = `
  <div>
    <h2>Javascript D&B Direct+ library</h2>
    <p>
      Simple page to test the D&B Direct+ library functionality.
    </p>
    <h3>${dnbDplDBs}</h3>
    <div>${dnbDplDBs.htmlGeneral}</div>
    <div>${dnbDplDBs.htmlReqRespBlockStatus}</div>
  </div>
`;
