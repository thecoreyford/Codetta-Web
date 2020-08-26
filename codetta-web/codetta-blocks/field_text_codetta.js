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
 * codetta_text_field.js
 * @fileoverview Custom Positionable Text Field 
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 05 April 2020
 */
'use strict';


goog.provide('Codetta.PositionableText');

goog.require('Blockly.FieldTextInput');
// goog.require('goog.dom');
// goog.require('goog.math.Size');
// goog.require('goog.userAgent');

/**
 * Class for a positionable, and clickable image. 
 */
Codetta.PositionableText = function(text, opt_x, opt_y, opt_validator) {
  Blockly.FieldTextInput.superClass_.constructor.call(this, text,
      opt_validator);

  this.opt_x_ = opt_x || 0;
  this.opt_y_ = opt_y || 0;
};
goog.inherits(Codetta.PositionableText, Blockly.FieldTextInput);

/**
 * Install this field on a block.
 * Borrow's from fraser@google.com (Neil Fraser), field.js 
 */
Codetta.PositionableText.prototype.init = function() {
  if (this.fieldGroup_) { return;}
  // Build the DOM.
  this.fieldGroup_ = Blockly.createSvgElement('g', {}, null);
  if (!this.visible_) { this.fieldGroup_.style.display = 'none'; }

  // do stuff for RTL if ever needed
  var fieldX = (this.sourceBlock_.RTL) ? -this.size_.width / 2 : this.size_.width / 2;

  // Here is where the modification is made, as we
  // can now move the filed around based on opt x and opt y! 
  this.textElement_ = Blockly.createSvgElement('text',
      {'class': 'blocklyText',
       'x': fieldX + this.opt_x_,
       'y': this.size_.height / 2 + Blockly.BlockSvg.FIELD_TOP_PADDING + this.opt_y_,
       'text-anchor': 'middle'},
      this.fieldGroup_);

  // add click binding and all that  
  this.updateEditable();
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);
  this.mouseUpWrapper_ =
      Blockly.bindEvent_(this.getClickTarget_(), 'mouseup', this,
          this.onMouseUp_);

  // Render.
  this.updateTextNode_();
  if (Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.Change(
        this.sourceBlock_, 'field', this.name, '', this.getValue()));
  }
};
