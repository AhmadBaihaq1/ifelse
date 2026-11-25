import { useState } from "react";

interface PropertiTombolPilihan {
  teks: string;
  varian?: "utama" | "lembut";
  nonaktif?: boolean;
  onKlik: () => void;
}

export function TombolPilihan({
  teks,
  varian = "utama",
  nonaktif = false,
  onKlik,
}: PropertiTombolPilihan) {
  const [tertekan, aturTertekan] = useState(false);

  const gayaDasar =
    "group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm sm:text-[15px] font-medium tracking-[0.02em] transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#79665E]";

  const gayaVarian =
    varian === "utama"
      ? "bg-[#F7F4EE]/95 text-[#292824] border border-[#BD9293]/55 shadow-[0_10px_28px_-14px_rgba(121,102,94,0.42)] hover:bg-[#F2DDE0] hover:border-[#BD9293] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgba(189,146,147,0.55)]"
      : "bg-[#FFFEFB]/90 text-[#292824] border border-[#C8B28E]/55 shadow-[0_8px_24px_-14px_rgba(121,102,94,0.28)] hover:bg-[#F7F4EE] hover:border-[#79665E]/55 hover:-translate-y-0.5";

  const tanganiKlik = () => {
    if (nonaktif) return;
    aturTertekan(true);
    window.setTimeout(() => aturTertekan(false), 320);
    onKlik();
  };

  return (
    <button
      type="button"
      disabled={nonaktif}
      onClick={tanganiKlik}
      className={`${gayaDasar} ${gayaVarian} ${
        nonaktif ? "cursor-default opacity-60 pointer-events-none" : "cursor-pointer"
      } ${tertekan ? "scale-[0.97]" : "active:scale-[0.98]"}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFEFB]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="relative z-10">{teks}</span>
    </button>
  );
}
