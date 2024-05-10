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

import { MyTriangle } from "./MyTriangle.js";



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
    this.triangle=new MyTriangle(this,1,3);
  


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 5;
    this.speedFactor = 0.1;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayPlane = false;
    this.displayFlower=false;
    this.displayBee=false;
    this.displayRock= false;
    this.displayGarden = false;
    this.displayRockSet=true;
    this.displayGrass=true;



    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.grass=new CGFtexture(this,"textures/relva.jpg");
    this.textureEarth = new CGFtexture(this, "images/earth.jpg");
    this.panorama = new CGFtexture(this, "images/panorama3.jpg");
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
    

    this.appearance5=new CGFappearance(this);
    this.appearance5.setTexture(this.grass);
    this.appearance5.setTextureWrap('REPEAT','REPEAT');



    this.testShaders = [
			new CGFshader(this.gl, "shaders/water.vert", "shaders/water.frag"),
		];

    this.testShaders[0].setUniformsValues({ uSampler2: 3});


    this.shadersList = {
		
			'grass':0
		};

    // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");

    this.showShaderCode = false;
    this.selectedExampleShader = 0;

		// force initial setup of shader code panels

		
	

        // animation
        this.setUpdatePeriod(50); // **at least** 50 ms between animations
    
  
     



  }

  checkKeys()  {
    var text="Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")) {
      this.bee.accelerate(this.speedFactor);
      text+=" W ";
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyS"))  {
      this.bee.accelerate(-this.speedFactor);
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
    if (this.gui.isKeyPressed("KeyP")) {
      this.bee.goDown(-0.1);
      text+=" P ";
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyU")) {
      this.bee.goUp(0.1);
      text+=" P ";
      keysPressed=true;
    }
    if (keysPressed)
      console.log(text);
  }

  


 
  update(t) {
  
    this.checkKeys();
    this.bee.update(50);
   
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
      this.appearance5.apply();
      this.translate(0, -100, 0);
      this.scale(300,400,400);
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
      this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
      this.bee.display();
      this.popMatrix();
  

    }

    if(this.displayRock){
      this.pushMatrix();
      this.appearance4.apply();
      this.rock.display();
      this.popMatrix();
    }

    if(this.displayGarden){
      this.pushMatrix();
      this.garden.display();
      this.popMatrix();
    }

    if (this.displayRockSet) {
   
         
        this.pushMatrix();
        this.appearance4.apply();
        this.scale(2, 2, 2);
        this.translate(0,-40,0);
        this.rockSet.display();
        this.popMatrix();
      
    }
    
    if (this.displayGrass) {
      for (let i = 0; i < 50 ; i++) {
        for (let j = 0; j < 50; j++) {
            this.pushMatrix();
            this.appearance5.apply();
            this.scale(3,1,3);
            this.translate(i-40, -80, j-45);
            //this.rotate(-Math.PI / 2, 1, 0, 0); // Rotate to be horizontal
            this.triangle.display(); // Call display on the triangle
            this.popMatrix();
        
  }
}
    }
  

    



   









    // ---- END Primitive drawing section
  }

 

}
