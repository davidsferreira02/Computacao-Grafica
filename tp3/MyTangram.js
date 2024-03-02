import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCube } from "./MyCube.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
    this.initMaterials();
	}


	  init() {
      this.triangleOrange = new MyTriangle(this.scene);
      this.triangleBlue = new MyTriangle(this.scene);
      this.triangleRed = new MyTriangle(this.scene);
      this.trianglePink = new MyTriangle(this.scene);
      this.triangleViolet = new MyTriangle(this.scene);
      this.cube = new MyCube(this.scene);
      this.parallelogram = new MyParallelogram(this.scene);
      
    }

    initMaterials() {

      // this.triangle purple
      this.triangleVioletMaterial = new CGFappearance(this.scene);
      this.triangleVioletMaterial.setAmbient(0.7, 0, 1, 1.0);
      this.triangleVioletMaterial.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0)
      this.triangleVioletMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.triangleVioletMaterial.setShininess(10.0);
      
      // this.cube
      this.cubeMaterial = new CGFappearance(this.scene);
      this.cubeMaterial.setAmbient(0, 1, 0, 1.0);
      this.cubeMaterial.setDiffuse(0, 1, 0, 0)
      this.cubeMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.cubeMaterial.setShininess(10.0);

      // this.triangle pink
      this.trianglePinkMaterial = new CGFappearance(this.scene);
      this.trianglePinkMaterial.setAmbient(1, 0.7, 0.8, 1.0);
      this.trianglePinkMaterial.setDiffuse(255 / 255, 153 / 255, 204 / 255, 0);
      this.trianglePinkMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.trianglePinkMaterial.setShininess(10.0);

      // this.triangle blue
      this.triangleBlueMaterial = new CGFappearance(this.scene);
      this.triangleBlueMaterial.setAmbient(0, 0.4, 0.8, 1.0);
      this.triangleBlueMaterial.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0)
      this.triangleBlueMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.triangleBlueMaterial.setShininess(10.0);

      // this.triangle orange
      this.triangleOrangeMaterial = new CGFappearance(this.scene);
      this.triangleOrangeMaterial.setAmbient(1, 0.4, 0, 1.0);
      this.triangleOrangeMaterial.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0)
      this.triangleOrangeMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.triangleOrangeMaterial.setShininess(10.0);

      // this.triangle red
      this.triangleRedMaterial = new CGFappearance(this.scene);
      this.triangleRedMaterial.setAmbient(1, 0, 0, 1.0);
      this.triangleRedMaterial.setDiffuse(1, 0, 0, 0);
      this.triangleRedMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.triangleRedMaterial.setShininess(10.0);        

      // this.paralellogram
      this.paralellogramMaterial = new CGFappearance(this.scene);
      this.paralellogramMaterial.setAmbient(1, 1, 0, 1.0);
      this.paralellogramMaterial.setDiffuse(1, 1, 0, 0);
      this.paralellogramMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
      this.paralellogramMaterial.setShininess(10.0);
    }


    display(){
    

      this.scene.pushMatrix();
      this.scene.translate(-1,0,0);
      this.scene.rotate(-45 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleOrangeMaterial.apply()
      this.triangleOrange.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.rotate(-90 * Math.PI / 180,0,0,-180 * Math.PI / 180);
      this.scene.scale(1,-1,0);
      this.paralellogramMaterial.apply()
      this.parallelogram.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-2,0,0);
      this.scene.rotate(135 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleBlueMaterial.apply()
      this.triangleBlue.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-2.35,1.5,0);
      this.scene.rotate(100 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.cubeMaterial.apply()
      this.cube.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(0.8,0.8,0.8);
      this.scene.translate(1.4,0,0);
      this.scene.rotate(135 * Math.PI / 180,0,0,-45 * Math.PI / 180);
      this.trianglePinkMaterial.apply()
      this.trianglePink.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(0.5,0.5,0.5);
      this.scene.translate(5,0,0);
      this.scene.rotate(-45 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleVioletMaterial.apply()
      this.triangleViolet.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(0.5,0.5,0.5);
      this.scene.translate(2,5,0);
      this.scene.rotate(-135 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleRedMaterial.apply()
      this.triangleRed.display();
      this.scene.popMatrix();

    }

    enableNormalViz(){
      this.cube.enableNormalViz()
      this.triangleOrange.enableNormalViz()     
      this.triangleBlue.enableNormalViz()  
      this.trianglePink.enableNormalViz()    
      this.triangleRed.enableNormalViz()   
      this.triangleViolet.enableNormalViz() 
      this.parallelogram.enableNormalViz()
  };

  disableNormalViz(){
      this.cube.disableNormalViz()
      this.triangleOrange.disableNormalViz()     
      this.triangleBlue.disableNormalViz()  
      this.trianglePink.disableNormalViz()    
      this.triangleRed.disableNormalViz()   
      this.triangleViolet.disableNormalViz()   
      this.parallelogram.disableNormalViz()
  };
}