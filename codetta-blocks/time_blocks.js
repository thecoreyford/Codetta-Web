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
        .appendField(new Codetta.ClickableImage("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/tempo_setter.png",
                                              80, /* width */
                                              80, /* height */
                                              "*", /* alt_text */
                                              false, /* rtl? */
                                              -4 , -8), /* x and y position */
                                              'tempo_setter');
    this.appendDummyInput()
        .appendField(new Codetta.ClickableImage("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/button_plus.png",
                                              27, /* width */
                                              27, /* height */
                                              "*", /* alt_text */
                                              false, /* rtl? */
                                              35 , 3,  /* x and y position */
                                              function(){console.log("plus");}),
                                              'tempo_setter_plus');
    this.appendDummyInput()
        .appendField(new Codetta.ClickableImage("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/button_minus.png",
                                              27, /* width */
                                              27, /* height */
                                              "*", /* alt_text */
                                              false, /* rtl? */
                                              35 , 21.5,  /* x and y position */
                                              function(){console.log("minus");}),
                                              'tempo_setter_minus');
    this.appendValueInput("tempo_setter_value")
        .appendField(new Codetta.PositionableText("0",
                                                  25,35.6), 
                                                  "tempo_setter_value");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ffff00", "#000000", "#000000");
  }
};

