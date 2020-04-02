/**
 * time_blocks.js
 * @fileoverview Time blocks for Codetta.
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 30 March 2020
 */
'use strict';

goog.require('Blockly.Blocks');

//========================================================================================

/**
  * Block for repeating bars of music.
  */
Blockly.Blocks['repeat'] = {
  init: function() {
    this.jsonInit({
      "id": "repeat",
      "message0": "%1 %2 %3 %4",
      "args0": [
        {
          "type": "field_image",
          "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
          "width": 15,
          "height": 15,
          "alt": "*",
          "flip_rtl": false
        },
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        },
        {
          "type": "field_image",
          "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
          "width": 15,
          "height": 15,
          "alt": "*",
          "flip_rtl": false
        },
        {
          "type": "input_value",
          "name": "TIMES",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#ffff00",
      "colourSecondary": "#000000",
      "colourTertiary": "#000000"
    });
  }
};

//========================================================================================

/**
  * Block to set the tempo
  */
Blockly.Blocks['tempo_setter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Codetta.SliderField("https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
                                              50, /* width */
                                              50, /* height */
                                              null, /* onClick */
                                              "*", /* alt_text */
                                              false), /* rtl? */
                                              'tempo_setter');
    this.setColour("#ff00ff");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ffff00", "#000000", "#000000");
  }
};

