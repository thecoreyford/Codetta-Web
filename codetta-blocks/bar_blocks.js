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
Blockly.Blocks['fourfour_bar'] = 
{
  init: function() 
  {

  	//===================================================
  	//Variables

  	/** Vexflow Field */
  	var vexField = new Codetta.VexflowField(160, /* width */
                                            200, /* height */
                                            -76, /* x */
                                            +149.5, /* y */
                                            4);

  	//TODO: move note picker
  	// willl need to create field variables here and adjust as needed!!!!

  	/** Array of notes for this bar. */
  	var notes = [];

  	var notePickerHead = 0;
  	var previouslyAddedRests = 0;

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
	                                          function(e){
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
	                                          function(){
	                                          	removeNote();
	                                          }),
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
    	// menu options 
    	var whole = {text: "whole = 1/2",
				     enabled: true,
				     callback: function()
				  			   {
				  			  	clearRests();
				  				notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }));
				  				notePickerHead = 8;
				  				addRestsToBar();
				  				vexField.updateBar(notes);  
				  				Blockly.ContextMenu.hide();
				  			   }
					};

		var half = {text: "half = 1/2",
				    enabled: true,
				    callback: function()
				  			  {
				  			  	clearRests();
				  				notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }));
				  				notePickerHead += 4;
				  				addRestsToBar();
				  				vexField.updateBar(notes);  
				  				Blockly.ContextMenu.hide();
				  			  }
					};

		var quarter = {text: "\u2669 = 1/4",
					   enabled: true,
					   callback: function()
								 {
								 	clearRests();
									notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }));
									notePickerHead += 2;
									addRestsToBar();
									vexField.updateBar(notes);  
									Blockly.ContextMenu.hide();
								 }
					  };

		var eight = {text: "\u266A = 1/8",
					 enabled: true,
				     callback: function()
				  			   {
				  			 	 clearRests();
				  				 notes.push(new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "8" }));
				  				 notePickerHead += 1;
				  				 addRestsToBar();
				  				 vexField.updateBar(notes);  
				  				 Blockly.ContextMenu.hide();
				  			   }
					};	

		// populate adjusted menu choices
      	var menuChoices = [];
      	if (notePickerHead <= 0) { menuChoices.push(whole)};
      	if (notePickerHead <= 4) { menuChoices.push(half)};
      	if (notePickerHead <= 6) { menuChoices.push(quarter)};
      	if (notePickerHead <= 7) { menuChoices.push(eight)};

      	Blockly.ContextMenu.show(e, menuChoices, false);
    }

  	/**
  	 *  Removes note from list. 
  	 */
    function removeNote()
    {
    	clearRests();
    	if(notes.length != 0){
    		//get length of last note (update notePicker Head accordingly 
    		var last = notes[notes.length - 1].duration;
    		if(last == 'w'){}
    		switch(last){
    			case 'w':
    				notePickerHead -= 8;
    				break;
    			case 'h':
    				notePickerHead -= 4;
    				break;
    			case 'q':
    				notePickerHead -= 2;
    				break;
    			case '8':
    				notePickerHead -= 1;
    				break;
    			default:
    				console.log("default");
    				break;
    		}
    		// remove this note
    		notes.pop();
    		// add rests back to the bar and update
    		addRestsToBar();
    		vexField.updateBar(notes);
    	}
    }

    /** 
     * Removes all rests from the bar. 
     */
    function clearRests()
    {
    	for(var i = 0; i < previouslyAddedRests; ++i){
    		notes.pop();
    	}
    }

    /** 
     * Adds remaining rests to the bar. 
     */
    function addRestsToBar()
    {
    	previouslyAddedRests = 0;
    	var noRests = 8 - notePickerHead; 
    	while(noRests != 0)
    	{
			if(noRests % 2 == 1)
			{
				notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "8r" }));
				noRests -= 1;
				previouslyAddedRests += 1;
			}
			else
			{
				notes.push(new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }));
				noRests -= 2;
				previouslyAddedRests += 1;
			}
    	}
    }
  
  }
};