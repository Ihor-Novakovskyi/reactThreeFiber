import * as THREE from "three";
import { Camera } from "../../Aliases/aliases";
import { DEFAULT_THREE_VALUES } from "../../enum/defaultValues";

const statePositionShapeElements = [
    { startAngle: Math.round(120 / 57.3) },
    { startAngle: Math.round(240 / 57.3) },
    { startAngle: Math.round(360 / 57.3) },
];
const isLoadPageInFullScreen = false;
export const defaultCameraPosition = DEFAULT_THREE_VALUES.DEFAULT_CAMERA_POSITION_LOAD_PAGE;
const minCameraPosition = 3;
let isMovingToCenter = true;
const maxRadiusDistance = 5;
const minRadiusDistance = 1;
let movingRadiusDistance = maxRadiusDistance;
const stepToCenterMove = 0.01;
const stepToLeaveCenterMove = 0.05;
let stepCameraScaling = 0;
let stepCameraUnScaling = 0;

function normoliseStepsConsideringScreenUpdateFrequency(delta: number) { 
        const countedStepToCenterMove = (stepToCenterMove * delta) * 100;
        const countedStepToLeaveCenterMove = (stepToLeaveCenterMove * delta) * 100;
        const quantityStepsToMoveToCenterByStepToCenterMove = (maxRadiusDistance - minRadiusDistance) / countedStepToCenterMove;
        const quantityStepsToLeaveCenterBystepToLeaveCenterMove = (maxRadiusDistance - minRadiusDistance) / countedStepToLeaveCenterMove;
        stepCameraScaling = (defaultCameraPosition - minCameraPosition) / quantityStepsToMoveToCenterByStepToCenterMove;
        stepCameraUnScaling = (defaultCameraPosition - minCameraPosition) / quantityStepsToLeaveCenterBystepToLeaveCenterMove;
    return {
        countedStepToCenterMove,
        countedStepToLeaveCenterMove,
        stepCameraScaling,
        stepCameraUnScaling,
    }
}

//создать функцию которая будет менять координаты в объекте statePositionShapeElements
// она должна учитывать таймер
function setStatePositionShapeElements(delta: number) {
    statePositionShapeElements.forEach(position => position.startAngle += delta);
 }
function setShapePosition(shape:any, id: number) { 
    shape.position.x = movingRadiusDistance * Math.cos(statePositionShapeElements[id].startAngle);
    shape.position.y = movingRadiusDistance * Math.sin(statePositionShapeElements[id].startAngle);
    shape.rotation.x += 0.01;
    shape.rotation.z += 0.01;
    // shape.position.z = 0 //дефолтное поожение элементов по оси z

}
// для того чтоб на разных частотах обновлений эккранов выглядело одинаково

function setDirectionCenterMoving() { 
    // это основное условие относительно которого мы рассчитываем количество шагов и зависимость увеличения камеры
    if (movingRadiusDistance >= maxRadiusDistance) {
        isMovingToCenter = true;
    } else if (minRadiusDistance >= movingRadiusDistance) { 
        isMovingToCenter = false;
    }
}
function setMovingRadiusDistance({
    countedStepToCenterMove,
    countedStepToLeaveCenterMove
}: {
    countedStepToCenterMove: number,
    countedStepToLeaveCenterMove: number,
}) { 
    switch (isMovingToCenter) { 
        case true:
            movingRadiusDistance -= countedStepToCenterMove;
            return;
        case false:
            movingRadiusDistance += countedStepToLeaveCenterMove;

    }
}

function setCameraScaling({
    isCameraScaling,
    camera,
    stepCameraScaling,
    stepCameraUnScaling
}:{
    isCameraScaling: boolean,
    camera: Camera,
    stepCameraScaling: number,
    stepCameraUnScaling: number
}) { 
    switch (isCameraScaling) { 
        case true:
            camera.position.z -= stepCameraScaling;
            return;
        case false:
            camera.position.z += stepCameraUnScaling;

    }
}
export function createFullScreenController({
    canvas,
    closeLoadPage
}: {
        canvas: HTMLElement,
        closeLoadPage: () => void,
}) {
    let userCanCloseLoadPageAfterDelay = false;
    setTimeout(delayBeforeUserCanCloseLoadingPage, 4000);

    function loadPageFullScreenController() {
        userCanCloseLoadPageAfterDelay
            ? closeLoadPageAndExitFullScreen()
            : openLoadPageInFullScreen();
    }
    function closeLoadPageAndExitFullScreen() {
        closeFullScreenMode();
        closeLoadPage();
        document.body.style.overflow = "";
    }
    function closeFullScreenMode() {
        const isElementInFullScreen = document.fullscreenElement !== null;
        isElementInFullScreen ? document.exitFullscreen() : void 0;
    }
    function openLoadPageInFullScreen() {
        document.body.style.overflow = "hidden";
        const isNotOpenInFullScreen = !document.fullscreenElement;
        isNotOpenInFullScreen
            ? canvas.requestFullscreen()//open full screen
            : void 0;
    }
    function delayBeforeUserCanCloseLoadingPage() {
		userCanCloseLoadPageAfterDelay = true;
    }
    
    return {
        loadPageFullScreenController
    };
    
}
export function mouseMoveController(canvas: HTMLElement) { 
    const mouseMoveListener = () => isMovingToCenter = false;
    return {
        addMouseMoveController: () => canvas.addEventListener('mousemove', mouseMoveListener),
        removeMouseMoveController: () => canvas.removeEventListener('mousemove', mouseMoveListener)
     }
}
export function setDefaultShapesPosition({ shapes }: { shapes: Array<any> }) { 
    shapes.forEach(setShapePosition);
}

export  function animateMovingShapesAroundAndCameraScaling({shapes, delta, camera}:{shapes:Array<any>, delta: number, camera: Camera}) { 
    const {
        countedStepToCenterMove,
        countedStepToLeaveCenterMove,
        stepCameraScaling,
        stepCameraUnScaling,
    }  = normoliseStepsConsideringScreenUpdateFrequency(delta) ;
    setDirectionCenterMoving();
    setMovingRadiusDistance({countedStepToCenterMove, countedStepToLeaveCenterMove});
    setCameraScaling({ camera, isCameraScaling: isMovingToCenter, stepCameraScaling, stepCameraUnScaling });
    setStatePositionShapeElements(delta);// обовление координта на delta
    shapes.forEach(setShapePosition);//изменение значений координат сетки элемента
}

