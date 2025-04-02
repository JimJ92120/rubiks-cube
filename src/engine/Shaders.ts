const _VERTEX_SHADER_CLIP_TO_SPACE = (
  width: number,
  height: number,
  pixelSize: number
) => `#version 300 es
  in vec4 a_position;
  in vec4 a_color;

  uniform mat4 u_matrix;

  out vec4 vertex_Color;

  const vec2 clipSpaceRatio = vec2(
    ${(pixelSize * 2) / width - 1},
    ${(pixelSize * 2) / height - 1}
  );
  const vec2 u_resolution = vec2(${width}, ${height});
 
  vec4 toClipSpace(vec4 position) {
    vec2 clipSpace =
      (vec2(a_position[0], a_position[1]) / u_resolution) * 2.0 - 1.0;

    return vec4(
      clipSpace * vec2(1, -1),
      position[2],
      position[3]
    );
  }

  void main() {
    gl_Position = u_matrix * a_position;

    vertex_Color = a_color;
  }
`;

class Shaders {
  static vertexShader: string = `#version 300 es
in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 vertex_Color;

void main() {
  gl_Position = u_matrix * a_position;

  vertex_Color = a_color;
}
  `;

  static fragmentShader: string = `#version 300 es
  precision highp float;

  in vec4 vertex_Color;
  
  out vec4 outColor;
 
  void main() {
    outColor = vertex_Color;
  }
`;
}

export default Shaders;
