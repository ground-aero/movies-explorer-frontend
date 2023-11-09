// хук для прослушивания ширины экрана - useResize
import { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";

export const useResize = () => {
    const location = useLocation();
    const [isWidth, setIsWidth] = useState(window.innerWidth);

    let initCount = null;
    let step = null;

    useEffect(() => {
        const handleResize = (event) => {
            setIsWidth(event.target.innerWidth)
        }
        console.log(isWidth)

        window.addEventListener('resize', handleResize)
        return (() => window.removeEventListener('resize', handleResize))
    },[])

    // // const-breakpoints.js
        const SCREEN_SM = 540;
        const SCREEN_MD = 768;
        // const SCREEN_LG = 992;
        const SCREEN_XL = 1280;
        const SCREEN_XXL = 1400;

    if (location.pathname === '/saved-movies') {
        // initCount = cards.length
    } else {
        if (isWidth >= 1280) {
            initCount = 12;
            step = 4;
        } else if (isWidth <= 1279 && isWidth >= 480) {
            initCount = 8;
            step = 2;
        } else if (isWidth >= 320 && isWidth < 480) {
            initCount = 5;
            step = 2;
        }
    }

    const [isShowCards, setIsShowCards] = useState([]);
    const [isAddCount, setIsAddCount] = useState(initCount);

    return {
        isWidth,
        isScreenSm: isWidth >= SCREEN_SM,
        isScreenMd: isWidth >= SCREEN_MD,
        // isScreenLg: width >= SCREEN_LG,
        isScreenXl: isWidth >= SCREEN_XL,
        isScreenXxl: isWidth >= SCREEN_XXL,
    };
};
