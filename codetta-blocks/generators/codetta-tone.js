/**
 * codetta-tone.js
 * @fileoverview Code generators for Tone JS, for Codetta.
 * @author corey2.ford@live.uwe.ac.uk <Corey Ford>
 * @date 09 July 2020
 */
'use strict';

goog.provide('Blockly.CodettaTone');
goog.require('Blockly.Generator');
// goog.require('Blockly.utils.global');
// goog.require('Blockly.utils.string');

//======================================================================


Blockly.CodettaTone = new Blockly.Generator("CodettaTone");

// trackers 
var PLAY_HEAD = 0; 


Blockly.CodettaTone.init = function(workspace) {
	PLAY_HEAD = 0;
};

Blockly.CodettaTone.finish = function(code) {
  return code;
};

Blockly.CodettaTone.scrub_ = function(block, code, opt_thisOnly) {
  return code; 
};

/**
 * Generate code for all blocks in the workspace to the specified language.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 * @return {string} Generated code.
 */
Blockly.CodettaTone.workspaceToCode = function(workspace) {
  var code = [];
  this.init(workspace);
  var blocks = workspace.getTopBlocks(true);
  for (var x = 0, block; block = blocks[x]; x++) 
  {
    var line = this.blockToCode(block);
    code.push(line);

    while(block.getNextBlock() != null){
    	block = block.getNextBlock();
    	var line = this.blockToCode(block);
    	code.push(line);
    }

    // if (goog.isArray(line)) {
      // Value blocks return tuples of code and operator order.
      // Top-level blocks don't care about operator order.
      // line = line[0];
    // }
    // if (line) {
      // if (block.outputConnection && this.scrubNakedValue) {
        // This block is a naked value.  Ask the language's code generator if
        // it wants to append a semicolon, or something.
        // line = this.scrubNakedValue(line);
      // } 
    // }
  }
  code = code.join('\n');  // Blank line between each section.
  code = this.finish(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
};
//======================================================================

Blockly.CodettaTone["piano"] = function(block) {
	console.log(block.getNextBlock());
  return "var polySynth = new Tone.PolySynth(32, Tone.FMSynth); polySynth.connect(vol); var head = 0;";
};

Blockly.CodettaTone['fourfour_bar'] = function(block) {
  var code = "";
  var field = block.getField('vex_field');
  var theNotes = field.noteDataCopy_;

  	code += "var seq = new Tone.Sequence(function(time){"; // move to start block
  	console.log(theNotes);

  for(var i = 0; i < theNotes.length; ++i)
  {
  	var note = theNotes[i].keys[0][0];
  	var pitch = theNotes[i].keys[0][2];
  	var type = theNotes[i].noteType;

  	if(type != "r")
  	{
  		code += "if(head == " + PLAY_HEAD + "){polySynth.triggerAttackRelease(\"" + (note+pitch) + "\",\"16n\");}";
  	}

  	//...get rhythm and push playhead accordingly 
  	switch(theNotes[i].duration)
  	{
		case 'w':
			PLAY_HEAD += 8;
			break;
		case 'h':
			PLAY_HEAD += 4;
			break;
		case 'q':
			PLAY_HEAD += 2;
			break;
		case '8':
			PLAY_HEAD += 1;
			break;
  	 }

  }

  code += "head++;}, \"16n\"); Tone.Transport.start(\"+0.2\"); seq.start();";

  return code;

};

//TODO: Extend to work for two sets of blocks :)


