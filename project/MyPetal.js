
import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */ 

export class MyPetal extends CGFobject {
	constructor(scene,raio,nrPetalas) {
		super(scene);
        this.raio=raio;
        this.nrPetalas;
	}
	
	display(){
        this.triangle=new MyTriangle(this.scene,this.raio,this.raio);
        this.scene.translate(0,this.raio/2,0);
        this.scene.rotate(Math.PI/4,0,1,0);
    
        this.triangle.display();
    
        this.triangle2= new MyTriangle(this.scene,this.raio,this.raio);
       
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.translate(0,this.raio,0);
        this.triangle2.display();


        
       

       /* this.triangle=new MyTriangle(this.scene,2,-2);
        this.triangle.display();*/
       
    
    }
     

      
    }
   
