import type { Renderer, Camera } from "../Aliases/aliases";
interface ShapesPositionProps {
	endPositionY: number;
	startPositionY: number;
	endPositionX: number;
	startPositionX: number;
}
export interface ShapeAndOwnPropsInterface {
	canvas: HTMLElement,
	shape: any,
	renderer: Renderer,
	camera: Camera,
	isShapeInCenter: boolean;
	positionProps: ShapesPositionProps;
	topDistanceToCanvasElement: number;
}
const shapePositionProps = {
    startPositionX: -10,
    startPositionY: 4,
    endPositionX: 0,
    endPositionY: 0,
};
type ShapesAndOWnPropsContsructorParamsIntreface = Pick<ShapeAndOwnPropsInterface, "canvas" | "renderer" | "camera" | "shape"> 
    

export default class ShapesAndOWnPropsContsructor implements ShapeAndOwnPropsInterface { 
    canvas: HTMLElement;
    shape: any;
    renderer: Renderer;
    camera: Camera;
    isShapeInCenter: boolean = false;
    positionProps: ShapesPositionProps;
    topDistanceToCanvasElement: number;
    constructor({ canvas, shape, renderer, camera }: ShapesAndOWnPropsContsructorParamsIntreface) { 
        this.canvas = canvas;
        this.renderer = renderer;
        this.shape = shape;
        this.camera = camera;
        this.positionProps = {
            ...shapePositionProps,
        };
        this.topDistanceToCanvasElement = Math.ceil(canvas.getBoundingClientRect().top + window.scrollY);
    }
}