
import { CGFobject } from '../lib/CGF.js';
import { MyElipsoid } from './MyEllipsoid.js';
 
import { MySphere } from './MySphere.js';

/**
 * MyBeeBody
 * @constructor
 * @param scene
 */
export class MyBeeBody extends CGFobject {
	constructor(scene) {
		super(scene); 
        this.initBuffers(); 
        
	}

    initBuffers(){

        this.body = new MyElipsoid(this.scene, 1, 50, 50);
    }

    display(){


        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.body.display();
        this.scene.popMatrix();
    }



       
    
    
     

      
    }
   
