// Versão simplificada do grass.vert
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float time;  // Usado para animação baseada em tempo
uniform float xOff;  // Aleatoriedade reduzida

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
    
    // Aleatoriedade simplificada
    float swayOffset = mod(aVertexPosition.x + aVertexPosition.z, 2.0) - 1.0;
    float swayAmount = 0.1;  // Reduzindo a amplitude do movimento
    
    // Movimento horizontal simplificado baseado apenas em time
    float swayX = swayAmount * sin(time + swayOffset);
    float swayZ = swayAmount * cos(time + swayOffset);
    
    vec3 pos = aVertexPosition + vec3(swayX, 0.0, swayZ);

    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
}
