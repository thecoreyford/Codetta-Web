/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Modified from field_image.js by Corey Ford (02 April 2020).
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

/**
 * @fileoverview Slider, used for number blocks.
 * @author corey2.ford@live.uwe.ac.uk (Corey Ford)
 */
'use strict';

goog.provide('Codetta.SliderField');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.math.Size');
goog.require('goog.userAgent');

/**
 * Class for a codetta slider, based on a clickable image.
 */
Codetta.SliderField = function(src, width, height, opt_alt, flip_rtl) {
  this.sourceBlock_ = null;
  // Ensure height and width are numbers.  Strings are bad at math.
  this.height_ = Number(height);
  this.width_ = Number(width);
  this.size_ = new goog.math.Size(this.width_, this.height_);
  this.text_ = opt_alt || '';
  this.flipRTL_ = flip_rtl;
  this.setValue(src);

  this.clickEvent = clicked;
};
goog.inherits(Codetta.SliderField, Blockly.Field);

/**
 * Rectangular mask used by Firefox.
 * @type {Element}
 * @private
 */
Codetta.SliderField.prototype.rectElement_ = null;

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Codetta.SliderField.prototype.EDITABLE = false;

/**
 * Install this image on a block.
 */
Codetta.SliderField.prototype.init = function() {
  if (this.fieldGroup_) {
    // Image has already been initialized once.
    return;
  }
  // Build the DOM.
  this.fieldGroup_ = Blockly.createSvgElement('g', {}, null); //like parent component!
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }
  /** @type {SVGElement} */
  this.imageElement_ = Blockly.createSvgElement('image',
      {'height': this.height_ + 'px',
       'width': this.width_ + 'px',
   		'x': -4,
   		'y': -8}, this.fieldGroup_);
  this.setValue(this.src_);

  if (goog.userAgent.GECKO) {
    /**
     * Due to a Firefox bug which eats mouse events on image elements,
     * a transparent rectangle needs to be placed on top of the image.
     */
    this.rectElement_ = Blockly.createSvgElement('rect',
        {'height': this.height_ + 'px',
         'width': this.width_ + 'px',
         'fill-opacity': 0}, this.fieldGroup_);
  }
  //====

  //====
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  // Configure the field to be transparent with respect to tooltips.
  var topElement = this.rectElement_ || this.imageElement_;
  topElement.tooltip = this.sourceBlock_;
  Blockly.Tooltip.bindMouseEvents(topElement);

  // add click listener to function
  // with thanks to this thread: https://groups.google.com/forum/#!topic/blockly/iv-CDztU4Go
  if (this.clickEvent) {
  	this.imageElement_.addEventListener("click", this.clickEvent);

  }
};

var clicked = function(){
	//TODO: do stuff here!
}

/**
 * Dispose of all DOM objects belonging to this text.
 */
Codetta.SliderField.prototype.dispose = function() {
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
  this.imageElement_ = null;
  this.rectElement_ = null;
  this.clickEvent = null;
};

/**
 * Change the tooltip text for this field.
 * @param {string|!Element} newTip Text for tooltip or a parent element to
 *     link to for its tooltip.
 */
Codetta.SliderField.prototype.setTooltip = function(newTip) {
  var topElement = this.rectElement_ || this.imageElement_;
  topElement.tooltip = newTip;
};

/**
 * Get the source URL of this image.
 * @return {string} Current text.
 * @override
 */
Codetta.SliderField.prototype.getValue = function() {
  return this.src_;
};

/**
 * Set the source URL of this image.
 * @param {?string} src New source.
 * @override
 */
Codetta.SliderField.prototype.setValue = function(src) {
  if (src === null) {
    // No change if null.
    return;
  }
  this.src_ = src;
  if (this.imageElement_) {
    this.imageElement_.setAttributeNS('http://www.w3.org/1999/xlink',
        'xlink:href', goog.isString(src) ? src : '');
  }
};

/**
 * Get whether to flip this image in RTL
 * @return {boolean} True if we should flip in RTL.
 */
Codetta.SliderField.prototype.getFlipRTL = function() {
  return this.flipRTL_;
};

/**
 * Set the alt text of this image.
 * @param {?string} alt New alt text.
 * @override
 */
Codetta.SliderField.prototype.setText = function(alt) {
  if (alt === null) {
    // No change if null.
    return;
  }
  this.text_ = alt;
};

/**
 * Images are fixed width, no need to render.
 * @private
 */
Codetta.SliderField.prototype.render_ = function() {
  // NOP
};
