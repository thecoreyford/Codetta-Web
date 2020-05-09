/**
 * bar_blocks.js
 * @fileoverview Bar Blocks for Codetta
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 09 April 2020
 */
'use strict';

goog.require('Blockly.Blocks');

/**
  * Block to set the tempo
  */
Blockly.Blocks['fourfour_bar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Codetta.VexflowField("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/tempo_setter.png",
                                              160, /* width */
                                              200, /* height */
                                              -76, /* x */
                                              +149.5), /* y position */
                                              'tempo_setter');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#008000", "#000000", "#000000");
    this.extension = 120;
  }
};

