import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyLeaf } from './MyLeaf.js';

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
      this.anguloCaule = Math.PI/4;
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


      this.appearanceFolha= new CGFappearance(this.scene);
      this.appearanceFolha.setAmbient(this.corFolha[0],this.corFolha[1],this.corFolha[2],this.corFolha[3]);
      this.appearanceFolha.setDiffuse(this.corFolha[0],this.corFolha[1],this.corFolha[2],this.corFolha[3]);
      this.appearanceFolha.setSpecular(this.corFolha[0],this.corFolha[1],this.corFolha[2],this.corFolha[3]);
     

      
  }

   initFlower(){
      this.stem=new MyStem(this.scene,100,100,this.raioCilind,this.tamanhoCaule);
      this.receptacle = new MyReceptacle(this.scene,10,10,this.raioCirc);
      this.raioFlor = this.raio - this.raioCirc;
      this.raioFlor=this.raioFlor/2;
      this.folha = new MyLeaf(this.scene,this.raioFlor,this.nrPetalas,Math.PI/3);
      this.petal = new MyPetal(this.scene,this.raioFlor,this.nrPetalas,Math.PI/3,this.anguloCaule); // erro porque que o anguloCaule ao mudar não faz nada o valor do anguloCaule é sempre 1.04719
      

      
   }

   display(){


    console.log(this.raio);
  
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


    //Folha


    this.scene.pushMatrix();
    this.appearanceCaule.apply();
    this.scene.translate(0,this.tamanhoCaule/2,0);
    this.scene.rotate(Math.PI,1,0,0);
   // this.scene.rotate(-Math.PI/6,1,0,0);
    this.stem.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.appearanceFolha.apply()
    this.scene.translate(0,this.tamanhoCaule/2,-this.tamanhoCaule);
    this.scene.rotate(Math.PI/4,1,0,0);
    this.scene.translate(0,-this.raioFlor,0);
    this.folha.display();
    this.scene.popMatrix();









   }


}
