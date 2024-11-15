import useGroupControllAnimation from './useGroupControll';
import { Cube, Torus, Cylinder } from '../../3DShapes/Shapes3D';

interface GroupInterface { 
    closeLoadPage: () => void,
}
export default function Group({closeLoadPage}: GroupInterface) {
    useGroupControllAnimation(closeLoadPage);
    return (
        <>
            <Cube/>
            <Cylinder/>
            <Torus/>
        </>
    )

}
