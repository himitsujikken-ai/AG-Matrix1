export type GridResult = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    keywords: string[];
};

export const GRID_RESULTS: Record<number, GridResult> = {
    1: {
        id: 1,
        title: "乾 (KEN)",
        subtitle: "The Creative Heaven",
        description: "純粋な創造エネルギー。強力な推進力で運命を切り拓く時。迷わず進め。",
        keywords: ["Creation", "Strength", "Leadership"],
    },
    2: {
        id: 2,
        title: "坤 (KON)",
        subtitle: "The Receptive Earth",
        description: "受容と育成。大地のような広さで全てを受け入れる時。耐え忍び、育め。",
        keywords: ["Receptivity", "Support", "Nature"],
    },
    63: {
        id: 63,
        title: "既済 (KISEI)",
        subtitle: "After Completion",
        description: "完成の時。全てが整った状態だが、それは崩壊の始まりでもある。慢心を戒めよ。",
        keywords: ["Completion", "Caution", "Cycle"],
    },
    64: {
        id: 64,
        title: "未済 (BISEI)",
        subtitle: "Before Completion",
        description: "未完成。無限の可能性。終わりは始まりであり、混沌こそが創造の源泉となる。",
        keywords: ["Potential", "Chaos", "Renewal"],
    },
};

export const getResult = (id: number): GridResult => {
    return GRID_RESULTS[id] || {
        id,
        title: `Hexagram ${id}`,
        subtitle: "Unknown Vector",
        description: "未知の領域。あなたの座標はまだ確定していない。自らの意志で意味を定義せよ。",
        keywords: ["Unknown", "Mystery", "Void"],
    };
};
