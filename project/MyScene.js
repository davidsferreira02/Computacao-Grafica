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
import { MyAnimatedObject } from "./MyAnimatedObject.js";

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


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayPlane = false;
    this.displayFlower=false;
    this.displayBee=true;
    this.displayRock= false;
    this.displayGarden = false;



    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.textureEarth = new CGFtexture(this, "images/earth.jpg");
    this.panorama = new CGFtexture(this, "images/panorama4.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance2 = new CGFappearance(this);
    this.appearance2.setTexture(this.textureEarth);
    this.appearance2.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance3 = new CGFappearance(this);
    this.appearance3.setTexture(this.panorama);
    this.appearance3.setTextureWrap('REPEAT', 'REPEAT');


        // animation
        this.setUpdatePeriod(50); // **at least** 50 ms between animations

        this.appStartTime=Date.now(); // current time in milisecs
    
    
        this.animVal1=0;
        this.animVal2=0;
        this.animVal3=0;
    
        //#region Pars for anim 3
        this.startVal=0;
        this.endVal=6;
        this.animStartTimeSecs=2;
        this.animDurationSecs=3;
        this.length=(this.endVal-this.startVal);
        //#endregion
      
        //#region Ex. 4
        this.numAnimObjs=4;

        this.animObjs= [
          new MyAnimatedObject(this,0,5,1,3),
          new MyAnimatedObject(this,0,2,2,3),
          new MyAnimatedObject(this,0,1,3,2),
          new MyAnimatedObject(this,-5,5,4,3)
        ]




  }

  checkKeys()  {
    var text="Keys pressed: ";
    var keysPressed=false;
  
 
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
    if (this.gui.isKeyPressed("KeyP")) {
      this.bee.goDown(-1);
      text+=" P ";
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyU")) {
      this.bee.goUp(1);
      text+=" P ";
      keysPressed=true;
    }
    if (keysPressed)
      console.log(text);
  }

  

  updateAnimations(t) {
    // Update without considering time - BAD
    this.animVal1 += 0.1;
  
    // Continuous animation based on current time and app start time 
    var timeSinceAppStart = (t - this.appStartTime) / 1000.0;
    this.animVal2 = -2 + 2 * Math.sin(timeSinceAppStart * Math.PI * 3);
  
    // Animation based on elapsed time since animation start
    var elapsedTimeSecs = (t - this.animStartTimeSecs * 1000) / 1000; // Convert milliseconds to seconds
    if (elapsedTimeSecs >= 0 && elapsedTimeSecs <= this.animDurationSecs) {
      // Calculate the progress of the animation (0 to 1)
      var progress = elapsedTimeSecs / this.animDurationSecs;
      // Interpolate between start and end values
      this.animVal3 = this.startVal + progress * this.length;
    }
  
    // Delegate animations to objects
    for (var i = 0; i < this.numAnimObjs; i++)
      this.animObjs[i].update(timeSinceAppStart);
  }
  
  
 
  update(t) {
    // Update animations
    this.updateAnimations(t);
  
    // Check for key inputs
    this.checkKeys();

    this.bee.beatWings();
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
      this.rock.display();
      this.popMatrix();
    }

    if(this.displayGarden){
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }


    



   











    // ---- END Primitive drawing section
  }
}
