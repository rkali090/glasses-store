type FrameArtProps = {
  gradient: string;
  large?: boolean;
  compact?: boolean;
};

export function FrameArt({ gradient, large = false, compact = false }: FrameArtProps) {
  const height = large ? "h-[28rem] rounded-[2.5rem]" : compact ? "h-32 rounded-[1.35rem]" : "h-56 rounded-[2rem]";
  const lens = large ? "h-28 w-40 border-[14px]" : compact ? "h-12 w-16 border-[7px]" : "h-20 w-28 border-[10px]";
  const bridge = large ? "h-4 w-14" : compact ? "h-1.5 w-7" : "h-3 w-10";
  const frameTop = large ? "top-40 gap-4" : compact ? "top-12 gap-2" : "top-20 gap-3";
  const bridgeTop = large ? "top-[14.5rem] h-3 w-24" : compact ? "top-[4.5rem] h-1.5 w-10" : "top-[7.3rem] h-2 w-16";

  return (
    <div className={`relative overflow-hidden ${height} bg-gradient-to-br ${gradient} product-lens`}>
      <div className={`absolute inset-x-5 flex items-center justify-center ${frameTop}`}>
        <span className={`${lens} rounded-full border-[#11263d] bg-white/30 shadow-inner`} />
        <span className={`${bridge} rounded-full bg-[#11263d]`} />
        <span className={`${lens} rounded-full border-[#11263d] bg-white/30 shadow-inner`} />
      </div>
      <div className={`absolute left-1/2 ${bridgeTop} -translate-x-1/2 rounded-full bg-[#b88a44]`} />
      <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-white/35 blur-xl" />
      <div className={`absolute ${compact ? "right-3 top-3" : "right-5 top-5"} rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#11263d]`}>Mock frame</div>
    </div>
  );
}
