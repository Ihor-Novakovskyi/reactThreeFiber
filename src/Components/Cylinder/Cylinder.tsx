import { Cylinder } from "../../3DShapes/Shapes3D";
import useAnimationAndControllHook from "../animationAndControllHook/useAnimationAndControllHooks";
interface CylinderShapeInterface {
	setShapesAndOwnPropsContainer: (value: any) => void;
}
export default function CylinderShape({
	setShapesAndOwnPropsContainer,
}: CylinderShapeInterface) {
    useAnimationAndControllHook(setShapesAndOwnPropsContainer)
	return <Cylinder />;
}
