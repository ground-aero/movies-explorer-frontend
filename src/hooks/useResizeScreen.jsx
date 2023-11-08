// хук для прослушивания ширины экрана - useResize
import { useState, useEffect } from 'react';

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

// const-breakpoints.js
    const SCREEN_SM = 540;
    const SCREEN_MD = 768;
    // const SCREEN_LG = 992;
    const SCREEN_XL = 1280;
    const SCREEN_XXL = 1400;

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width,
        isScreenSm: width >= SCREEN_SM,
        isScreenMd: width >= SCREEN_MD,
        // isScreenLg: width >= SCREEN_LG,
        isScreenXl: width >= SCREEN_XL,
        isScreenXxl: width >= SCREEN_XXL,
    };
};
