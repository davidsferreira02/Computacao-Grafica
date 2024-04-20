
import { CGFobject } from '../lib/CGF.js';
import { MyElipsoid } from './MyEllipsoid.js';
 
import { MySphere } from './MySphere.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyStem } from './MyStem.js';
import { MyTriangle } from './MyTriangle.js';

/**
 * MyBeeBody
 * @constructor
 * @param scene
 */
export class MyBeeBody extends CGFobject {
	constructor(scene) {
		super(scene); 
        this.initBuffers(); 
        this.initMaterials();
        
	}

    initMaterials(){

        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);
   

       
        this.textureBody = new CGFtexture(this.scene, "images/bee.jpg");
        this.appearanceBody= new CGFappearance(this.scene);
        this.appearanceBody.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearanceBody.setTexture(this.textureBody);
        this.appearanceBody.setTextureWrap('REPEAT', 'REPEAT');


        this.appearancePata= new CGFappearance(this.scene);
        this.appearancePata.setDiffuse(0.0,0);
        this.appearancePata.setSpecular(0,0,0);
 

     
   
      

    }

    initBuffers(){

        this.body = new MyElipsoid(this.scene, 1, 100,100);
        this.pata = new MyStem(this.scene,100,100,0.01,0.3);
        this.wing = new MyTriangle(this.scene,1,1);
    }

    display(){


        this.scene.pushMatrix();
        this.appearanceBody.apply();
      
        this.scene.translate(0.5,0,0);
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.translate(0.25,-0.20,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.pata.display(); // pata esquerda perto da cabeça
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.translate(0.5,-0.20,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.pata.display(); // pata esquerda meio 
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.translate(0.75,-0.20,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.pata.display(); // pata esquerda longe da cabeça  
        this.scene.popMatrix();




        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.translate(0.25,-0.40,-0.25);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.pata.display(); // pata direita perto da cabeça
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.translate(0.5,-0.40,-0.25);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.pata.display(); // pata direita meio 
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.translate(0.75,-0.40,-0.25);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.pata.display(); // pata direita longe da cabeça 
        this.scene.popMatrix();




        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0.5,0,0.4);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(-Math.PI/3,1,0,0);
        this.wing.display(); // asa esquerda
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0.5,0,-0.4);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI/3,1,0,0);
        this.wing.display(); // asa direita
        this.scene.popMatrix();

    }



       
    
    
     

      
    }
   
