import { CGFobject,CGFappearance } from '../lib/CGF.js';
import { MyBeeHead } from './MyBeeHead.js';
import { MyBeeBody } from './MyBeeBody.js';
import { MyElipsoid } from './MyEllipsoid.js';


export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.orientation = 0; // Y
        this.position = [0,0,0] // X,Y,Z
        this.beatDirection = 1;
        this.oscilateDirection = 1;
        this.oscilateHeight = 0
        this.minHeight=0;
        this.beatAngle=0;
       this.velocity=0;
      this.phase=0;
      this.frequency=2;
      this.amplitude=0.1;
      this.BeePositionY=0;
      this.startY=0;
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



      updateVelocity(newVelocity) {
        this.velocity = newVelocity;
      }
    

      accelerate(acceleration){
        if(this.velocity+acceleration >= 0){
          this.velocity += acceleration;
        }
      }
    
    

      goDown(minHeight){
   
          this.position[1]+=minHeight;
        }


        goUp(minHeight){
   
          this.position[1]+=minHeight;
        }



        beatWings() {
          // valores de incremento minimo e máximo
          const beatIncrementMin = 0.02;
          const beatIncrementMax = 0.9;
        
          // o incremento conforme a velocidade do passaro
          const speedFactor = Math.min(Math.abs(0.7) / 5, 1); // Limita o fator a um máximo de 1
          const beatIncrement = beatIncrementMin + (beatIncrementMax - beatIncrementMin) * speedFactor ;
        
          // Atualizar o ângulo de bater as asas com base na direção atual e no incremento
          if (this.beatAngle >= 0.2) {
            this.beatDirection = -1;
          } else if (this.beatAngle <= -0.2) {
            this.beatDirection = 1;
          }
          this.beatAngle += beatIncrement * this.beatDirection;
        }


        update(t) {
          console.log("Bird position: " + this.position);
          var timeSinceAppStart = (t-Date.now())/1000;
         
          const angle = this.phase + timeSinceAppStart * this.frequency;
          const offsetY = Math.sin(angle) * this.amplitude;
          this.BeePositionY = this.startY + offsetY;
      
          // Calcular as componentes X e Z do vetor de velocidade
          const velocityX = -this.velocity * Math.cos(-this.orientation);
          const velocityZ = -this.velocity * Math.sin(-this.orientation);
      
          // Atualizar a posição da abelha usando as componentes X e Z do vetor de velocidade
          this.position[0] += velocityX;
          this.position[2] += velocityZ;
      
          this.beatWings();
      }
      


  reset(){
    this.orientation = 0;
    this.velocity = 0;
    this.position = [0,0,0];
    this.beatAngle = 0;
    this.beatDirection = 1;
    this.oscilateHeight = 0;
    this.oscilateDirection = 1;
    this.isMoving = false;

   
  }


  




    
        turn(angle){
          var rad = Math.PI * angle/ 180;
          this.orientation += rad;
        }
      
  
    display ()
    {
  
        // HEAD
      
        this.scene.translate(this.position[0], this.BeePositionY+ this.position[1],this.position[2]);
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
   
        this.scene.rotate(-this.beatAngle, 0, 1, 0);
        this.wing.display(); // asa esquerda de cima
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,-0.025,0.15);
        this.scene.scale(0.15,0.035,0.15);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(1,1,0);
        this.scene.rotate(-this.beatAngle, 0, 1, 0);
        this.wing.display(); // asa esquerda de baixo
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,0.05,-0.2);
        this.scene.scale(0.2,0.05,0.2);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);

        this.scene.rotate(this.beatAngle, 0, 1, 0 );

        this.wing.display(); // asa direita de cima
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.materialWing.apply();
        this.scene.translate(0.2,-0.025,-0.15);
        this.scene.scale(0.15,0.035,0.15);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
   
        this.scene.scale(1,1,0);
        this.scene.rotate(this.beatAngle, 0, 1, 0 );
        this.wing.display(); // asa direira de baixo
        this.scene.popMatrix();
  
    }
  }
  