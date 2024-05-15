
import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */ 

export class MyLeaf extends CGFobject {
	constructor(scene,raio,angulo) {
		super(scene);
        this.raio=raio;
       this.angulo=angulo;
       this.triangle= new MyTriangle(this.scene,this.raio,this.raio,0);
       
  
       
	}
	
	display(){
        this.scene.translate(0,this.raio/2,0);
        this.scene.pushMatrix();   
        this.scene.rotate(Math.PI/4,0,1,0);       
        this.triangle.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(0,this.raio,0);
        this.triangle.display();
        this.scene.popMatrix();

       
    
    }
     

      
    }
   
