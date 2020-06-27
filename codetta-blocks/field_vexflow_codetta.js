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

// Constant for vexflow
const VF = Vex.Flow;

/**
 *
 */
Codetta.VexflowField = function(width, height, x, y, no_crotchets) {
  Codetta.VexflowField.superClass_.constructor.call(this, 
                                                    null, 
                                                    width, 
                                                    height, 
                                                    "*", 
                                                    false);

  this.x_ = x;
  this.y_ = y;
  this.no_crotchets_ = no_crotchets;
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

  this.renderer_ = new VF.Renderer(this.divElement_, VF.Renderer.Backends.SVG);

  this.renderer_.resize(this.width_, 100);

  this.context_ = this.renderer_.getContext();

  var notes = [ ];
  for (var i = 0; i < this.no_crotchets_; ++i)
  {
    notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }));
  }
  this.updateBar(notes);

  //=========================================

  // attach eveything to everything else at the end! 
  this.foreignObject_.appendChild(this.divElement_);
  this.fieldGroup_.appendChild(this.foreignObject_);

  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
};


/**
 *    
 */
Codetta.VexflowField.prototype.updateBar = function(noteData) {
  console.log(this.context_);
  this.context_.clear();

  this.stave_ = new VF.Stave(0, -30, this.width_);
  this.stave_.addTimeSignature(this.no_crotchets_.toString() + "/4");
  this.stave_.setContext(this.context_).draw();

  var beams = VF.Beam.generateBeams(noteData);
  VF.Formatter.FormatAndDraw(this.context_, this.stave_, noteData);
  var contextCopy = this.context_; // not sure why this is needed by hey ho!
  beams.forEach(function(b) {b.setContext(contextCopy).draw()})
    
};

