"use client";
import { useState } from "react";
import Image from "next/image";

type Member = { name: string; role: string };
type Community = {
  id: string;
  name: string;
  location: string;
  region: string;
  description: string;
  works: string[];
  image?: string;
  members?: Member[];
  memberSummary?: string;
};

type Props = {
  communities: Community[];
  labels: {
    all: string;
    rwanda: string;
    drc: string;
    belgium: string;
    mission: string;
    members: string;
    works: string;
    viewDetails: string;
    hideDetails: string;
  };
};

const REGIONS = ["all", "rwanda", "drc", "belgium", "mission"] as const;

export default function CommunitiesFilter({ communities, labels }: Props) {
  const [active, setActive] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    active === "all" ? communities : communities.filter((c) => c.region === active);

  const counts: Record<string, number> = { all: communities.length };
  for (const r of ["rwanda", "drc", "belgium", "mission"]) {
    counts[r] = communities.filter((c) => c.region === r).length;
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => { setActive(r); setExpanded(null); }}
            className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200"
            style={
              active === r
                ? { background: "var(--red)", color: "#ffffff", boxShadow: "0 4px 14px rgba(92,51,23,0.3)" }
                : { background: "var(--cream2)", color: "var(--mid)", border: "1px solid #e5e0d8" }
            }
          >
            {labels[r as keyof typeof labels]}
            <span
              className="text-[11px] font-black px-1.5 py-0.5 rounded-full"
              style={
                active === r
                  ? { background: "rgba(255,255,255,0.2)", color: "#ffffff" }
                  : { background: "var(--red)", color: "#ffffff" }
              }
            >
              {counts[r]}
            </span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filtered.map((community, index) => {
          const isOpen = expanded === community.id;
          return (
            <div
              key={community.id}
              className="card flex flex-col"
              style={{ gridColumn: isOpen ? "1 / -1" : undefined }}
            >
              {/* Top accent */}
              <div className="h-1" style={{ background: "var(--red)" }} />

              {/* Image if available */}
              {community.image && (
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={community.image}
                    alt={community.name}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,25,23,0.6) 0%, transparent 60%)" }} />
                  <span
                    className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                    style={{ background: "var(--gold)", color: "var(--dark)" }}
                  >
                    {labels[community.region as keyof typeof labels]}
                  </span>
                </div>
              )}

              <div className="p-4 sm:p-6 flex flex-col flex-1">
                {/* Number badge (no image) */}
                {!community.image && (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold mb-4"
                    style={{ background: "var(--red)", color: "#ffffff", fontFamily: "Georgia, serif" }}
                  >
                    {index + 1}
                  </div>
                )}

                <h3
                  className="text-lg font-bold mb-1.5 leading-snug"
                  style={{ fontFamily: "Georgia, serif", color: "var(--red)" }}
                >
                  {community.name}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--gold)" }}>
                  📍 {community.location}
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--mid)" }}>
                  {community.description}
                </p>

                {/* Works tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {community.works.map((w, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 rounded-full font-medium"
                      style={{ background: "var(--cream2)", color: "var(--red-lt)", border: "1px solid var(--cream3)" }}
                    >
                      {w}
                    </span>
                  ))}
                </div>

                {/* Expand button */}
                {community.members && community.members.length > 0 && (
                  <button
                    onClick={() => setExpanded(isOpen ? null : community.id)}
                    className="mt-auto self-start read-more flex items-center gap-1.5"
                  >
                    {isOpen ? labels.hideDetails : labels.viewDetails}
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>▾</span>
                  </button>
                )}
              </div>

              {/* Expanded members panel */}
              {isOpen && community.members && (
                <div
                  className="border-t px-6 py-6"
                  style={{ borderColor: "#e8e2d9", background: "var(--cream2)" }}
                >
                  {community.memberSummary && (
                    <p className="text-base leading-relaxed mb-6 max-w-3xl" style={{ color: "var(--mid)" }}>
                      {community.memberSummary}
                    </p>
                  )}
                  <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--gold)" }}>
                    {labels.members}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {community.members.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: "#ffffff", border: "1px solid var(--cream3)" }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                          style={{ background: "var(--red)", color: "#ffffff" }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-base font-bold leading-tight" style={{ color: "var(--dark)" }}>{m.name}</p>
                          <p className="text-sm mt-0.5 leading-snug" style={{ color: "var(--gold)" }}>{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
