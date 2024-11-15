import { Torus } from "../../3DShapes/Shapes3D";
import useAnimationAndControllHook from "../animationAndControllHook/useAnimationAndControllHooks";
interface TorusShapeInterface {
	setShapesAndOwnPropsContainer: (value: any) => void;
}
export default function TorusShape({
	setShapesAndOwnPropsContainer,
}: TorusShapeInterface) {
    useAnimationAndControllHook(setShapesAndOwnPropsContainer)
	return <Torus />;
}
