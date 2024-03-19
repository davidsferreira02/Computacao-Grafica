import {CGFappearance, CGFobject,CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.quad = new MyQuad(scene);
        this.quad.initBuffers();
        this.unitCubeMaterial = new CGFappearance(this.scene);
        this.unitCubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.unitCubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.unitCubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.unitCubeMaterial.setShininess(10.0);
        this.unitCubeMaterial.loadTexture('images/default.png');
        this.unitCubeMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.mineSide = new CGFtexture(this.scene, 'images/mineSide.png');
        this.mineTop = new CGFtexture(this.scene, 'images/mineTop.png');
        this.mineBottom = new CGFtexture(this.scene, 'images/mineBottom.png');

    }

    display() {

  
 this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);  
 this.unitCubeMaterial.setTexture(this.mineSide); // SIDE
 this.unitCubeMaterial.apply();  
 this.scene.pushMatrix();
this.scene.translate(0.5,-0.5,0);
this.quad.display();
this.scene.popMatrix();



this.unitCubeMaterial.setTexture(this.mineSide); // SIDE
this.unitCubeMaterial.apply(); 
  
this.scene.pushMatrix();
this.scene.translate(0.5,-0.5,-1);
this.scene.rotate(Math.PI, 0, 1, 0);
this.quad.display();
this.scene.popMatrix();


this.unitCubeMaterial.setTexture(this.mineSide); //SIDE
this.unitCubeMaterial.apply(); 
this.scene.pushMatrix();
this.scene.translate(1,-0.5,-0.5);
this.scene.rotate((Math.PI)/2, 0, 1, 0);
this.quad.display();
this.scene.popMatrix();


this.unitCubeMaterial.setTexture(this.mineSide); //SIDE
this.unitCubeMaterial.apply(); 
this.scene.pushMatrix();
this.scene.translate(0,-0.5,-0.5);
this.scene.rotate(3*(Math.PI)/2, 0, 1, 0);
this.quad.display();
this.scene.popMatrix();


this.unitCubeMaterial.setTexture(this.mineBottom); // Botton
this.unitCubeMaterial.apply(); 
this.scene.pushMatrix();
this.scene.translate(0.5,-1,-0.5);
this.scene.rotate((Math.PI)/2, 1, 0, 0);
this.quad.display();
this.scene.popMatrix();


this.unitCubeMaterial.setTexture(this.mineTop); //TOP
this.unitCubeMaterial.apply(); 
this.scene.pushMatrix();
this.scene.translate(0.5,0,-0.5);
this.scene.rotate(3*(Math.PI)/2, 1, 0, 0);
this.quad.display();
this.scene.popMatrix();


       
    }

}