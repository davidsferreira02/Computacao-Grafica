#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

uniform sampler2D uSampler4;
uniform float xOff;
uniform float time;


void main() {
    vec4 color = texture2D(uSampler4, vTextureCoord);
    if (color.a < 0.9) discard;

    gl_FragColor = color;

    
}
