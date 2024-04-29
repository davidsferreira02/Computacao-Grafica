import { CGFobject,CGFappearance } from '../lib/CGF.js';
import { MyBeeHead } from './MyBeeHead.js';
import { MyBeeBody } from './MyBeeBody.js';
import { MyElipsoid } from './MyEllipsoid.js';


export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.orientation = 0; // Y
        this.position = [0,3,0] // X,Y,Z
        this.beatDirection = 1;
        this.oscilateDirection = 1;
        this.oscilateHeight = 0
        this.minHeight=0;
        this.initParts();



        this.materialWing = new CGFappearance(this.scene);
        
        // Definindo a cor difusa como cinza claro
        this.materialWing.setDiffuse(220/255, 220/255, 220/255,0); // R, G, B = 220/255, 220/255, 220/255
        
        // Definindo a cor especular como cinza claro
        this.materialWing.setSpecular(220/255, 220/255, 220/255,0); // R, G, B = 220/255, 220/255, 220/255
        
        // Definindo outras propriedades, se necessário
        this.materialWing.setShininess(10.0); // Brilho
        


    }
  
    initParts() {
        this.head = new MyBeeHead(this.scene);
        this.body = new MyBeeBody(this.scene);
        this.wing = new MyElipsoid(this.scene,1,10,10);

   
        
    
      
      }


      goDown(minHeight){
   
          this.position[1]+=minHeight;
        }


        goUp(minHeight){
   
          this.position[1]+=minHeight;
        }



  reset(){
    this.orientation = 0;
    this.position = [0,3,0];
  }



    
        turn(angle){
          var rad = Math.PI * angle/ 180;
          this.orientation += rad;
        }
      
  
    display ()
    {
  
        // HEAD
        this.scene.translate(0, 3, 0);
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);  
        this.scene.pushMatrix();
  
        this.head.display();
  
        // BODY
        this.body.display();
        this.scene.popMatrix();



        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,0.05,0.2);
        this.scene.scale(0.2,0.05,0.2);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
   

        this.wing.display(); // asa esquerda de cima
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,-0.025,0.15);
        this.scene.scale(0.15,0.035,0.15);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(1,1,0);
        this.wing.display(); // asa esquerda de baixo
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,0.05,-0.2);
        this.scene.scale(0.2,0.05,0.2);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);

     

        this.wing.display(); // asa direita de cima
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,-0.025,-0.15);
        this.scene.scale(0.15,0.035,0.15);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
   
        this.scene.scale(1,1,0);
        this.wing.display(); // asa direira de baixo
        this.scene.popMatrix();
  
    }
  }
  