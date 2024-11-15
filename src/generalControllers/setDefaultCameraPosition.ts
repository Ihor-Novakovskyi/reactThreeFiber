import type { SetCameraRenderingPropsInterface } from './updateCameraRatio';
import updateCameraRatio from './updateCameraRatio';
interface setDefaultCameraPositionInterface extends SetCameraRenderingPropsInterface { 
    defaultCameraPosition: number
} 
export default  function setDefaultCameraPosition(settings: setDefaultCameraPositionInterface) { 
    const { camera , defaultCameraPosition} = settings;
    camera.position.z = defaultCameraPosition;
    updateCameraRatio(settings);
}
