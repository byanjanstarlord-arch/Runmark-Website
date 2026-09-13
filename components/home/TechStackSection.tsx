import React from "react";

export function TechStackSection() {
  const tools = [
    { name: "Python", desc: "3.10, 3.11, 3.12, 3.13", dot: "bg-[#3776AB]" },
    { name: "Django", desc: "4.x, 5.x Frameworks", dot: "bg-[#0C4B33]" },
    { name: "FastAPI", desc: "ASGI • Modern APIs", dot: "bg-[#009688]" },
    { name: "Next.js", desc: "React & Node Runtimes", dot: "bg-[#111111]" },
    { name: "Node.js", desc: "v20, v22 LTS", dot: "bg-[#5FA04E]" },
    { name: "Docker", desc: "Compose & Containers", dot: "bg-[#2496ED]" },
    { name: "PostgreSQL", desc: "v14, v15, v16", dot: "bg-[#4169E1]" },
    { name: "Git", desc: "Repositories & Branches", dot: "bg-[#F05032]" },
    { name: "uv & pip", desc: "Deterministic Locks", dot: "bg-[#FF5A1F]" },
    { name: "Redis", desc: "Key-Value & Cache", dot: "bg-[#DC382D]" }
  ];

  return (
    <section className="py-12 border-y border-[#E8E2D9] bg-[#FAF8F3]/70 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#77736C] flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
          Trusted with the tools you already use
        </p>
      </div>

      {/* Infinite Horizontal Sliding Marquee Track */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left and Right Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent z-10" />

        {/* Continuous Gliding Track (duplicated for seamless loop) */}
        <div className="flex animate-marquee gap-4 items-center">
          {/* First loop instance */}
          {tools.map((tool, idx) => (
            <div
              key={`tool-a-${idx}`}
              className="group px-5 py-3 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3 shrink-0 hover:border-[#FF5A1F]/50 hover:shadow-warm-md hover:scale-[1.03] transition-all duration-200 cursor-pointer select-none"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${tool.dot} shrink-0 ring-2 ring-black/5`} />
              <div className="text-left">
                <div className="text-sm font-bold text-[#202124] group-hover:text-[#FF5A1F] transition-colors leading-tight">
                  {tool.name}
                </div>
                <div className="text-[11px] text-[#77736C] font-mono mt-0.5 whitespace-nowrap">
                  {tool.desc}
                </div>
              </div>
            </div>
          ))}

          {/* Second loop instance for seamless infinite scrolling */}
          {tools.map((tool, idx) => (
            <div
              key={`tool-b-${idx}`}
              className="group px-5 py-3 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-center gap-3 shrink-0 hover:border-[#FF5A1F]/50 hover:shadow-warm-md hover:scale-[1.03] transition-all duration-200 cursor-pointer select-none"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${tool.dot} shrink-0 ring-2 ring-black/5`} />
              <div className="text-left">
                <div className="text-sm font-bold text-[#202124] group-hover:text-[#FF5A1F] transition-colors leading-tight">
                  {tool.name}
                </div>
                <div className="text-[11px] text-[#77736C] font-mono mt-0.5 whitespace-nowrap">
                  {tool.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
