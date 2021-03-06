/**
 * @license
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.setTestOnly();
goog.require('goog.testing.jsunit');
goog.require('lf.Row');
goog.require('lf.cache.DefaultCache');


function testCache() {
  var cache = new lf.cache.DefaultCache();

  assertArrayEquals([null, null], cache.get([1, 2]));
  var payload = {'id': 'something'};
  var row = new lf.Row(1, payload);
  var row2 = new lf.Row(4, payload);
  var row3 = new lf.Row(3, payload);
  cache.set('Foo', [row, row2]);
  var result = cache.get([0, 1]);
  assertNull(result[0]);
  assertObjectEquals(payload, result[1].payload());
  cache.set('Bar', [row3]);

  assertEquals(3, cache.getCount());
  cache.remove('Foo', [4]);
  assertArrayEquals([null, null], cache.get([0, 4]));
  assertEquals(2, cache.getCount());

  cache.set('Foo', [row2]);
  assertEquals(3, cache.getCount());
  var range = cache.getRange('Foo', 2, 4);
  assertEquals(1, range.length);
  assertObjectEquals(payload, range[0].payload());
  assertEquals(1, cache.getCount('Bar'));
  assertEquals(2, cache.getCount('Foo'));
}
