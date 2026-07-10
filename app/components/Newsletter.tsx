"use client";

import { useState } from "react";

interface NewsletterProps {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  successMessage: string;
}

export const Newsletter = ({
  title,
  description,
  placeholder,
  buttonText,
  successMessage,
}: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative w-full py-6 md:py-10 overflow-hidden bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.05)] group bg-white"
        >
          {/* 1. Subtle Paper Texture (Light version) */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/linen.png')]" />

          {/* 2. Abstract Aesthetic: Soft Gold Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--gold)]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--gold)]/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* LEFT SIDE: Typography focused on Gold */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)] text-white flex items-center justify-center shadow-lg shadow-[var(--gold)]/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--gold)]">Stay Connected</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif font-black text-[var(--gold)] leading-[1.1] mb-4 tracking-tighter">
                {title}
              </h2>
              
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed max-w-lg font-medium">
                {description}
              </p>

              {/* Tightly packed feature markers */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Weekly Wisdom</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Updates</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Clean Form Card */}
            <div className="lg:col-span-5 p-8 md:p-12 bg-slate-50 flex flex-col justify-center">
              {status === "success" ? (
                <div className="flex flex-col items-center animate-in zoom-in-95 duration-500 text-center">
                  <div className="w-16 h-16 bg-[var(--gold)] rounded-full flex items-center justify-center shadow-xl mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[var(--gold)] font-black text-2xl tracking-tight leading-tight">
                    {successMessage}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest">Check your inbox</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--gold)]/60 ml-1">
                      Email Address
                    </label>
                    <div className="relative group/input">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-5 py-4 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-300 outline-none transition-all focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold)]/5 shadow-sm"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within/input:text-[var(--gold)] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-300 relative overflow-hidden group/btn shadow-lg hover:shadow-[var(--gold)]/20 active:scale-[0.98]"
                    style={{ background: "var(--gold)", color: "#ffffff" }}
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        {buttonText}
                        <svg className="w-4 h-4 translate-x-0 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2 text-slate-300">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Secure Private Subscription</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* 3. Gold Accent Bar (Bottom) */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>
      </div>
    </section>
  );
};