import { CGFobject,CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyBeeHead } from './MyBeeHead.js';
import { MyBeeBody } from './MyBeeBody.js';
import { MyElipsoid } from './MyEllipsoid.js';
import { MyPollen } from './MyPollen.js';


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
        this.pollen=false;
        this.collectingHeight=5; 
        this.flyingHeight= 0; 
        this.collectingRange = 1;
        this.targetPollen = null;
        this.movingToPollen = false;
        this.lastPos = null;
        this.movingHive = false;
        this.flowerPollen = null;
        this.initParts();




        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.disable(this.scene.gl.CULL_FACE);

        this.materialWing = new CGFappearance(this.scene);
        this.materialWing.setAmbient(1,1,1,0.1);
      
        
        this.materialWing.setDiffuse(0.5,0.5,0.5,0.1); // R, G, B = 220/255, 220/255, 2 20/255
        
        // Definindo a cor especular como cinza claro
        this.materialWing.setSpecular(0.1, 0.1,0.1,0.1); 
        this.materialWing.setEmission(1,1,1,0.1);
        
        this.texturePollen = new CGFtexture(this.scene,"textures/pollen.jpg");

        this.appearancePollen= new CGFappearance(this.scene);
        this.appearancePollen.setAmbient(1, 1, 1, 1);
        this.appearancePollen.setDiffuse(1, 1, 1, 1);
        this.appearancePollen.setSpecular(1, 1, 1, 1);
        this.appearancePollen.setTexture(this.texturePollen);
        this.appearancePollen.setTextureWrap('REPEAT', 'REPEAT');


    }
  
  
    moveToPollen() {
      const gardenPos = this.scene.garden.getPollenPositions();
      let closestPollen = null;
      let minDistance = Infinity;
      this.lastPos = this.position;
      gardenPos.forEach(pos => {
        let newpos = [pos[0]-35, pos[1], pos[2]-30];
        const distance = this.calculateDistance(this.position, newpos);
        if (distance < minDistance) {
          minDistance = distance;
          closestPollen = newpos;
        }
      });
      
      for (let i = 0; i < this.scene.garden.numRows; i++) {
        for (let j = 0; j < this.scene.garden.numColumns; j++) {
            const flower = this.scene.garden.flowers[i][j];
            console.log(flower.position[2] + " " + closestPollen[2]+30);
            if (flower.position[0] == closestPollen[0]+35 && flower.position[1]+flower.tamanhoCaule+ flower.raioCirc == closestPollen[1] && flower.position[2] == closestPollen[2]+30) {
                this.flowerPollen = flower;
            }
        }
    }

      if (closestPollen != null) {
        this.targetPollen = closestPollen;
        this.movingToPollen = true;
      }
      
    }

    updatePosition() {
      if (this.movingToPollen && this.targetPollen != null) {
        let direction = [
          this.targetPollen[0] - this.position[0]*5,
          this.targetPollen[1] - this.position[1]*5,
          this.targetPollen[2] - this.position[2]*5
        ];
  
        const length = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
        const normalizedDirection = [direction[0] / length, direction[1] / length, direction[2] / length];
  
        this.position[0] += normalizedDirection[0] * 0.3;
        this.position[1] += normalizedDirection[1] * 0.3;
        this.position[2] += normalizedDirection[2] * 0.3;
  
        if (length < this.collectingRange) {
          if(this.pollen && this.movingHive) {
            this.pollen = false;
          }
          else {
            this.pollen = true;  
            this.movingToPollen = false;  
            this.flowerPollen.Haspollen = false;
          }      
        }
      }
    }

    calculateDistance(pos1, pos2) {
      return Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) +
        Math.pow(pos1[1] - pos2[1], 2) +
        Math.pow(pos1[2] - pos2[2], 2)
      );
    }

    releasePollen() {
      if (this.pollen) {
        this.targetPollen = this.lastPos;
        this.movingToPollen = true;
      }
    }

    moveToHive() {
      if (this.pollen) {
        
        this.targetPollen = this.scene.hive.getPosition();
        this.movingHive = true;
        this.movingToPollen = true;
      }
    }
  
    initParts() {
      this.head = new MyBeeHead(this.scene);
      this.body = new MyBeeBody(this.scene);
      this.wing = new MyElipsoid(this.scene,1,250,250);
      this.polen = new MyPollen(this.scene, 0.5, 100, 100, [ this.position[0] + 2, this.position[1]-2, this.position[2]]);
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

      const beatIncrementMin = 0.02;
      const beatIncrementMax = 0.9;
    
      const speedFactor = Math.min(Math.abs(0.7) / 5, 1); // Limita o fator a um máximo de 1
      const beatIncrement = beatIncrementMin + (beatIncrementMax - beatIncrementMin) * speedFactor ;
    
      if (this.beatAngle >= 0.2) {
        this.beatDirection = -1;
      } else if (this.beatAngle <= -0.2) {
        this.beatDirection = 1;
      }
      this.beatAngle += beatIncrement * this.beatDirection;
    }


    update(t) {
      var timeSinceAppStart = (t-Date.now())/1000;
      
      const angle = this.phase + timeSinceAppStart * this.frequency;
      const offsetY = Math.sin(angle) * this.amplitude;
      
      this.updatePosition();

      if(!this.movingToPollen){
        this.BeePositionY = this.startY + offsetY;
        const velocityX = -this.velocity * Math.cos(-this.orientation);
        const velocityZ = -this.velocity * Math.sin(-this.orientation);
    
        this.position[0] += velocityX;
        this.position[2] += velocityZ;
      }
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
      
  
    display () {

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

      if (this.pollen){
        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2);
        this.scene.translate(0.8, -0.8, -0.2);
        this.appearancePollen.apply();
        this.polen.display();
        this.scene.popMatrix();
      }
    }
  }
  