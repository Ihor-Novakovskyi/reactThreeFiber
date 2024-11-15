import { Renderer, Camera } from "../Aliases/aliases";
export interface SetCameraRenderingPropsInterface {
	camera: Camera;
	renderer: Renderer;
}
export default function updateCameraRatio({
	camera,
	renderer,
}: SetCameraRenderingPropsInterface) {
	const width = document.documentElement.clientWidth;
	const height = document.documentElement.clientHeight;
	camera.updateProjectionMatrix();
	camera.aspect = width / height;
	renderer.setSize(width, height);
}
