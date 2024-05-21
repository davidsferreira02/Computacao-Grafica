
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
       

        

        this.appearanceAntena= new CGFappearance(this.scene);
        this.appearanceAntena.setDiffuse(0.0,0);
        this.appearanceAntena.setSpecular(0,0,0);


        this.textureHead = new CGFtexture(this.scene, "textures/head.jpg");
        this.appearanceHead= new CGFappearance(this.scene);
                
        this.appearanceHead.setTexture(this.textureHead);
        //this.appearanceHead.setDiffuse(0.72, 0.54, 0, 1.0); 
        this.appearanceHead.setTextureWrap('REPEAT', 'REPEAT');


        this.eyeBody = new CGFtexture(this.scene, "textures/eye.jpg");
        this.appearanceEye= new CGFappearance(this.scene);
        
        this.appearanceEye.setTexture(this.eyeBody);
        this.appearanceEye.setTextureWrap('REPEAT', 'REPEAT');

        
    }

    initBuffers(){

        this.head = new MySphere(this.scene, 0.25, 50, 50);
        this.antenna = new MyStem(this.scene,100,100,0.01,0.3);
        this.eye = new MySphere(this.scene,2,100,100);
    }

    display(){

        // Display body
        this.scene.pushMatrix();
        this.appearanceHead.apply();
        this.scene.scale(0.4,0.5,0.5);
        this.head.display();
        this.scene.popMatrix();
    
        // Display left antenna
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(-0.25,0.15,-0.08);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.appearanceAntena.apply(); // Apply eye appearance to antenna
        this.antenna.display();
        this.scene.popMatrix();
    
        // Display right antenna
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(-0.25,0.15,0.08);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.appearanceAntena.apply(); // Apply eye appearance to antenna
        this.antenna.display();
        this.scene.popMatrix();
    
        // Display eye

        this.scene.pushMatrix();
        this.scene.translate(-0.03,0.05,-0.07);
        this.scene.rotate(-Math.PI/4,1,1,1);
        this.scene.rotate(Math.PI/4,1,1,0);
        this.scene.scale(0.7*(1/4),0.7*(1/2),0.7*(1/4));
        this.scene.scale(0.1,0.12,0.11);
        this.appearanceEye.apply(); // Apply eye appearance
        this.eye.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.025,0.055,0.07);
        this.scene.rotate(-Math.PI/4,1,1,0);
        this.scene.scale(0.7*(1/4),0.7*(1/2),0.7*(1/4));
        this.scene.scale(0.1,0.12,0.11);

        this.appearanceEye.apply(); // Apply eye appearance
        this.eye.display();
        this.scene.popMatrix();
    }
}