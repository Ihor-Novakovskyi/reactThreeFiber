export const isMobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
export enum DEFAULT_THREE_VALUES  {
    DEFAULT_CAMERA_POSITION_MAIN_PAGE = isMobile ? 7 : 5,
    DEFAULT_CAMERA_POSITION_LOAD_PAGE = isMobile ? 14 : 8,
    MAX_SCALE_SHAPE = 2.5,
    DEFAULT_SCALE = 0
 }