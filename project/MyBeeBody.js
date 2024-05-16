
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
   

       
        this.textureBody = new CGFtexture(this.scene, "textures/head.jpg");
        this.appearanceBody= new CGFappearance(this.scene);
        this.appearanceBody.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearanceBody.setTexture(this.textureBody);
        this.appearanceBody.setTextureWrap('REPEAT', 'REPEAT');


        this.appearancePata= new CGFappearance(this.scene);
        this.appearancePata.setDiffuse(0.0,0);
        this.appearancePata.setSpecular(0,0,0);

        this.materialWing = new CGFappearance(this.scene);

        // Definindo a cor difusa como cinza claro
        this.materialWing.setDiffuse(220/255, 220/255, 220/255,0); // R, G, B = 220/255, 220/255, 220/255
        
        // Definindo a cor especular como cinza claro
        this.materialWing.setSpecular(220/255, 220/255, 220/255,0); // R, G, B = 220/255, 220/255, 220/255
        
        // Definindo outras propriedades, se necessário
        this.materialWing.setShininess(10.0); // Brilho
        
        
     
   
      

    }

    initBuffers(){

       this.body=new MySphere(this.scene,1,100,100);
       this.backBody = new MySphere(this.scene,1,100,100);
        this.pata = new MyStem(this.scene,100,100,0.01,0.3);
  
    }

    display(){


        this.scene.pushMatrix();
        this.appearanceBody.apply();
        this.scene.scale(1/2,1/4,1/4);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(1,0,0);
        this.body.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.appearanceBody.apply();
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.scale(0.4*(1/2),0.4*(1/4),0.4*(1/4));
        this.scene.translate(2.3,3,0);
        this.backBody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0.25,-0.10,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.pata.display(); // pata esquerda perto da cabeça
        this.scene.popMatrix();




        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0.35,-0.10,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.pata.display(); // pata esquerda meio da cabeça
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0.45,-0.10,0);
        this.scene.rotate(Math.PI/4,1,0,0);
        this.pata.display(); // pata esquerda longe da cabeça
        this.scene.popMatrix();




        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0.25,-0.25,-0.3);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.pata.display(); // pata direita perto da cabeça
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0.35,-0.25,-0.3);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.pata.display(); // pata direita meio da cabeça
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.appearancePata.apply();
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0.45,-0.25,-0.3);
        this.scene.rotate(-Math.PI/4,1,0,0);
        this.pata.display(); // pata direita longe da cabeça
        this.scene.popMatrix();






    }



       
    
    
     

      
    }
   
