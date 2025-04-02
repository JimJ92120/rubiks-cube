import { ColorRGBA, Position, Rotation } from "./type";

type EngineOptions = {
  width: number;
  height: number;
  backgroundColor?: ColorRGBA;
};

type VerticesAttribute = {
  vertices: number[];
  vertexSize: number;
};
type ObjectData = {
  attributesData: { [key: string]: VerticesAttribute };
  verticesCount: number;
  position: Position;
  rotation: Rotation;
};

class Engine {
  $canvas: HTMLCanvasElement;
  context: WebGL2RenderingContext;
  options: EngineOptions = {
    width: 500,
    height: 500,
    backgroundColor: [0, 0, 0, 1], // black
  };

  constructor($canvas: HTMLCanvasElement, options: EngineOptions) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext("webgl2")!;
    this.options = { ...this.options, ...options };

    this.resizeCanvas();
    this.clearCanvas();
  }

  renderTriangles(
    objectData: ObjectData,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    viewProjectionMatrix: number[]
  ): void {
    const { attributesData, verticesCount } = objectData;

    const program = this.createProgram(
      this.createShader(
        WebGL2RenderingContext.VERTEX_SHADER,
        vertexShaderSource
      )!,
      this.createShader(
        WebGL2RenderingContext.FRAGMENT_SHADER,
        fragmentShaderSource
      )!
    )!;
    this.context.useProgram(program);

    const matrixLocation = this.context.getUniformLocation(program, "u_matrix");
    this.context.uniformMatrix4fv(matrixLocation, false, viewProjectionMatrix);

    // attributes
    Object.keys(attributesData).map((attributeName) => {
      this.createBuffer(attributesData[attributeName].vertices);

      const attributeLocation = this.context.getAttribLocation(
        program,
        attributeName
      );

      this.context.vertexAttribPointer(
        attributeLocation,
        attributesData[attributeName].vertexSize,
        this.context.FLOAT,
        false,
        0,
        0
      );
      this.context.enableVertexAttribArray(attributeLocation);
    });
    //

    this.context.drawArrays(this.context.TRIANGLES, 0, verticesCount);
  }

  // canvas
  private resizeCanvas(): void {
    const { width, height } = this.options;

    this.$canvas.width = width;
    this.$canvas.height = height;
    this.context.viewport(0, 0, width, height);
  }

  clearCanvas(): void {
    this.context.clearColor(...this.options.backgroundColor!);
    this.context.clearDepth(1.0);
    this.context.enable(this.context.DEPTH_TEST);
    this.context.depthFunc(this.context.LEQUAL);

    this.context.clear(
      this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT
    );
  }

  // webgl
  private createShader(
    shaderType:
      | typeof WebGL2RenderingContext.VERTEX_SHADER
      | typeof WebGL2RenderingContext.FRAGMENT_SHADER,
    source: string
  ): WebGLShader | null {
    const shader = this.context.createShader(shaderType)!;

    this.context.shaderSource(shader, source);
    this.context.compileShader(shader);

    if (this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
      return shader;
    }

    console.log(this.context.getShaderInfoLog(shader));
    this.context.deleteShader(shader);

    return null;
  }

  private createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram | null {
    const program = this.context.createProgram()!;

    this.context.attachShader(program, vertexShader);
    this.context.attachShader(program, fragmentShader);
    this.context.linkProgram(program);

    if (this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
      return program;
    }

    console.log(this.context.getProgramInfoLog(program));
    this.context.deleteProgram(program);

    return null;
  }

  private createBuffer(bufferData: number[]): WebGLBuffer | null {
    const buffer = this.context.createBuffer();

    this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      new Float32Array(bufferData),
      this.context.STATIC_DRAW
    );

    return buffer;
  }
}

export default Engine;

export { ObjectData };
