
import { CGFobject,CGFappearance,CGFtexture } from '../lib/CGF.js';
import { MyElipsoid } from './MyEllipsoid.js';
 
import { MySphere } from './MySphere.js';
import { MyStem } from './MyStem.js';

/**
 * MyBeeHead
 * @constructor
 * @param scene
 */
export class MyBeeHead extends CGFobject {
	constructor(scene) {
		super(scene); 
        this.initBuffers(); 
        this.initMaterials();
        
	}

    initMaterials(){
        this.appearanceEye= new CGFappearance(this.scene);
   
        this.appearanceEye.setAmbient(1,0,0);
        this.appearanceEye.setDiffuse(1,0,0);
        this.appearanceEye.setSpecular(1,0,0);

        

        this.appearanceAntena= new CGFappearance(this.scene);
        this.appearanceAntena.setDiffuse(0.0,0);
        this.appearanceAntena.setSpecular(0,0,0);


        this.textureHead = new CGFtexture(this.scene, "images/beeHead.jpg");
        this.appearanceHead= new CGFappearance(this.scene);
        this.appearanceHead.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearanceHead.setTexture(this.textureBody);
        this.appearanceHead.setTextureWrap('REPEAT', 'REPEAT');

        
    }

    initBuffers(){

        this.head = new MySphere(this.scene, 0.25, 50, 50);
        this.antenna = new MyStem(this.scene,100,100,0.01,0.3);
        this.eye = new MyElipsoid(this.scene,1,100,100);
    }

    display(){

        // Display body
        this.scene.pushMatrix();
        this.appearanceHead.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.head.display();
        this.scene.popMatrix();
    
        // Display left antenna
        this.scene.pushMatrix();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(-0.25,0.25,-0.125);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.appearanceAntena.apply(); // Apply eye appearance to antenna
        this.antenna.display();
        this.scene.popMatrix();
    
        // Display right antenna
        this.scene.pushMatrix();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(-0.25,0.25,0.125);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.appearanceAntena.apply(); // Apply eye appearance to antenna
        this.antenna.display();
        this.scene.popMatrix();
    
        // Display eye

        this.scene.pushMatrix();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(-0.25,0.05,-0.05);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.15,0.1,0.1);
       
   
        this.appearanceEye.apply(); // Apply eye appearance
        this.eye.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(-0.25,0.05,0.05);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.scale(0.15,0.1,0.1);
       
   
        this.appearanceEye.apply(); // Apply eye appearance
        this.eye.display();
        this.scene.popMatrix();
    }
}