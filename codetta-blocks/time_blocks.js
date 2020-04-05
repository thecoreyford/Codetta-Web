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
Blockly.Blocks['repeater'] = {
  init: function() {
    this.appendStatementInput("repeater")
      .setCheck("Number");
    this.appendValueInput("TIMES")
        .setCheck("Number");
    this.setColour("#ffff00", "#000000", "#000000");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);


  }
};

//========================================================================================

/**
  * Block to set the tempo
  */
Blockly.Blocks['tempo_setter'] = {
  init: function() {
    //Create positionable text (so it can be used with the buttons also!)
    var validator = function(input){
      if(!isNaN(input)){
        if (input < 24){return 24;}
        if (input > 550){return 550;}
      } else {
        return 120;
      }
      return input;
    }
    var value = new Codetta.PositionableText("0",25,35.6,validator);
    value.setValue("120");

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
                                              function()
                                              {
                                                value.setValue((parseInt(value.getValue(),10) + 1));
                                              }),
                                              'tempo_setter_plus');
    this.appendDummyInput()
        .appendField(new Codetta.ClickableImage("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/button_minus.png",
                                              27, /* width */
                                              27, /* height */
                                              "*", /* alt_text */
                                              false, /* rtl? */
                                              35 , 21.5,  /* x and y position */
                                              function()
                                              {
                                                value.setValue((parseInt(value.getValue(),10) - 1));
                                              }),
                                              'tempo_setter_minus');
    this.appendValueInput("tempo_setter_value")
        .appendField (value, "tempo_setter_value");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#ffff00", "#000000", "#000000");
  }
};

