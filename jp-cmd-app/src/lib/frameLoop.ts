import { useInputStore } from "../store/inputStore";

export const stateFrameLoop = () => {
    let rafID = 0;
    let neutralFrames = 0;

    const tick = () => {
        const { currentDir, currentButtons, pushHistory } = useInputStore.getState();
        pushHistory(currentDir, currentButtons);
        const isNeutral = currentDir === "neutral" && currentButtons.length === 0;
        if (isNeutral) {
            neutralFrames += 1;
        } else {
            neutralFrames = 0;
        }
        if (neutralFrames > 120) {
            useInputStore.getState().archiveHistory();
            neutralFrames = 0;
        }
        rafID = requestAnimationFrame(tick);
    };

    rafID = requestAnimationFrame(tick);
    
    return () => {
        cancelAnimationFrame(rafID);
    };
};