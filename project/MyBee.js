
import { CGFobject } from '../lib/CGF.js';
import { MyBeeBody } from './MyBeeBody.js';
import { MyBeeHead } from './MyBeeHead.js';
 
import { MySphere } from './MySphere.js';

/**
 * MyBee
 * @constructor
 * @param scene
 */
export class MyBee extends CGFobject {
	constructor(scene) {
		super(scene); 
        this.initParts(); 
        
	}

    initParts(){

        this.head = new MyBeeHead(this.scene);
        this.body = new MyBeeBody(this.scene);
    }

    display(){

  
        this.head.display();
        this.body.display();
       

        
    }
    }



       
    
    
     

      
   
