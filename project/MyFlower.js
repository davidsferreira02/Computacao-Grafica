import { CGFobject } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyLeaf } from './MyLeaf.js';
import { MyPollen } from './MyPollen.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MyFlower extends CGFobject {
  constructor(scene,x,y,z) {
      super(scene);
      this.x = x;
      this.y = y;
      this.z = z;
      this.raio=  Math.random() * 4 + 3;
      this.nrPetalas = Math.random() * 10 + 5;
      this.raioCirc = Math.random() * 1 + 1 ;
      this.raioCilind = Math.random() * 0.2 + 0.1;
      this.corPetalas=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
      this.corCirc=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
      this.tamanhoCaule= Math.random() * 10 + 4;
      this.corCaule=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
      this.corFolha=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
      this.initMaterials();
      this.initFlower();
      this.loadTextures();
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

      this.appearancePollen= new CGFappearance(this.scene);
      this.appearancePollen.setAmbient(1, 1, 1, 1);
      this.appearancePollen.setDiffuse(1, 1, 1, 1);
      this.appearancePollen.setSpecular(1, 1, 1, 1);
      
  }

   initFlower(){
      this.stem=new MyStem(this.scene,100,100,this.raioCilind,this.tamanhoCaule);
      this.stemFolha=new MyStem(this.scene,100,100,this.raioCilind,this.tamanhoCaule/3);
      this.receptacle = new MyReceptacle(this.scene,10,10,this.raioCirc);
      this.pollen = new MyPollen(this.scene, -0.8, this.tamanhoCaule+ this.raioCirc, -0.8);
      this.raioFlor = this.raio - this.raioCirc;
      this.raioFlor=this.raioFlor/2;
     
      this.folha = new MyLeaf(this.scene,this.raioFlor,this.nrPetalas,Math.PI/3);
      var angulo =Math.random() * Math.PI/4 + Math.PI/2;
      this.petal = new MyPetal(this.scene,this.raioFlor,this.nrPetalas,angulo ); // erro porque que o anguloCaule ao mudar não faz nada o valor do anguloCaule é sempre 1.04719
    
   }

   loadTextures() {
      this.textureCaule1 = new CGFtexture(this.scene,"textures/caule1.jpg");
      this.textureCaule2 = new CGFtexture(this.scene,"textures/caule2.jpg");
      this.textureFolha1 = new CGFtexture(this.scene,"textures/folha1.jpg");
      this.textureFolha2 = new CGFtexture(this.scene,"textures/folha2.jpg");
      this.texturePetala1 = new CGFtexture(this.scene,"textures/petala1.jpg");
      this.texturePetala2 = new CGFtexture(this.scene,"textures/petala2.jpg");
      this.textureReceptacle1 = new CGFtexture(this.scene,"textures/receptacle1.jpg");
      this.textureReceptacle2 = new CGFtexture(this.scene,"textures/receptacle2.jpg");
      this.texturePollen = new CGFtexture(this.scene,"textures/pollen.jpg");




 
      // Load textures for petals, leaves, stem, etc.
      this.petalsTextures = [this.texturePetala1, this.texturePetala2]; // Array of textures for petals
      this.leavesTexture = [this.textureFolha1, this.textureFolha2]; // Array of textures for leaves
      this.stemTexture = [this.textureCaule1,this.textureCaule2]; // Array of textures for stem
      this.receptacleTexture = [this.textureReceptacle1, this.textureReceptacle2]; // Array of textures for receptacle
      // Load other textures...

      // Randomly select textures for each component
      this.appearancePetala.setTexture(this.petalsTextures[Math.floor(Math.random() * this.petalsTextures.length)]); 
      this.appearancePetala.setTextureWrap('REPEAT', 'REPEAT');

      this.appearanceFolha.setTexture(this.leavesTexture[Math.floor(Math.random() * this.leavesTexture.length)]); 
      this.appearanceFolha.setTextureWrap('REPEAT', 'REPEAT');
      
      this.appearanceCaule.setTexture(this.stemTexture[Math.floor(Math.random() * this.stemTexture.length)]); 
      this.appearanceCaule.setTextureWrap('REPEAT', 'REPEAT');

      this.appearanceCirc.setTexture(this.receptacleTexture[Math.floor(Math.random() * this.receptacleTexture.length)]); 
      this.appearanceCirc.setTextureWrap('REPEAT', 'REPEAT');

      this.appearancePollen.setTexture(this.texturePollen);
      this.appearancePollen.setTextureWrap('REPEAT', 'REPEAT');
    
    }

   display(){

    this.scene.translate(this.x, this.y, this.z);


   
  
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
      this.scene.translate(0,this.tamanhoCaule+ this.raioCirc,0);
      this.receptacle.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.appearancePollen.apply();
      this.pollen.display();
      this.scene.popMatrix();
      
 

  //Petal 

      const angleIncrement = (7*Math.PI / 4 ) /this.nrPetalas;
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
    this.scene.translate(0,this.tamanhoCaule/3,0);
    this.scene.rotate(Math.PI,1,0,0);
    this.scene.rotate(Math.PI/6,1,0,0);
    this.stemFolha.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.appearanceFolha.apply()
    this.scene.translate(0,this.tamanhoCaule/2,-this.tamanhoCaule/3.5);
    this.scene.rotate(Math.PI/4,1,0,0);
    this.scene.translate(0,-this.raioFlor,0);
    this.folha.display();
    this.scene.popMatrix();

   }



}
