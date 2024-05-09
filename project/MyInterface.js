import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayPanorama').name('Display Pano');
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');
        this.gui.add(this.scene,'displayFlower').name('Display Flower');
        this.gui.add(this.scene,'displayBee').name('Display Bee');
        this.gui.add(this.scene,'displayRock').name('Display Rock');
        this.gui.add(this.scene,'displayGarden').name('Display Garden');
        this.gui.add(this.scene,'displayRockSet').name('Display RockSet');
        this.gui.add(this.scene, 'displayHive').name('Display Hive');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }
    processKeyDown(event) {
        // called when a key is pressed down 
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };
    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

}