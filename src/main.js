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

document.querySelector('#app').innerHTML = `
  <div>
    <h2>Javascript D&B Direct+ library</h2>
    <p>
      Simple page to test the D&B Direct+ library functionality.
    </p>
    <pre>${new DplDBs({ organization: { primaryName: 'Test Org', duns: '123456789' } })}</pre>
  </div>
`;
