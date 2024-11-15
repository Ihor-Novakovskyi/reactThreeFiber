import { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import setDefaultCameraPosition from "../../generalControllers/setDefaultCameraPosition";
import updateCameraRatio from "../../generalControllers/updateCameraRatio";
import {setDefaultShapesPosition, createFullScreenController, animateMovingShapesAroundAndCameraScaling, mouseMoveController } from "./ShapeControllersAndSets";
import { DEFAULT_THREE_VALUES } from "../../enum/defaultValues";
import type { Camera } from "../../Aliases/aliases";
export default function useGroupControllAnimation(closeLoadPage: () => void) { 
const { gl: renderer, scene, camera } = useThree();
const { domElement:canvas } = renderer;

useEffect(() => { 
    const { children } = scene;
    const isShapeCreated = children.length;
    if (isShapeCreated) { 
        renderer.setClearColor(0x000000)
        setDefaultShapesPosition({ shapes: children });
        setDefaultCameraPosition({ camera: camera as Camera, renderer, defaultCameraPosition:DEFAULT_THREE_VALUES.DEFAULT_CAMERA_POSITION_LOAD_PAGE});
    }
}, [])
    useEffect(() => {
    // *контроллеры вешаю в отдельном useEffect можно было бы соединить с установлением значений по default*//
        const { loadPageFullScreenController } = createFullScreenController({ canvas, closeLoadPage });
        const resize = () => updateCameraRatio({ camera: camera as Camera, renderer });
        const { addMouseMoveController, removeMouseMoveController } = mouseMoveController(canvas);
        addMouseMoveController();
        window.addEventListener('resize', resize);
        window.addEventListener('click', loadPageFullScreenController);
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('click', loadPageFullScreenController);
            removeMouseMoveController();
        };

 }, [])
useFrame((state, delta) => {
    const { scene: { children: shapes } } = state
    animateMovingShapesAroundAndCameraScaling({ shapes, delta, camera: camera as any })
});
}