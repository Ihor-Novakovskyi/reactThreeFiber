import * as THREE from "three";
import type { ShapeAndOwnPropsInterface } from "../../ShapesAndOwnPropsConstructor/shapesAndOwnPropsConstructor";
import type { Renderer, Camera, Scene } from "../../Aliases/aliases";
import type { ShapesAndOwnPropsContainerType } from "../../Pages/MainPage/useScrollAndResizeControlls";
import updateCameraRatio from "../../generalControllers/updateCameraRatio";

interface calculateShapePositionDuringScrolingInterface {
	endPositionY: number;
	startPositionY: number;
	endPositionX: number;
	startPositionX: number;
	maxDistanceToScrollInsideCanvas: number;
	scrollDistanceInsideCanvas: number;
}

export default function createScrollController(
	ShapesAndOwnPropsContainer: ShapesAndOwnPropsContainerType
) {
	function scroll() {
		ShapesAndOwnPropsContainer.forEach(setPositionShapeDuringScrolling);
	}
	function resize() {
		updateShapeSetsAndRenderSetsAfterResize(ShapesAndOwnPropsContainer);
	}
	return {
		resize,
		scroll,
		toDrawElementsWhenPageWasLoaded: scroll,
	};
}

function updatePropertyOfDistanceToCanvasElementAfterWindowResize(
	elementWithProps: ShapeAndOwnPropsInterface
) {
	const pageScroll = window.scrollY;
	elementWithProps.topDistanceToCanvasElement =
		elementWithProps.canvas.getBoundingClientRect().top + pageScroll;
}

function changeBackgroundCanvasBetweenFullScreeenAndDefaultScreen({
	renderer,
	canvas,
}: {
	renderer: Renderer;
	canvas: HTMLElement;
}) {
	const isElementInFullScreen =
		document.fullscreenElement === canvas ? true : false;
	isElementInFullScreen
		? renderer.setClearColor(0x000000)
		: renderer.setClearColor(0xffffff, 0);
}
function updateShapeSetsAndRenderSetsAfterResize(
	ShapesAndOwnPropsContainer: ShapesAndOwnPropsContainerType
) {
	ShapesAndOwnPropsContainer.forEach((shapeAndOwnProps) => {
		const notFullSreen = document.fullscreenElement === null;
		const { camera, renderer, canvas } = shapeAndOwnProps;
		changeBackgroundCanvasBetweenFullScreeenAndDefaultScreen({
			renderer,
			canvas,
		});
		updateCameraRatio({ camera, renderer });
		returnDefaultPositionCameraAfterFullScreen(camera);
		if (notFullSreen) {
			updatePropertyOfDistanceToCanvasElementAfterWindowResize(
				shapeAndOwnProps
			);
			setPositionShapeDuringScrolling(shapeAndOwnProps);
		}
	});
}
//

function setPositionShapeDuringScrolling(
	shapeAndOwnProps: ShapeAndOwnPropsInterface
) {
	const { canvas, shape, topDistanceToCanvasElement, positionProps } =
		shapeAndOwnProps;
	const scrollY = Math.ceil(window.scrollY); //нужно увеличивать иначе не будет срабатываеть для нижнего элемента условие
	const windowHeight = document.documentElement.clientHeight;
	const maxDistanceToScrollInsideCanvas = canvas.offsetHeight;
	const { startPositionX, startPositionY, endPositionX, endPositionY } =
		positionProps;
	if (topDistanceToCanvasElement >= windowHeight) {
		// scrollY - (topDistanceToCanvasElement - windowHeight) === 0 значит скролл дошел до элемента- bottom wiew port совпал с верхней точкой целевого контейнера
		const scrollDistanceToCanvasElement =
			topDistanceToCanvasElement - windowHeight;
		if (scrollY - scrollDistanceToCanvasElement >= 0) {
			//здесь фиксированній размер - topDistanceToCanvasElement - windowHeight. Условие выполняетс когда боттом окна дошел о топа элемента.Тоесть мы доскролилии относительно нижнией точки окна
			// доскролили до єлемента или проскролили его
			const scrollDistanceAfterWindowBottomEdgeIntersetionedWithCanvas =
				scrollY - scrollDistanceToCanvasElement; // расстояние когда боттом виндов пересек канвас
			// Рассматриваем точку пересечения как начало точки отсчета - тоесть 0, после того как окно пересеклось и начало идти от границы пересечения
			if (
				maxDistanceToScrollInsideCanvas -
					scrollDistanceAfterWindowBottomEdgeIntersetionedWithCanvas >=
				0
			) {
				// условие выполняется если мы скролим внутри элемента
				const scrollDistanceInsideCanvas =
					scrollDistanceAfterWindowBottomEdgeIntersetionedWithCanvas;
				const { changePositionShapeByX, changePositionShapeByY } =
					calculateShapePositionDuringScroling({
						endPositionY,
						startPositionY,
						endPositionX,
						startPositionX,
						maxDistanceToScrollInsideCanvas,
						scrollDistanceInsideCanvas,
					});
				setShapePosition({
					shape,
					x: changePositionShapeByX,
					y: changePositionShapeByY,
				});
				maxDistanceToScrollInsideCanvas === scrollDistanceInsideCanvas
					? (shapeAndOwnProps.isShapeInCenter = true)
					: (shapeAndOwnProps.isShapeInCenter = false);
			} else {
				// мы проскролили канвас
				setShapePosition({ shape, x: endPositionX, y: endPositionY });
				shapeAndOwnProps.isShapeInCenter = true;
				// мы проскролили элемент и ставим его в центр
				// можно его увелимчить
			}
		} else {
			setShapePosition({ shape, x: startPositionX, y: startPositionY });
		}
	} else {
		// Элемент видно и к нему не нужно скролить, так как он виден в окне
		setShapePosition({ shape, x: endPositionX, y: endPositionY });
		shapeAndOwnProps.isShapeInCenter = true;
	}
}
function returnDefaultPositionCameraAfterFullScreen(camera: Camera) {
	camera.rotation.y = 0;
	camera.rotation.x = 0;
}
function setShapePosition({
	shape,
	x,
	y,
}: {
	shape: any;
	x: number;
	y: number;
}) {
	shape.position.x = x;
	shape.position.y = y;
}

function calculateShapePositionDuringScroling({
	endPositionY,
	startPositionY,
	endPositionX,
	startPositionX,
	maxDistanceToScrollInsideCanvas,
	scrollDistanceInsideCanvas,
}: calculateShapePositionDuringScrolingInterface) {
	const stepY = Math.abs(
		(endPositionY - startPositionY) / maxDistanceToScrollInsideCanvas
	);
	const stepX = Math.abs(
		(endPositionX - startPositionX) / maxDistanceToScrollInsideCanvas
	);
	const changePositionShapeByX =
		startPositionX + stepX * scrollDistanceInsideCanvas;
	const changePositionShapeByY =
		startPositionY - stepY * scrollDistanceInsideCanvas;
	return { changePositionShapeByX, changePositionShapeByY };
}
//
