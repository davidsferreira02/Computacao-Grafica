import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
      super(scene);


      this.initBuffers();
  }

  initBuffers() {
      
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
}
