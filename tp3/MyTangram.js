import {CGFobject} from '../lib/CGF.js';
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
	}


	  init() {

      this.triangleBlue = new MyTriangle(this.scene);
      this.triangleOrange = new MyTriangle(this.scene);
      this.triangleRed = new MyTriangle(this.scene);
      this.trianglePink = new MyTriangle(this.scene);
      this.triangleViolet = new MyTriangle(this.scene);
      this.cube = new MyCube(this.scene);
      this.parallelogram = new MyParallelogram(this.scene);
      
    }


    display(){
      
      this.scene.pushMatrix();
      this.scene.rotate(-90 * Math.PI / 180,0,0,-180 * Math.PI / 180);
      this.scene.scale(1,-1,0);
      this.parallelogram.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-1,0,0);
      this.scene.rotate(-45 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleBlue.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-2,0,0);
      this.scene.rotate(135 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleOrange.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.translate(-2.35,1.5,0);
      this.scene.rotate(100 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.cube.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(0.8,0.8,0.8);
      this.scene.translate(1.4,0,0);
      this.scene.rotate(135 * Math.PI / 180,0,0,-45 * Math.PI / 180);
      this.trianglePink.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(0.5,0.5,0.5);
      this.scene.translate(5,0,0);
      this.scene.rotate(-45 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleViolet.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.scene.scale(0.5,0.5,0.5);
      this.scene.translate(2,5,0);
      this.scene.rotate(-135 * Math.PI / 180,0,0,-90 * Math.PI / 180);
      this.triangleRed.display();
      this.scene.popMatrix();
    }
}