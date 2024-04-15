import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";

/**
 * MySphere
 * 
 * @constructor
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
      super(scene);
      this.initMaterials();
      this.initFlower();
  }

  initMaterials() {
      
  
      this.appearance = new CGFappearance(this.scene);
      this.appearance.setTextureWrap('REPEAT', 'REPEAT');
      this.appearance.setSpecular(0.0,0.0,0.0,1.0);
  }

   initFlower(){
      this.stem=new MyStem(this.scene,10,10);
      this.receptacle = new MyReceptacle(this.scene,10,10);
      this.petal = new MyPetal(this.scene);

      
   }

   display(){

  
    //Steam
      this.scene.pushMatrix();
      this.scene.appearance.apply();
      this.scene.scale(0.2, 2, 0.2);
      this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.stem.display();
      this.scene.popMatrix();
    


//Receptable
    
      this.scene.pushMatrix();
      this.scene.appearance.apply();
      this.scene.scale(0.5, 0.5, 0);
      this.scene.translate(0, 4.8, 0);
      this.receptacle.display();
      this.scene.popMatrix();

 

  //Petal
   

      //Petala1 Lado Esquerdo Inferior
      this.scene.pushMatrix();
      this.scene.appearance.apply();
      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(-1.9, 5.7, 0);
      
      this.petal.display();

      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 
      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(-1.9, 5.7, 0);
      
      this.scene.rotate(-Math.PI, 0, 0, 1);
      this.petal.display();

      this.scene.popMatrix();
      //FimPetala1





      //Petala2 Parte do Meio Lado Esquerdo
      this.scene.pushMatrix();
      this.scene.appearance.apply();


      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(-3, 8.5, 0);
      this.scene.rotate(-Math.PI / 4, 0, 0, 1);

      this.petal.display();

      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 

  

      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(-3, 8.5, 0);
      this.scene.rotate(-5*Math.PI / 4, 0, 0, 1);
      this.petal.display();

      this.scene.popMatrix();
      //FimPetala2



       //Petala3 Lado Esquerdo Superior
    this.scene.pushMatrix();
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.scale(0.3, 0.3, 0);
    this.scene.translate(-1.5, 10.7, 0); // 3,2
    
    this.scene.rotate(-2 * Math.PI / 4, 0, 0, 1);

    this.petal.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    //Parte Preta 
    this.scene.appearance.apply();
    this.scene.scale(0.3, 0.3, 0);
    this.scene.translate(-1.5,10.7, 0); //2.7,1.7
   
    this.scene.rotate(-6*Math.PI / 4, 0, 0, 1);
    this.petal.display();

    this.scene.popMatrix();
    //FimPetala3




    //Petala5 Lado Direito Superior
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.scale(0.3, 0.3, 0);
    this.scene.translate(1.5, 10.7, 0); // 3,2
   
    this.scene.rotate(-4*Math.PI/4, 0, 0, 1);
    //  this.translate(-19,-1,0);
    this.petal.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    //Parte Preta 
   
    this.scene.scale(0.3, 0.3, 0);
    this.scene.translate(1.5, 10.7, 0); // 3,2
    this.scene.rotate(-8*Math.PI / 4,0,0,1);
    this.petal.display();

    this.scene.popMatrix();
    //FimPetala2 




      //Petala4 Parte do Meio Lado Direito
      this.scene.pushMatrix();
      this.scene.appearance.apply();


      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(3, 8.5, 0);
      this.scene.rotate(-5*Math.PI / 4, 0, 0, 1);

      this.petal.display();

      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 

 

      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(3, 8.5, 0);
      //  this.rotate((3*Math.PI,0,0,1);
      this.scene.rotate(-9 * Math.PI / 4, 0, 0, 1);
      this.scene.petal.display();

      this.scene.popMatrix();
      //FimPetala4



      //Petala3 Parte Inferior Direita
      this.scene.pushMatrix();
      this.scene.appearance.apply();
      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(1.9, 5.7, 0);
      
      this.scene.rotate(-3*Math.PI / 2, 0, 0, 1);
      this.scene.petal.display();
      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 
      this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(1.9, 5.7, 0);
      this.scene.rotate(-10*Math.PI / 4, 0, 0, 1);
      this.petal.display();

      this.scene.popMatrix();
      //FimPetala3






   }


}
