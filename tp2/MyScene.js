import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnicCubeQuad.js";


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
    this.diamond = new MyDiamond(this);
    this.triangle=new MyTriangle(this);
    this.triangleSmall=new MyTriangleSmall(this);
    this.triangleBig=new MyTriangleBig(this);
    this.parallelogram=new MyParallelogram(this);
    this.tangram=new MyTangram(this);
   this.unitCube=new MyUnitCube(this);
   //this.quad=new MyQuad(this);
   this.unitCubeQuad=new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
   // this.displayTangram=true;
   this.displayUnitCube=false;
   this.displayQuad=false;
 this.displayUnitCubeQuad=true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
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

    

    this.Tx = 1;
    this.Ty = 0;
    this.Tz = 0;
    var a = Math.PI/2;
  this.Sx=1;
  this.Sy=1;
  this.Sz=1;

  /*  this.matrixTranslate = [ 1, 0, 0, 0,
                             0, 1, 0, 0,
                             0, 0, 1, 0,
                             this.Tx, this.Ty, this.Tz, 1 ];

    this.matrixRotate = [ Math.cos(a), Math.sin(a), 0, 0,
                         -Math.sin(a), Math.cos(a), 0, 0,
                          0, 0, 1, 0,
                          0, 0, 0, 1 ]; 
                          
     this.matrixScaling = [this.Sx,0,0,0,
                           0,this.Sy,0,0,
                           0,0,this.Sz,0,
                           0,0,0,1];                     
    
*/
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();


    // Draw axis
    if (this.displayAxis) this.axis.display();

    if(this.displayUnitCube) this.unitCube.display();


    if(this.displayUnitCubeQuad) this.unitCubeQuad.display();


    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];
    
    this.multMatrix(sca);

    this.pushMatrix();
   /* this.multMatrix(this.matrixTranslate);
    this.multMatrix(this.matrixRotate);
    this.multMatrix(this.matrixScaling);*/
    this.popMatrix();

    

    // ---- BEGIN Primitive drawing section


   /* if(this.displayTangram) 
    this.tangram.display();
*/
    

    // ---- END Primitive drawing section
  }
}
