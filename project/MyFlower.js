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
    this.setPosition(x,y,z);
    this.initializeProperties();
    this.initMaterials();
    this.initFlower();
    this.loadTextures();
    this.Haspollen = true;
    this.position = [x,y,z];
  }


  setPosition(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  initializeProperties(){
    this.raio=  Math.random() * 4 + 3;
    this.nrPetalas = Math.random() * 10 + 9;
    this.raioCirc = Math.random() * 0.5 + 0.7 ;
    this.raioCilind = Math.random() * 0.2 + 0.1;
    this.corPetalas=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
    this.corCirc=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
    this.tamanhoCaule= Math.random() * 5 + 8;
    this.corCaule=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
    this.corFolha=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];
    this.corPolen=[Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, Math.floor(Math.random() * 256)/256, 1.0];

  }
  initMaterials() {
    const createAndSetupAppearance = (scene, color) => {
      const appearance = new CGFappearance(scene);
      appearance.setAmbient(1.0,1.0,1.0,1.0);
      appearance.setDiffuse(1.0,1.0,1.0,1.0);
      appearance.setSpecular(1.0,1.0,1.0,1.0);
      appearance.setTextureWrap('REPEAT', 'REPEAT');
      return appearance;
    };

    const colors = {
        petala: this.corPetalas,
        circ: this.corCirc,
        caule: this.corCaule,
        folha: this.corFolha,
        polen:this.corPolen
    };

    this.appearancePetala = createAndSetupAppearance(this.scene, colors.petala);
    this.appearanceCirc = createAndSetupAppearance(this.scene, colors.circ);
    this.appearanceCaule = createAndSetupAppearance(this.scene, colors.caule);
    this.appearanceFolha = createAndSetupAppearance(this.scene, colors.folha);
    this.apperancePolen=createAndSetupAppearance(this.scene,colors.polen);
  }


  initFlower(){
    this.stem=new MyStem(this.scene,100,100,this.raioCilind,this.tamanhoCaule);
    this.stemFolha=new MyStem(this.scene,100,100,this.raioCilind,this.tamanhoCaule/3);
    this.receptacle = new MyReceptacle(this.scene,10,10,this.raioCirc);

    this.raioFlor = (this.raio - this.raioCirc)/2;
    this.folha = new MyLeaf(this.scene,this.raioFlor,this.nrPetalas,Math.PI/3);
    var angulo =Math.random() * Math.PI/4 + Math.PI/2;
    this.petal = new MyPetal(this.scene,this.raioFlor,this.nrPetalas,angulo ); 
    this.pollen = new MyPollen(this.scene, 0.5, 100,100,[ this.x, this.y+this.tamanhoCaule+ this.raioCirc, this.z]);
    
  }
 
  loadTextures() { 
    const loadTexture = (path) => new CGFtexture(this.scene, path);

    const textures = {
        caule: ["textures/caule1.jpg", "textures/caule2.jpg"],
        folha: ["textures/folha1.jpg", "textures/folha2.jpg"],
        petala: ["textures/petala2.jpg", "textures/petala3.jpg", "textures/petala4.jpg"],
        receptacle: ["textures/receptacle1.jpg", "textures/receptacle2.jpg"],
        polen:["textures/pollen.jpg"]
    };

    this.textures = {};
    for (let key in textures) {
        this.textures[key] = textures[key].map(path => loadTexture(path));
    }

    this.configureAppearance(this.appearancePetala, this.textures.petala);
    this.configureAppearance(this.appearanceFolha, this.textures.folha);
    this.configureAppearance(this.appearanceCaule, this.textures.caule);
    this.configureAppearance(this.appearanceCirc, this.textures.receptacle);
    this.configureAppearance(this.apperancePolen,this.textures.polen);
  }   

  configureAppearance(appearance, textureArray) {
    const randomTexture = textureArray[Math.floor(Math.random() * textureArray.length)];
    appearance.setTexture(randomTexture);
    appearance.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    this.applyTranslation();
    this.displayStem();
    this.displayReceptacle();
    this.displayPetals();
    this.displayLeaves();
    this.displayPollen();
  }

  applyTranslation() {
      this.scene.translate(this.x, this.y, this.z);
  }

  displayStem() {
    this.scene.pushMatrix();
    this.appearanceCaule.apply();
    this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.stem.display();
    this.scene.popMatrix();
  }
    
  displayReceptacle() {
    this.scene.pushMatrix();
    this.appearanceCirc.apply();
    this.scene.rotate(Math.PI/4, 0, 1, 0);
    this.scene.translate(0, this.tamanhoCaule + this.raioCirc, 0);
    this.receptacle.display();
    this.scene.popMatrix();
  }

  displayPetals() {
    const angleIncrement = (7 * Math.PI / 4) / this.nrPetalas;
    let currentAngle = angleIncrement;
    for (let i = 0; i < this.nrPetalas; i++) {
      this.scene.pushMatrix();
      this.appearancePetala.apply();


      this.scene.translate(0, this.raioCirc + this.tamanhoCaule, 0);
      this.scene.rotate(-currentAngle, 1, 0, 1);
      this.scene.translate(0, -this.raioFlor - this.raioCirc, 0);
      this.petal.display();
      this.scene.popMatrix();
      currentAngle += angleIncrement;
    }
  }
    
    displayLeaves() {
      this.scene.pushMatrix();
      this.appearanceCaule.apply();
      this.scene.translate(0, this.tamanhoCaule / 3, 0);
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.scene.rotate(Math.PI / 6, 1, 0, 0);
      this.stemFolha.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.appearanceFolha.apply();
      this.scene.translate(0, this.tamanhoCaule / 2, -this.tamanhoCaule / 3.5);
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.translate(0, -this.raioFlor, 0);
      this.folha.display();
      this.scene.popMatrix();
  }

  
  displayPollen(){
      if(this.Haspollen){
        this.scene.pushMatrix();
        this.apperancePolen.apply();
        this.scene.translate(-0.5,this.tamanhoCaule+ this.raioCirc,-0.5);

        this.pollen.setPosition(this.x,this.y + this.tamanhoCaule+this.raioCirc,this.z);
        this.pollen.display();
        this.scene.popMatrix();
    }
  }

}

