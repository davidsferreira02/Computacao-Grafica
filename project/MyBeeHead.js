
import { CGFobject } from '../lib/CGF.js';
 
import { MySphere } from './MySphere.js';

/**
 * MyBeeHead
 * @constructor
 * @param scene
 */
export class MyBeeHead extends CGFobject {
	constructor(scene) {
		super(scene); 
        this.initBuffers(); 
        
	}

    initBuffers(){

        this.head = new MySphere(this.scene, 0.5, 50, 50);
    }

    display(){


        this.scene.pushMatrix();
        this.head.display();
        this.scene.popMatrix();
    }  
    }
   
