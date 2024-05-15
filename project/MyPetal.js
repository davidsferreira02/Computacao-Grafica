
import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */ 

export class MyPetal extends CGFobject {
	constructor(scene,raio,angulo) {
		super(scene);
        this.raio=raio;
        this.angulo=angulo;
	}

	display(){
        this.scene.pushMatrix();
        this.triangle=new MyTriangle(this.scene,this.raio,this.raio,0);
        this.scene.translate(0,this.raio,0);
        this.scene.rotate(Math.PI/4,0,1,0);
        this.scene.rotate(-(this.angulo* Math.PI / 180),1,0,0);
        
        this.scene.translate(0, -this.raio/2, 0);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
    
        this.triangle2= new MyTriangle(this.scene,this.raio,this.raio,0);
        this.scene.translate(0,-this.raio*0.9,0);
        this.scene.rotate(Math.PI/4,0,1,0);
        
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.rotate(this.angulo* Math.PI / 180,1,0,0);
        
        this.scene.translate(0,-this.raio/2,0);
        
        this.triangle2.display();
        this.scene.popMatrix();

    }


     

       
    
    }
     

      
    
   
