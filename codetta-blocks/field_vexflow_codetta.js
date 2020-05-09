/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2020 Corey Ford 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//==========================================================================

/**
 * codetta_vexflow_field.js
 * @fileoverview Custom Positionable Text Field 
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 08 May 2020
 */
'use strict';

goog.provide('Codetta.VexflowField');

goog.require('Blockly.FieldImage');

/**
 */
Codetta.VexflowField = function(src, width, height, x, y) {
  Codetta.VexflowField.superClass_.constructor.call(this, 
                                                    src, 
                                                    width, 
                                                    height, 
                                                    "*", 
                                                    false);

  this.x_ = x;
  this.y_ = y;
};
goog.inherits(Codetta.VexflowField, Blockly.FieldImage);

/**
 * Install a vexflow score onto the block.
 */
Codetta.VexflowField.prototype.init = function() {
  // Build the DOM.
  this.fieldGroup_ = Blockly.createSvgElement('g', {}, null);

  // create a foreign object to put html stuff in
  this.foreignObject_ = Blockly.createSvgElement('foreignObject',
  {
        'x': this.x_,
        'y': this.y_,
        'width': this.width_,
        'height': 60
   });

  // make div for vexflow 
  this.divElement_ = document.createElement('div');
  this.divElement_.style.backgroundColor = "white";

  //=========================================
  // do the vexflow stuff 
  const VF = Vex.Flow;

  var renderer = new VF.Renderer(this.divElement_, VF.Renderer.Backends.SVG);

  renderer.resize(this.width_, 100);

  var context = renderer.getContext();

  var stave = new VF.Stave(0, -30,this.width_);

  stave.addTimeSignature("4/4");

  stave.setContext(context).draw();


  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["g/5"], duration: "q" }) 
  ];


  var voice = [new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes)];
  var formatter = new VF.Formatter().joinVoices(voice).format(voice, this.width_);
  voice.forEach(function(v) { v.draw(context, stave); })

  //=========================================

  // attach eveything to everything else at the end! 
  this.foreignObject_.appendChild(this.divElement_);
  this.fieldGroup_.appendChild(this.foreignObject_);

  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
};






