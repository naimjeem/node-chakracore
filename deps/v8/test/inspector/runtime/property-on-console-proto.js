// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

InspectorTest.log("Tests that property defined on console.__proto__ doesn't observable on other Objects.");

InspectorTest.addScript(`
function testFunction()
{
    var amountOfProperties = 0;
    for (var p in {})
        ++amountOfProperties;
    console.__proto__.debug = 239;
    for (var p in {})
        --amountOfProperties;
    return amountOfProperties;
}`);

Protocol.Runtime.evaluate({ "expression": "testFunction()" }).then(dumpResult);

function dumpResult(result)
{
  InspectorTest.logMessage(result);
  InspectorTest.completeTest();
}
