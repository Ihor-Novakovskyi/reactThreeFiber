import { Cube } from "../../3DShapes/Shapes3D";
import useAnimationAndControllHook from "../animationAndControllHook/useAnimationAndControllHooks";
interface CubeShapeInterface {
	setShapesAndOwnPropsContainer: (value: any) => void;
}
export default function CubeShape({
	setShapesAndOwnPropsContainer,
}: CubeShapeInterface) {
    useAnimationAndControllHook(setShapesAndOwnPropsContainer)
	return <Cube />;
}
