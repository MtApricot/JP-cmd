import raw from "../data/jp-cmd-master.json"
import combosRaw from "../data/jp-combos-master.json";


export type MoveCategory = "normal_moves" | "unique_attacks" | "special_moves" | "super_arts" | "common_actions" | "combos";

export type Move = {
    name: string;
    input: string[];
    startup?: number;
    on_block?: number;
    note?: string;
    duration?: number;

    recipe?: ComboStep[];
    tips?: string;
    status_after?: string;
};

export type Drill = {
    id: DrillID;
    label: string;
    moves: Move[];
    category: MoveCategory;
};

export type DrillID = "normal" | "unique" | "special" | "super" | "common"| "combo"; ;

type MasterData = {
    character: string;
    control_scheme: string;
    moves: Record<MoveCategory, Move[]>;
};

const master: MasterData = raw as MasterData;

type ComboStep = {
    key?: string;
    flow?: string[];
    label?: string;
};

type Combo = {
    id: string;
    title: string;
    recipe: ComboStep[];
    tips?: string;
    status_after?: string;
};

type ComboData = {
  category: string;
  combos: Combo[];
};

const combos = combosRaw as ComboData;
export const DRILLS: Drill[] = [
    { id: "normal", label: "通常技", category: "normal_moves", moves: master.moves.normal_moves },
    { id: "unique", label: "特殊技", category: "unique_attacks", moves: master.moves.unique_attacks },
    { id: "special", label: "必殺技", category: "special_moves", moves: master.moves.special_moves },
    { id: "super", label: "SA", category: "super_arts", moves: master.moves.super_arts },
    { id: "common", label: "共通アクション", category: "common_actions", moves: master.moves.common_actions },
    {
        id: "combo",
        label: "コンボ",
        category: "combos",
        moves: combos.combos.map((c) => ({
            name: c.title,
            input: [], // ここは表示用に使わない（後述でrecipe表示）
            recipe: c.recipe,
            tips: c.tips,
            status_after: c.status_after,
        })),
    },
];