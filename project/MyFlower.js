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
  constructor(scene,raio,nrPetalas,corPetalas,raioCirc,corCirc,raioCilind,tamanhoCaule,corCaule,corFolha) {
      super(scene);
      this.raio=raio; //Raio Exterior
      this.nrPetalas=nrPetalas; // Numero de Petalas
      this.corPetalas=corPetalas;
      this.raioCirc=raioCirc; // raio do circulo
      this.corCirc=corCirc;
      this.raioCilind=raioCilind; // raio do cilindro
      this.tamanhoCaule=tamanhoCaule; // tamanho do caule altura do cilindro 
      this.corCaule=corCaule;
      this.corFolha=corFolha;
      this.initMaterials();
      this.initFlower();
  }

  initMaterials() {
      
  
      this.appearance = new CGFappearance(this.scene);
      this.appearance.setTextureWrap('REPEAT', 'REPEAT');
      //this.appearance.setSpecular(this.corPetalas[0,this.corPetalas[1],this.corPetalas[2],this.corPetalas[3]]);
      this.appearancePetala= new CGFappearance(this.scene);
   
      this.appearancePetala.setAmbient(this.corPetalas[0],this.corPetalas[1],this.corPetalas[2],this.corPetalas[3]);
      this.appearancePetala.setDiffuse(this.corPetalas[0],this.corPetalas[1],this.corPetalas[2],this.corPetalas[3]);
      this.appearancePetala.setSpecular(this.corPetalas[0],this.corPetalas[1],this.corPetalas[2],this.corPetalas[3]);

      this.appearanceCirc= new CGFappearance(this.scene);
      this.appearanceCirc.setAmbient(this.corCirc[0],this.corCirc[1],this.corCirc[2],this.corCirc[3]);
      this.appearanceCirc.setDiffuse(this.corCirc[0],this.corCirc[1],this.corCirc[2],this.corCirc[3]);
      this.appearanceCirc.setSpecular(this.corCirc[0],this.corCirc[1],this.corCirc[2],this.corPetalas[3]);


      this.appearanceCaule= new CGFappearance(this.scene);
      this.appearanceCaule.setAmbient(this.corCaule[0],this.corCaule[1],this.corCaule[2],this.corCaule[3]);
      this.appearanceCaule.setDiffuse(this.corCaule[0],this.corCaule[1],this.corCaule[2],this.corCaule[3]);
      this.appearanceCaule.setSpecular(this.corCaule[0],this.corCaule[1],this.corCaule[2],this.corCaule[3]);
     

      
  }

   initFlower(){
      this.stem=new MyStem(this.scene,100,100,this.raioCilind,this.tamanhoCaule);
      this.receptacle = new MyReceptacle(this.scene,10,10,this.raioCirc);
      this.raioFlor = this.raio - this.raioCirc;
      this.raioFlor=this.raioFlor/2;
      this.petal = new MyPetal(this.scene,this.raioFlor,this.nrPetalas);

      
   }

   display(){

  
    //Steam
      this.scene.pushMatrix();
      this.appearanceCaule.apply();
      this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.stem.display();
      this.scene.popMatrix();
    


//Receptable
    
      this.scene.pushMatrix();
      this.appearanceCirc.apply();
      this.scene.rotate(Math.PI/4,0,1,0);
      this.scene.translate(0,this.tamanhoCaule+ this.raioCirc,0)
      this.receptacle.display();
      this.scene.popMatrix();

 






  //Petal 

  const angleIncrement = (9*Math.PI / 5 ) /this.nrPetalas;
  let currentAngle = angleIncrement;


  //this.scene.translate(0,this.raioCirc,0);
    for(var i=0;i<this.nrPetalas;i++){
      this.scene.pushMatrix();
      this.appearancePetala.apply();
    this.scene.translate(0,this.raioCirc + this.tamanhoCaule,0);  
    this.scene.rotate(-currentAngle,1,0,1);
    this.scene.translate(0,-this.raioFlor - this.raioCirc,0);
    this.petal.display();
    this.scene.popMatrix();
    currentAngle += angleIncrement;
    }






  //Petal
 /*  
  var ang = Math.PI / this.nrPetalas;
  var angPreta = -Math.PI;
  var angBranco = -Math.PI / 4; 




  for(var i = 0 ;i< this.nrPetalas;i++){
    this.scene.pushMatrix();
    this.scene.appearance.apply();
    this.scene.rotate(angBranco * i );
    this.scene.translate(i+2,i+2,0);
    this.scene


  }

      //Petala1 Lado Esquerdo Inferior
      this.scene.pushMatrix();
      this.scene.appearance.apply();
      this.scene.translate(-1.9, 5.7, 0);
      
      this.petal.display();

      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 

      this.scene.translate(-1.9, 5.7, 0);
      
      this.scene.rotate(angPreta, 0, 0, 1);
      this.petal.display();

      this.scene.popMatrix();
      //FimPetala1





      //Petala2 Parte do Meio Lado Esquerdo
      this.scene.pushMatrix();
      this.scene.appearance.apply();


   
      this.scene.translate(-3, 8.5, 0);
      this.scene.rotate(-Math.PI / 4, 0, 0, 1);

      this.petal.display();

      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 

  

  
      this.scene.translate(-3, 8.5, 0);
      this.scene.rotate(-5*Math.PI / 4, 0, 0, 1);
      this.petal.display();

      this.scene.popMatrix();
      //FimPetala2



       //Petala3 Lado Esquerdo Superior
    this.scene.pushMatrix();
    this.scene.pushMatrix();
    this.appearance.apply();

    this.scene.translate(-1.5, 10.7, 0); // 3,2
    
    this.scene.rotate(-2 * Math.PI / 4, 0, 0, 1);

    this.petal.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    //Parte Preta 
    this.scene.appearance.apply();
    this.scene.translate(-1.5,10.7, 0); //2.7,1.7
    this.scene.rotate(-6*Math.PI / 4, 0, 0, 1);
    this.petal.display();

    this.scene.popMatrix();
    //FimPetala3




    //Petala5 Lado Direito Superior
    this.scene.pushMatrix();
    this.appearance.apply();
    //this.scene.scale(0.3, 0.3, 0);
    this.scene.translate(1.5, 10.7, 0); // 3,2
   
    this.scene.rotate(-4*Math.PI/4, 0, 0, 1);
    //  this.translate(-19,-1,0);
    this.petal.display();

    this.scene.popMatrix();
    this.scene.pushMatrix();
    //Parte Preta 
   
   // this.scene.scale(0.3, 0.3, 0);
    this.scene.translate(1.5, 10.7, 0); // 3,2
    this.scene.rotate(-8*Math.PI / 4,0,0,1);
    this.petal.display();

    this.scene.popMatrix();
    //FimPetala2 




      //Petala4 Parte do Meio Lado Direito
      this.scene.pushMatrix();
      this.scene.appearance.apply();


    //  this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(3, 8.5, 0);
      this.scene.rotate(-5*Math.PI / 4, 0, 0, 1);

      this.petal.display();

      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 

 

     // this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(3, 8.5, 0);
      //  this.rotate((3*Math.PI,0,0,1);
      this.scene.rotate(-9 * Math.PI / 4, 0, 0, 1);
      this.scene.petal.display();

      this.scene.popMatrix();
      //FimPetala4



      //Petala3 Parte Inferior Direita
      this.scene.pushMatrix();
      this.scene.appearance.apply();
   //   this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(1.9, 5.7, 0);
      
      this.scene.rotate(-3*Math.PI / 2, 0, 0, 1);
      this.scene.petal.display();
      this.scene.popMatrix();
      this.scene.pushMatrix();
      //Parte Preta 
     // this.scene.scale(0.3, 0.3, 0);
      this.scene.translate(1.9, 5.7, 0);
      this.scene.rotate(-10*Math.PI / 4, 0, 0, 1);
      this.petal.display();

      this.scene.popMatrix();
      //FimPetala3


*/



   }


}
