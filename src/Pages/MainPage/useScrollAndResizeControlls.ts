import { useEffect, useState } from "react";
import createScrollController from "../../shapesControllers/shapesControllers/scrollControllers";
import type { ShapeAndOwnPropsInterface } from "../../ShapesAndOwnPropsConstructor/shapesAndOwnPropsConstructor";
export type ShapesAndOwnPropsContainerType = Array<ShapeAndOwnPropsInterface>;

export default function useScrollAndResizeControll() {
	const [shapesAndOwnPropsContainer, setShapesAndOwnPropsContainer] = useState<
		[] | ShapesAndOwnPropsContainerType
	>([]);
	const isShapesCreated = !!shapesAndOwnPropsContainer.length;
	useEffect(() => {
		if (isShapesCreated) {
			const { resize, scroll, toDrawElementsWhenPageWasLoaded } =
				createScrollController(shapesAndOwnPropsContainer);
            toDrawElementsWhenPageWasLoaded();
            const containerWithSections = document.querySelectorAll("section");
            containerWithSections.forEach(setAbsolutePositionToLastChildInParentElement)
			window.addEventListener("resize", resize);
			window.addEventListener("scroll", scroll);
			return () => {
				window.removeEventListener("resize", resize);
				window.removeEventListener("scroll", scroll);
			};
		}
	}, [shapesAndOwnPropsContainer]);
	return setShapesAndOwnPropsContainer;
}

function setAbsolutePositionToLastChildInParentElement(section: HTMLElement) { 
    const lastChild = section.lastElementChild as HTMLElement;
    const isElementCreated = !!lastChild;
    if (isElementCreated) { 
        lastChild.style.position = 'absolute';
        lastChild.style.top = '0';
    }
}
