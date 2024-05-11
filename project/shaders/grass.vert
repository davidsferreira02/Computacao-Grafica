#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float time;
uniform float xOff;

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;
uniform sampler2D uSampler5;

varying vec3 height;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(7.345, 67.890))) * 987.654);
}

void main() {
    vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;
    float swayOffset = random(vec2(xOff, xOff * 0.9)) * 1.5;
    if (aVertexPosition.y > 0.0) {
        height = aVertexPosition + vec3((sin(time + swayOffset) / 7.0), 0.0, 0.0);
        height.y = height.y + (cos(time + swayOffset * 2.5) / 80.0);
    } else {
        height = aVertexPosition;
    }

    gl_Position = uPMatrix * uMVMatrix * vec4(height, 1);
}
