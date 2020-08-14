﻿import Reading from "./Reading";
import Triangulation from "./Triangulation";
import RenderFactory from "./RenderFactory";
import AccessPoint from "./AccessPoint";

export default class Renderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private shader_program: WebGLProgram;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = RenderFactory.getContext(this.canvas);
        this.shader_program = RenderFactory.getShaderProgram(this.gl);
    }

    private setOffset(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, shader_program: WebGLProgram): void {
        const offset_uniform = gl.getUniformLocation(shader_program, "u_offset");
        gl.uniform2f(offset_uniform, canvas.clientWidth, canvas.clientHeight);
    }

    private setCoords(readings: Reading[]): void {
        const coords = Triangulation.getCoords(readings);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint16Array(coords), this.gl.STREAM_DRAW);

        const coords_attribute = this.gl.getAttribLocation(this.shader_program, "a_coords");
        this.gl.vertexAttribPointer(coords_attribute, 2, this.gl.UNSIGNED_SHORT, false, 0, 0);
        this.gl.enableVertexAttribArray(coords_attribute);
    }

    private setColors(readings: Reading[], access_point: AccessPoint): void {
        const colors = Triangulation.getColors(readings, access_point);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(colors), this.gl.STREAM_DRAW);

        const color_attribute = this.gl.getAttribLocation(this.shader_program, "a_color");
        this.gl.vertexAttribPointer(color_attribute, 4, this.gl.UNSIGNED_BYTE, false, 0, 0);
        this.gl.enableVertexAttribArray(color_attribute);
    }

    render(readings: Reading[], access_point: AccessPoint): void {
        this.setOffset(this.canvas, this.gl, this.shader_program);
        this.setCoords(readings);
        this.setColors(readings, access_point);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, readings.length);
    }
}