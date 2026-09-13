import React from "react";

export function TechStackSection() {
  const tools = [
    { name: "Python", desc: "3.10, 3.11, 3.12, 3.13" },
    { name: "Django", desc: "4.x, 5.x Frameworks" },
    { name: "Next.js", desc: "React & Node Runtimes" },
    { name: "Node.js", desc: "npm, yarn, pnpm" },
    { name: "Docker", desc: "Compose & Containers" },
    { name: "Git", desc: "Repositories & Branches" }
  ];

  return (
    <section className="py-12 border-y border-[#E8E2D9] bg-[#FAF8F3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#77736C] mb-8">
          Trusted with the tools you already use
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex flex-col items-center justify-center text-center hover:border-[#D8D2C7] transition-all"
            >
              <span className="text-sm font-bold text-[#202124]">{tool.name}</span>
              <span className="text-[10px] text-[#77736C] font-mono mt-0.5">{tool.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
