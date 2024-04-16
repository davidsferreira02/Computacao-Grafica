
import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */ 

export class MyPetal extends CGFobject {
	constructor(scene) {
		super(scene);
	}
	
	display(){
        this.triangle=new MyTriangle(this.scene);
        this.triangle.display();
        this.scene.rotate(Math.PI,0,1,0);
        this.triangle2= new MyTriangle(this.scene);
        this.scene.rotate(Math.PI,1,0,0);
        this.triangle2.display();
       

       /* this.triangle=new MyTriangle(this.scene,2,-2);
        this.triangle.display();*/
       
    
    }
     

      
    }
   
