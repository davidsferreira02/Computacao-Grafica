import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyStem } from "./MyStem.js";
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
    this.plane = new MyPlane(this,30);
    this.sphere= new MySphere(this ,10 ,50 ,50 , false);
    this.stem= new MyStem(this,10,10);
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displaySphere = false ;
    this.displayPanorama = true;
    this.displayPlane = false;
    this.displayStem = true;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.textureEarth = new CGFtexture(this,"images/earth.jpg");
    this.panorama = new CGFtexture(this,"images/panorama4.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.appearance2= new CGFappearance(this);
    this.appearance2.setTexture(this.textureEarth);
    this.appearance2.setTextureWrap('REPEAT','REPEAT');
    this.appearance3= new CGFappearance(this);
    this.appearance3.setTexture(this.panorama);
    this.appearance3.setTextureWrap('REPEAT','REPEAT');




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

    if(this.displaySphere){
      this.pushMatrix();
      this.appearance2.apply();
      this.sphere.display(); 
      this.popMatrix();
     
    }; 

    if(this.displayPanorama){
      this.panorama = new MyPanorama(this, this.appearance3);
    }; 
  

    // ---- BEGIN Primitive drawing section


   
    if (this.displayPlane){
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }


    if(this.displayStem){
      this.pushMatrix();
      this.appearance.apply();
      this.scale(0.2,1,0.2);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.stem.display();
    }

    // ---- END Primitive drawing section
  }
}
