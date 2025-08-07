/* ********************************************************************
//
// CSS formating for HTML tables in Postman
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

const cssTable = () => `
* {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  line-height: 1.5;
}

.wrapper {
  overflow: scroll;
}
  
table {
  border-collapse: collapse;
}

caption {
  margin-block: 0.75rem;
  text-align: center;
  font-style: italic;
}

thead {
  border-block-end: 2px solid;
  background: whitesmoke;
}

tfoot {
  border-block: 2px solid;
  background: whitesmoke;
}

th, td {
  border: 1px solid lightgrey;
  padding: 0.25rem 0.75rem;
}

th[scope="col"] {
  text-align: center;
  padding: 0.25rem 0.75rem;
}

th[scope="row"] {
  text-align: start;
  font-weight: normal;
  background: #f9f9f9;
  font-size: smaller;
  padding: 0.25rem 0.75rem;
}

td {
  font-size: smaller;
}
`;

export { cssTable };
