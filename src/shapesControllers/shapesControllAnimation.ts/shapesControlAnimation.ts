import { DEFAULT_THREE_VALUES } from "../../enum/defaultValues";
import type { ShapeAndOwnPropsInterface } from "../../ShapesAndOwnPropsConstructor/shapesAndOwnPropsConstructor";
export default function animate(
	delta: number,
	shapeAndOwnProps: ShapeAndOwnPropsInterface
) {
	setAnimationProps({ shapeAndOwnProps, delta });
}

function animateScaling(
	shapeAndOwnProps: ShapeAndOwnPropsInterface,
	step: number
) {
	const stepToScale = step * 2;
	const stepToUnScale = step * 10;
	const { isShapeInCenter, shape } = shapeAndOwnProps;
	const isScale = isShapeInCenter;
	const zPosition = shape.position.z;
	switch (isScale) {
		case true:
			DEFAULT_THREE_VALUES.MAX_SCALE_SHAPE >= zPosition + stepToScale
				? (shape.position.z += stepToScale)
				: (shape.position.z = DEFAULT_THREE_VALUES.MAX_SCALE_SHAPE);
			return;
		case false:
			zPosition - stepToUnScale > DEFAULT_THREE_VALUES.DEFAULT_SCALE
				? (shape.position.z -= stepToUnScale)
				: (shape.position.z = DEFAULT_THREE_VALUES.DEFAULT_SCALE);
			return;
	}
}
function setAnimationProps({
	shapeAndOwnProps,
	delta,
}: {
	shapeAndOwnProps: ShapeAndOwnPropsInterface;
	delta: number;
}) {
	const { shape } = shapeAndOwnProps;
	const step = delta;
	shape.rotation.y += step;
	shape.rotation.x += step;
	animateScaling(shapeAndOwnProps, delta);
}
