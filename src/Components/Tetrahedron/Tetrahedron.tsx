import { Tetrahedron } from "../../3DShapes/Shapes3D";
import useAnimationAndControllHook from "../animationAndControllHook/useAnimationAndControllHooks";
interface TetrahedronShapeInterface {
	setShapesAndOwnPropsContainer: (value: any) => void;
}
export default function TetrahedronShape({
	setShapesAndOwnPropsContainer,
}: TetrahedronShapeInterface) {
    useAnimationAndControllHook(setShapesAndOwnPropsContainer)
	return <Tetrahedron />;
}
