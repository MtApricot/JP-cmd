import { useInputStore } from "../store/inputStore";

export const stateFrameLoop = () => {
    let rafID = 0;

    const tick = () => {
        const { currentDir, currentButtons, pushHistory } = useInputStore.getState();
        pushHistory(currentDir, currentButtons);
        rafID = requestAnimationFrame(tick);
    };

    rafID = requestAnimationFrame(tick);
    
    return () => {
        cancelAnimationFrame(rafID);
    };
};