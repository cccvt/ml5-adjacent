// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Word2Vec example with p5.js. Using a pre-trained model on common English words.
=== */

// Create the Word2Vec methods
const word2Vec = ml5.word2vec('data/wordvecs10000.json', modelLoaded);
let modelReady = false;

function setup() {
  noLoop();
  noCanvas();

  let nearWordInput = select('#nearword');
  let nearButton = select('#submit');
  let nearResults = select('#results');

  let betweenWordInput1 = select("#between1");
  let betweenWordInput2 = select("#between2");
  let betweenButton = select("#submit2");
  let betweenResults = select("#results2");

  let addInput1 = select("#isto1");
  let addInput2 = select("#isto2");
  let addInput3 = select("#isto3");
  let addButton = select("#submit3");
  let addResults = select("#results3");

  addButton.mousePressed(() => {
    let is1 = addInput1.value();
    let to1 = addInput2.value();
    let is2 = addInput3.value();
    let difference = word2Vec.subtract([to1, is1]);
    let to2 = word2Vec.add([is2, difference[0].vector]);
    addResults.html(to2[0].vector);
  });
}

function modelLoaded() {
  modelReady = true;
}

function findNearest(word, n = 10) {
  if (modelReady) {
    let nearest = word2Vec.nearest(word, n);
    if (!nearest) {
      return 'No word vector found';
    }
    let output = '';
    for (let i = 0; i < nearest.length; i++) {
      output += nearest[i].vector + '<br/>';
    }
    return output;
  }
  return 'Model has not loaded yet!';
}
