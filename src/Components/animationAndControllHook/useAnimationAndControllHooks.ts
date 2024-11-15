import { useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import ShapesAndOWnPropsContsructor from "../../ShapesAndOwnPropsConstructor/shapesAndOwnPropsConstructor";
import { DEFAULT_THREE_VALUES } from "../../enum/defaultValues";
import setDefaultCameraPosition from "../../generalControllers/setDefaultCameraPosition";
import { fullScreenControllerProps } from "../../shapesControllers/shapesControllers/fullScreenControllers";
import animate from "../../shapesControllers/shapesControllAnimation.ts/shapesControlAnimation";
import type { ShapeAndOwnPropsInterface } from "../../ShapesAndOwnPropsConstructor/shapesAndOwnPropsConstructor";
import type { ShapesAndOwnPropsContainerType } from "../../Pages/MainPage/useScrollAndResizeControlls";
import type { Camera } from "../../Aliases/aliases";
type SetShapesAndOwnPropsContainerType<T> = (arg: ((value:T) => T) | T ) => void;
export default function useAnimationAndControllHook(setShapesAndOwnPropsContainer: SetShapesAndOwnPropsContainerType<ShapesAndOwnPropsContainerType>) { 
    const state = useThree();
	const {
		scene: {
			children: [shape],
		},
	} = state;
	let [shapeAndOwnProps, setShapeAndOwnProps] =
		useState<ShapeAndOwnPropsInterface | null>(null);
	useEffect(() => {
		const {
			scene: {
				children: [shape],
			},
			camera,
			gl: renderer,
		} = state;
        const { domElement: canvas } = renderer;
        // canvas.classList.add('canvas');
		if (shape) {
			const shapeAndProps: ShapeAndOwnPropsInterface =
				new ShapesAndOWnPropsContsructor({
					canvas,
					camera: camera as Camera,
					renderer,
					shape,
                });
            shapeAndOwnProps = shapeAndProps;//делаем для того чтобы анимация взяла текущий объект из замыкания
            setShapesAndOwnPropsContainer((shapesAndOwnPropsContainer) => {
                const newContainer = [...shapesAndOwnPropsContainer];
                newContainer.push(shapeAndProps);
                return newContainer as Array<ShapeAndOwnPropsInterface>;
            });
			setShapeAndOwnProps(shapeAndOwnProps);
			setDefaultCameraPosition({
				camera: camera as Camera,
				renderer,
				defaultCameraPosition:
					DEFAULT_THREE_VALUES.DEFAULT_CAMERA_POSITION_MAIN_PAGE,
            });
            const {
                touchstart,
                mousemove,
                dblclick,
            } = fullScreenControllerProps(shapeAndOwnProps as ShapeAndOwnPropsInterface)  
            touchstart ? canvas.addEventListener('touchstart', touchstart) : void 0;
            mousemove ? canvas.addEventListener('mousemove', mousemove as () => void) : void 0;
            dblclick ? canvas.addEventListener('dblclick', dblclick as () => void) : void 0;
            return () => { 
                touchstart ? canvas.removeEventListener('touchstart', touchstart) : void 0;
                mousemove ? canvas.removeEventListener('mousemove', mousemove as () => void) : void 0;
                dblclick ? canvas.removeEventListener('dblclick', dblclick as () => void) : void 0;
            }
        }
	}, []);
	// we call mesh - the shape in all our program
    useFrame((_, delta) => {
        if (shapeAndOwnProps) { 
            animate(delta, shapeAndOwnProps)
        }
    })
}