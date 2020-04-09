/**
 * instrument_blocks.js
 * @fileoverview Instrument blocks for Codetta.
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 1 April 2020
 */
'use strict';

goog.require('Blockly.Blocks');

var string = "https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/instruments/"

//========================================================================================

/** Piano Block */
Blockly.Blocks["piano"] = {
  init: function() {
    this.jsonInit({
      "id": "piano",
      "message0": "%1",
      "args0": [
        {
          "type": "field_image",
          "src":  string + "piano.png",
          "width": 40,
          "height": 40,
          "alt": "piano",
          "flip_rtl": false
        }
      ],
      "inputsInline": true,
      "nextStatement": null,
      "colour": "#663399",
      "colourSecondary": "#000000",
      "colourTertiary": "#000000"
    });
  }
};


//========================================================================================
