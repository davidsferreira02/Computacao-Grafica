#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float time;  // Tempo uniforme para animação baseada em tempo
uniform float xOff;  // Deslocamento para aumentar a aleatoriedade

varying vec2 vTextureCoord;
varying vec3 vVertexNormal;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.891, 78.233))) * 43758.5453123);
}

void main() {
    vTextureCoord = aTextureCoord;
    vVertexNormal = aVertexNormal;

    // Adiciona movimento vertical e horizontal
    float sway = random(vec2(aVertexPosition.x * xOff, aVertexPosition.z * xOff)) * 2.0 - 1.0;
    float swayAmount = 0.3;
    vec3 pos = aVertexPosition;

    // Aplica o movimento mais significativo nos vértices superiores das fitas
    if (pos.y > 0.5) {
        float swayX = sin(time + sway) * swayAmount;
        float swayZ = cos(time + sway) * swayAmount;
        pos.x += swayX;
        pos.z += swayZ;
    }

    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}
