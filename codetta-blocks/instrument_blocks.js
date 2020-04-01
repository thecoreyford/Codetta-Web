/**
 * instrument_blocks.js
 * @fileoverview Instrument blocks for Codetta.
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 1 April 2020
 */
'use strict';

goog.require('Blockly.Blocks');

//========================================================================================

/** Array of instruments, media files should match*/
var inst = [
	"piano", 
	"glock", 
	"violin", 
	"viola", 
	"cello", 
	"trumpet", 
	"synth"
];

for(var i = 0; i < inst.length; ++i){
	Blockly.Blocks[inst[i]] = {
	  /**
	   * Instrument block
	   */
	  init: function() {
	    this.jsonInit({
	      "id": inst[i],
	      "message0": "%1",
	      "args0": [
	        {
	          "type": "field_image",
	          "src": Blockly.mainWorkspace.options.pathToMedia + "icons/event_whenflagclicked.svg", //TODO: replace with media
	          "width": 40,
	          "height": 40,
	          "alt": "piano",
	          "flip_rtl": true
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
}


