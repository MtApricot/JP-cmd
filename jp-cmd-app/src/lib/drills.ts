import raw from "../data/jp-cmd-master.json";

export type Move = {
  id: string;
  name: string;
  input: string[];
  desc?: string;
};

export type Combo = {
  id: string;
  title: string;
  sequence: string[];
  diff?: string;
};

export type DrillID =
  | "normal_moves"
  | "unique_attacks"
  | "special_moves"
  | "super_arts"
  | "common_actions"
  | "combos";

export type Drill = {
  id: DrillID;
  label: string;
  moves: Move[];
  combos?: Combo[];
};

type LegacyMove = { id: string; name: string; sequence: string[]; desc?: string };
type LegacyCombo = { id: string; title: string; sequence: string[]; diff?: string };

type MoveRow = { name: string; input: string[]; note?: string };
type MasterMovesV2 = {
  normal_moves?: MoveRow[];
  unique_attacks?: MoveRow[];
  special_moves?: MoveRow[];
  super_arts?: MoveRow[];
  common_actions?: MoveRow[];
};

type MasterData = {
  character: string;
  moves: LegacyMove[] | MasterMovesV2;
  combos?: LegacyCombo[];
};

const master = raw as MasterData;
const combos = master.combos ?? [];

const toMove = (m: MoveRow | LegacyMove, id: string): Move => {
  if ("sequence" in m) {
    return { id: m.id, name: m.name, input: m.sequence, desc: m.desc };
  }
  return { id, name: m.name, input: m.input, desc: m.note };
};

const v2Moves = Array.isArray(master.moves)
  ? null
  : (master.moves as MasterMovesV2);

const buildMoves = (rows: MoveRow[] | undefined, prefix: string) =>
  (rows ?? []).map((m, i) => toMove(m, `${prefix}_${i}`));

const legacyMoves = Array.isArray(master.moves) ? master.moves : [];

export const DRILLS: Drill[] = [
  {
    id: "normal_moves",
    label: "通常技",
    moves: v2Moves ? buildMoves(v2Moves.normal_moves, "normal") : [],
  },
  {
    id: "unique_attacks",
    label: "特殊技",
    moves: v2Moves ? buildMoves(v2Moves.unique_attacks, "unique") : [],
  },
  {
    id: "special_moves",
    label: "必殺技",
    moves: v2Moves ? buildMoves(v2Moves.special_moves, "special") : legacyMoves.map((m) => toMove(m, m.id)),
  },
  {
    id: "super_arts",
    label: "SA",
    moves: v2Moves ? buildMoves(v2Moves.super_arts, "sa") : [],
  },
  {
    id: "common_actions",
    label: "共通アクション",
    moves: v2Moves ? buildMoves(v2Moves.common_actions, "common") : [],
  },
  {
    id: "combos",
    label: "コンボ",
    moves: [],
    combos,
  },
];
