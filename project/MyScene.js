import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyStem } from "./MyStem.js";
import { MyGarden } from "./MyGarden.js";

import { MyReceptacle } from "./MyReceptacle.js";
import { MyFlower } from "./MyFlower.js";
import { MyBee } from "./MyBee.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyHive } from "./MyHive.js";



/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 10, 50, 50, false);
    this.stem = new MyStem(this, 10, 10);
    //this.petal = new MyPetal(this);
    this.receptacle = new MyReceptacle(this, 10, 10);       
    this.flower = new MyFlower(this, 0, 0, 0);
    this.garden = new MyGarden(this, 5, 5)
    this.bee = new MyBee(this);
    this.rock=new MyRock(this,0.5,10,3, 0.8);
    this.rockSet=new MyRockSet(this,28);
    this.hive = new MyHive(this);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayPlane = false;
    this.displayFlower = false;
    this.displayBee = true;
    this.displayRock = false;
    this.displayGarden = true;
    this.displayRockSet = true;
    this.displayHive = true;


    this.hasPollen = false;
    this.descentBee = false;
    this.ascentBee = false;
    this.beeInHive = false;
    this.lastVelocity = 0;
    this.lastOrientation = 0;
    this.lastY = 0;

    

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.textureEarth = new CGFtexture(this, "images/earth.jpg");
    this.panorama = new CGFtexture(this, "images/panorama4.jpg");
    this.textureRock = new CGFtexture(this,"textures/rock.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance2 = new CGFappearance(this);
    this.appearance2.setTexture(this.textureEarth);
    this.appearance2.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance3 = new CGFappearance(this);
    this.appearance3.setTexture(this.panorama);
    this.appearance3.setTextureWrap('REPEAT', 'REPEAT');
    
    this.appearance4 = new CGFappearance(this);
    this.appearance4.setTexture(this.textureRock);
    this.appearance4.setTextureWrap('REPEAT', 'REPEAT');
        
    this.setUpdatePeriod(50); 
  }

  checkKeys()  {
    var text="Keys pressed: ";
    var keysPressed=false;

    if (!this.descentBee && !this.ascentBee){
      if (this.gui.isKeyPressed("KeyW")) {
        this.bee.accelerate(0.1);
        text+=" W ";
        keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyS"))  {
        this.bee.accelerate(-0.1);
        text+=" S ";
        keysPressed=true;
      }

      if (this.gui.isKeyPressed("KeyA")) {
        this.bee.turn(1);
        text+=" A ";
        keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyD")) {
        this.bee.turn(-1);
        text+=" D ";
        keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyR")) {
        this.bee.reset();
        text+=" R ";
        keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyL")) {
        this.bee.goDown(-0.1);
        text+=" L ";
        keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyU")) {
        this.bee.goUp(0.1);
        text+=" U ";
        keysPressed=true;
      }
      if (this.gui.isKeyPressed("KeyF") && !this.hasPollen) {
        this.lastOrientation = this.bee.orientation;
        this.lastVelocity = this.bee.velocity;
        this.lastY = this.bee.position[1];
        this.bee.velocity = 0;
        this.bee.goDown(-0.1); 
        this.descentBee = true;
        this.flagFlower = true;
      }
      if (this.gui.isKeyPressed("KeyO") && this.hasPollen) {
         this.turnTowardsHive();
         this.beeInHive = true;
         this.bee.velocity = 0;
      }
    }
    else if (this.gui.isKeyPressed("KeyP")) {
      this.bee.goUp(0.1); 
      this.ascentBee = true;
      this.descentBee = false;
    } 

    if (keysPressed)
      console.log(text);
  }

  update(t) {
  
    this.checkKeys();
    this.bee.update(50);
  }

  turnTowardsHive() {
    let hivePosition = [-30, -83, -17.4];
    let directionX = hivePosition[0] - this.bee.position[0];
    let directionZ = hivePosition[2] - this.bee.position[2];

    let targetAngle = Math.atan2(-directionZ, -directionX);
    
    let angleDiff = targetAngle - (this.bee.orientation);

    this.bee.turn(angleDiff *180 /Math.PI);

    if (Math.abs(this.bee.position[1] + 83) > 0.001){
      this.bee.goDown(-0.1);
    }
  }



  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    if (this.displaySphere) {
      this.pushMatrix();
      this.appearance2.apply();
      this.sphere.display();
      this.popMatrix();

    };

    if (this.displayPanorama) {
      this.panorama = new MyPanorama(this, this.appearance3);
    };


    // ---- BEGIN Primitive drawing section

    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0, -100, 0);
      this.scale(400, 400, 400);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }
  

    if(this.displayFlower){
      this.pushMatrix();
      this.flower.display();
      this.popMatrix();
    }

    if(this.displayBee){
      this.pushMatrix();
      this.scale(10,10,10);
      this.bee.display();
      this.popMatrix();
  

    }

    if(this.displayRock){
      this.pushMatrix();
      this.popMatrix();
    }

    if(this.displayGarden){
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }

    if(this.displayRockSet){
      this.pushMatrix();
      this.appearance4.apply();
      this.rockSet.display();
      this.popMatrix();
    }

    if(this.displayHive){
      this.pushMatrix();
      this.hive.display();
      this.popMatrix();
    }

    if (this.descentBee){
      let nearestFlower = null;
      let minDistance = Number.MAX_VALUE;
      if(this.flagFlower){
        for (let flowerArray of this.garden.flowers) {
          for (let flower of flowerArray) {
            const distance = Math.sqrt(
              Math.pow(this.bee.position[0] - flower.x, 2) +
              Math.pow(this.bee.position[1] - flower.y, 2) +
              Math.pow(this.bee.position[2] - flower.z, 2)
            );
            console.log(distance);

            if (distance < minDistance && flower.hasPollen) {
                minDistance = distance;
                nearestFlower = flower;
            }
            console.log(nearestFlower);

          }
        }
      }
      this.flagFlower = false;
    }
    
      /*if (!this.beeFlower) this.bee.goDown(-0.1); 
      this.bee.accelerate(-0.1);
      this.beeFlower = true;
      if(flower.hasPollen){
        flower.hasPollen = false;   
        this.hasPollen = true;
        this.descentBee = false;
        this.bee.hasPollen = true;   
      } */
    

    if (this.ascentBee){
      if (Math.abs(this.bee.position[1] - this.lastY) < 0.001){
        this.bee.accelerate(-0.1);
        this.ascentBee = false;
        this.bee.velocity = this.lastVelocity;
        this.bee.orientation = this.lastOrientation;
      }
      else {
        this.bee.goUp(0.15);
      }
    }

    if (this.beeInHive){
      if (Math.abs(this.bee.position[0] + 30) < 0.001  &&  Math.abs(this.bee.position[1] + 83) < 0.001  &&  Math.abs(this.bee.position[2] + 20) < 0.001){
        this.bee.accelerate(-0.1);
        this.beeInHive = false;
        
      }
      else if (Math.abs(this.bee.position[1] + 83) > 0.001){
        this.bee.goDown(-0.1);
      }
    }

  }
}
