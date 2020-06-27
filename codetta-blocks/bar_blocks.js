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

  	//===================================================
  	//Variables

  	/** Vexflow Field */
  	var vexField = new Codetta.VexflowField(160, /* width */
                                            200, /* height */
                                            -76, /* x */
                                            +149.5, /* y */
                                            4);

  	/** Array of notes for this bar. */
  	var notes = [];

  	// No of notes filled in this bar.
  	var notesFilled = 4/4; 

	//===================================================
  	//Attributes
    this.appendDummyInput()
        .appendField(vexField, 'tempo_setter');

    this.appendDummyInput()
	    .appendField(new Codetta.ClickableImage("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/button_add.png",
	                                          34, /* width */
	                                          34, /* height */
	                                          "*", /* alt_text */
	                                          false, /* rtl? */
	                                          35 , 4,  /* x and y position */
	                                          function(e)
	                                          {
	                                          	addNote(e);
	                                          }),
	                                          'fourfour_bar_add');

    this.appendDummyInput()
	    .appendField(new Codetta.ClickableImage("https://raw.githubusercontent.com/thecoreyford/Codetta-Web/master/codetta-blocks/media/button_remove.png",
	                                          23, /* width */
	                                          23, /* height */
	                                          "*", /* alt_text */
	                                          false, /* rtl? */
	                                          40 , 37,  /* x and y position */
	                                          function(){removeNote()}),
	                                          'fourfour_bar_remove');
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#008000", "#000000", "#000000");
    this.extension = 120;

    //===================================================
  	//Functions

  	/**
  	 *  Creates the pop-up menu and add's notes to the bar.  
  	 */
    function addNote(e)
    {
      	var menuChoices = [ {
      						    text: "whole = 1/2",
							    enabled: true,
							    callback: function()
							  			{
							  				notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }));
							  				vexField.updateBar(notes);  
							  				Blockly.ContextMenu.hide();
							  			}
							},
      						{
      						    text: "half = 1/2",
							    enabled: true,
							    callback: function()
							  			{
							  				notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }));
							  				vexField.updateBar(notes);  
							  				Blockly.ContextMenu.hide();
							  			}
							},
      						{
      						    text: "\u2669 = 1/4",
							    enabled: true,
							    callback: function()
							  			{
							  				notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }));
							  				vexField.updateBar(notes);  
							  				Blockly.ContextMenu.hide();
							  			}
							},
							{
							   text: "\u266A = 1/8",
							   enabled: true,
							   callback: function()
							  			{
							  				notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }));
							  				vexField.updateBar(notes);  
							  				Blockly.ContextMenu.hide();
							  			}
							}				
						  ];	 

      	Blockly.ContextMenu.show(e, menuChoices, false);
    }

  	/**
  	 *  Removes note from list. 
  	 */
    function removeNote()
    {
    	if(notes.length != 0){	
    		notes.pop();
    		vexField.updateBar(notes);
    	}
    }
  
  }
};