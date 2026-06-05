export function FrameArt({ gradient, large = false }: { gradient: string; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden ${large ? "h-[28rem] rounded-[2.5rem]" : "h-56 rounded-[2rem]"} bg-gradient-to-br ${gradient} product-lens`}>
      <div className={`absolute inset-x-8 flex items-center justify-center ${large ? "top-40 gap-4" : "top-20 gap-3"}`}>
        <span className={`${large ? "h-28 w-40 border-[14px]" : "h-20 w-28 border-[10px]"} rounded-full border-[#11263d] bg-white/30 shadow-inner`} />
        <span className={`${large ? "h-4 w-14" : "h-3 w-10"} rounded-full bg-[#11263d]`} />
        <span className={`${large ? "h-28 w-40 border-[14px]" : "h-20 w-28 border-[10px]"} rounded-full border-[#11263d] bg-white/30 shadow-inner`} />
      </div>
      <div className={`absolute left-1/2 ${large ? "top-[14.5rem] h-3 w-24" : "top-[7.3rem] h-2 w-16"} -translate-x-1/2 rounded-full bg-[#b88a44]`} />
      <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-white/35 blur-xl" />
      <div className="absolute right-5 top-5 rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#11263d]">Mock frame</div>
    </div>
  );
}
