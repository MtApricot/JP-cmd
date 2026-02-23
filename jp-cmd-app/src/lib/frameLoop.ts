import { useInputStore } from "../store/inputStore";
import { DRILLS } from "../lib/drills";
import { moveToSteps, matchButtons } from "../lib/drillRuntime";
import { buildBufferHistory, isBuffer } from "../lib/judgeDirection";
import { useDrillStore } from "../store/drillStore";
import { useFeedbackStore } from "../store/feedbackStore";
import { useStatsStore } from "../store/statsStore";


export const stateFrameLoop = () => {
    let rafID = 0;
    let neutralFrames = 0;

    const tick = () => {
        const { currentDir, currentButtons, pushHistory, history } = useInputStore.getState();
        pushHistory(currentDir, currentButtons);
        const isNeutral = currentDir === "neutral" && currentButtons.length === 0;
        const { drillType, selectedMoveIndex, stepIndex, nextStep, resetSteps } =
            useDrillStore.getState();
        const { setFeedback } = useFeedbackStore.getState();
        const { updateOnSuccess } = useStatsStore.getState();

        const drill = DRILLS.find((d) => d.id === drillType);
        const move = drill?.moves[selectedMoveIndex];

        if (move) {
            const steps = moveToSteps(move);
            const step = steps[stepIndex];

            if (step) {
                const buffer = buildBufferHistory(history, 5);
                const dirOk = isBuffer(buffer, step.dir, 5);
                const btnOk = matchButtons(currentButtons, step.buttonSpec);

                if (dirOk && btnOk) {
                    nextStep();
                    setFeedback(true, null, "入力OK");

                    if (stepIndex + 1 >= steps.length) {
                        updateOnSuccess(0);
                        resetSteps();
                        setFeedback(true, null, "成功");
                    }
                }
            }
        }

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
