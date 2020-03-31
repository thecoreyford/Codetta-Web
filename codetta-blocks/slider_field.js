/**
 * slider_field.js
 * @fileoverview Slider custom field for various Codetta blocks.
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 31 March 2020
 */
'use strict';

goog.provide('Codetta.SliderField');

goog.require('Blockly.Field');
// goog.require('Blockly.fieldRegistry');
// goog.require('Blockly.utils');
// goog.require('Blockly.utils.dom');
// goog.require('Blockly.utils.object');
// goog.require('Blockly.utils.Size');

/**
 * Constructor, initialises defaults.
 */
Codetta.SliderField = function(text, opt_validator, precision, min, max) {
  Codetta.SliderField.superClass_.constructor.call (this, opt_validator, precision,min,max);
};
goog.inherits(Codetta.SliderField, Blockly.FieldNumber);




