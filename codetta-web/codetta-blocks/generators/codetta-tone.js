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
var SYNTH_COUNT = 0;


Blockly.CodettaTone.init = function(workspace) {
	PLAY_HEAD = 0;
	SYNTH_COUNT = 0;
};

Blockly.CodettaTone.finish = function(code) {
	code += "Tone.Transport.start(\"+0.2\");";
	for(var i = 0; i < SYNTH_COUNT; ++i){
		code+="seq"+ i +".start();";
	}
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
  code.push("Tone.Transport.stop();");
  console.log("hi");
  console.log(this);
  this.init(workspace);
  var blocks = workspace.getTopBlocks(true); //we want to only get start blocks.. must be a way to code this TODO: 
  for (var x = 0, block; block = blocks[x]; x++) 
  {
    var line = this.blockToCode(block);
    code.push(line);

    while(block.getNextBlock() != null){
    	block = block.getNextBlock();
    	var line = this.blockToCode(block);
    	code.push(line);
    }

    code.push("head"+SYNTH_COUNT+"++;}, \"16n\");");  
    SYNTH_COUNT++;

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
	PLAY_HEAD = 0;
	var code = "var polySynth"+ SYNTH_COUNT +" = new Tone.PolySynth(32, Tone.FMSynth); polySynth" 
				+ SYNTH_COUNT +".connect(vol); var head"+SYNTH_COUNT+" = 0;";
  	code += "var seq" + SYNTH_COUNT + " = new Tone.Sequence(function(time){";
  return code;
};

Blockly.CodettaTone['fourfour_bar'] = function(block) {
  var code = "";
  var field = block.getField('vex_field');
  var theNotes = field.noteDataCopy_;

  for(var i = 0; i < theNotes.length; ++i)
  {
  	var note = theNotes[i].keys[0][0];
  	var pitch = theNotes[i].keys[0][2];
  	var type = theNotes[i].noteType;

  	if(type != "r")
  	{
  		code += "if(head"+SYNTH_COUNT+" == " + PLAY_HEAD + ")"
  				+"{polySynth"+SYNTH_COUNT+".triggerAttackRelease(\'" + (note+pitch) + "\', \'16n\');}";
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

  // if(block.getNextBlock() == null){ //at the end of the stack close the sequence. (think we want not a bar, but it depends on later stuff)
  	// code += "head++;}, \"16n\"); Tone.Transport.start(\"+0.2\"); seq.start();";
  // }

  return code;

};

//TODO: Extend to work for two sets of blocks
Blockly.CodettaTone['repeater'] = function(block){
  var code = "";
  var innerBlocks = block.getChildren();
  
  // index array 0 is times repeated, 1 is the first nested block
  var totalIts = parseInt("" + innerBlocks[0]);
  var loopedBlock = innerBlocks[1];

  for(var i = 0; i <= totalIts; ++i)
  {
    // append code for the first block. 
    loopedBlock = innerBlocks[1];
    code += Blockly.CodettaTone.blockToCode(loopedBlock);
   
    //append code for looped blocked 
    while(loopedBlock.getNextBlock() != null) //end of nested block == null 
    { 
      loopedBlock = loopedBlock.getNextBlock();
      code += Blockly.CodettaTone.blockToCode(loopedBlock);
    }
  }

  return code; 
}

