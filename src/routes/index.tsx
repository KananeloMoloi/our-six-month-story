import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import couple1 from "@/assets/couple-1.jpg.asset.json";
import couple2 from "@/assets/couple-2.jpg.asset.json";
import couple3 from "@/assets/couple-3.jpg.asset.json";
import couple4 from "@/assets/couple-4.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_VIDEO = "https://assets.mixkit.co/videos/2408/2408-720.mp4";
const HERO_VIDEO_ALT = "https://assets.mixkit.co/videos/4275/4275-720.mp4";

const LETTER = [
  "Love of my life 🥹  My soulmate 🥹  My babe 🥹  My lover 🥹  My bestfriend 🥹",
  "It's exactly 6 months ago today when I felt the courage to just say what I felt for you 🥹 I thought it was deep feelings and emotions but it was more than that ❤️ it was a real valid connection and a lot more dedication and inspiration ❤️",
  "From the moment I laid eyes on you, you sparked real interest in me 🥹 it was like I saw my exact mirror in you, the female version of me 🥹",
  "And from since that day my life has truly been a wonder 🥹 for I had received a blessing 🥹 an angel in human form ❤️. I've had so much more than I have ever gotten in my entire life with you ❤️ more than just love but completeness ❤️",
  "From all the walks, the talks, the sacrifices, the commitments and love ❤️ it has all been on the highest levels and standards 🥹 you've really set the bar high for me and I'm just glad I never have to choose another person anymore cause though it didn't start with you it definitely ends with you 🥹🥹❤️",
  "I've had people around me but you are just my favorite, fabulous and marvelous person 🥹🥹❤️",
  "I can't explain how much I love you, adore you, appreciate you, respect you and just cherish you 🥹🥹❤️ but it's more than just a lot and biggest ❤️ it's just something beyond explaining ❤️",
  "I love you dearly and so much, Itumeleng Nhlapo 🥹❤️ you have been and will forever be my favorite place to stay 🥹",
];

const PHOTOS = [
  { src: couple1.url, caption: "the peace signs" },
  { src: couple2.url, caption: "silly & ours" },
  { src: couple3.url, caption: "hand in hand" },
  { src: couple4.url, caption: "quiet moments" },
];

// Her birthday. Auto-rolls to next year once past.
function nextBirthday() {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 8, 21, 0, 0, 0); // Sept = month 8
  if (target.getTime() < now.getTime()) target = new Date(year + 1, 8, 21, 0, 0, 0);
  return target;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Index() {
  const target = useMemo(() => nextBirthday(), []);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setRevealed((r) => ({ ...r, [i]: true }));
          }
        });
      },
      { threshold: 0.2 },
    );
    paraRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  function spawnHeart(e: React.MouseEvent) {
    const id = Date.now() + Math.random();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHearts((h) => [
      ...h,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 1400);
  }

  return (
    <main className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-ink)] font-body overflow-x-hidden">
      {/* HERO */}
      <section
        onClick={spawnHeart}
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden cursor-pointer select-none"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          onError={() => {
            if (videoRef.current && videoRef.current.src !== HERO_VIDEO_ALT) {
              videoRef.current.src = HERO_VIDEO_ALT;
            }
          }}
        />
        {/* soft veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.98_0.02_85/0.35)] via-[oklch(0.9_0.05_20/0.35)] to-[oklch(0.15_0.02_30/0.55)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.1_0.02_30/0.35)_100%)]" />

        {/* drifting cloud words */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="animate-breathe font-body uppercase tracking-[0.35em] text-[11px] sm:text-sm text-white/90 mb-6">
              15 · 03 · 2026
            </p>
            <h1 className="font-display italic text-white leading-[0.95] drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)]">
              <span className="block text-6xl sm:text-8xl md:text-9xl animate-drift">
                Six
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl -mt-2 animate-drift [animation-delay:1.5s]">
                Months
              </span>
              <span className="mt-4 block text-lg sm:text-2xl not-italic font-normal tracking-[0.4em] uppercase text-white/85">
                of us
              </span>
            </h1>
            <p className="mt-8 font-display italic text-white/85 text-lg sm:text-2xl animate-floaty">
              for Itumeleng, my favorite place to stay
            </p>
          </div>
        </div>

        {/* floating hearts on click */}
        {hearts.map((h) => (
          <span
            key={h.id}
            className="pointer-events-none absolute text-2xl"
            style={{
              left: h.x,
              top: h.y,
              animation: "heart-pop 1.4s ease-out forwards",
            }}
          >
            ❤️
          </span>
        ))}

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs tracking-[0.3em] uppercase animate-floaty">
          scroll · tap anywhere
        </div>
      </section>

      {/* OPENING QUOTE */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="font-display italic text-2xl sm:text-4xl leading-snug text-[var(--color-ink)] animate-fade-up">
          &ldquo;Though it didn&rsquo;t start with you,{" "}
          <span className="text-[var(--color-rose)]">it definitely ends with you.</span>&rdquo;
        </p>
        <div className="mx-auto mt-8 h-px w-24 bg-[var(--color-rose)]/50" />
      </section>

      {/* LETTER + interleaved photos */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <header className="mb-14 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-rose)] mb-3">
            a letter
          </p>
          <h2 className="font-display text-4xl sm:text-5xl italic">
            everything I&rsquo;ve been meaning to say
          </h2>
        </header>

        <div className="space-y-10">
          {LETTER.map((para, i) => (
            <div key={i}>
              <p
                ref={(el) => {
                  paraRefs.current[i] = el;
                }}
                data-i={i}
                className={`font-display text-xl sm:text-2xl leading-[1.7] transition-all duration-1000 ${
                  revealed[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {para}
              </p>
              {i === 1 && (
                <PhotoCard photo={PHOTOS[0]} rotate="-2deg" />
              )}
              {i === 3 && (
                <PhotoCard photo={PHOTOS[1]} rotate="1.5deg" />
              )}
              {i === 5 && (
                <PhotoCard photo={PHOTOS[2]} rotate="-1deg" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <PhotoCard photo={PHOTOS[3]} rotate="2deg" wide />
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-rose)] mb-3">
            six months of us, in numbers
          </p>
          <h2 className="font-display italic text-4xl sm:text-5xl mb-14">
            every second has counted
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: "6", l: "months" },
              { n: "182.5", l: "days" },
              { n: "4,380", l: "hours" },
              { n: "262,800", l: "minutes" },
              { n: "15,768,000", l: "seconds" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl bg-white/70 backdrop-blur border border-[var(--color-rose)]/15 px-4 py-6 shadow-[0_10px_30px_-20px_oklch(0.4_0.05_20/0.4)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_oklch(0.4_0.05_20/0.5)] transition-all"
              >
                <div className="font-display text-3xl sm:text-4xl italic text-[var(--color-ink)]">
                  {s.n}
                </div>
                <div className="mt-2 uppercase tracking-[0.25em] text-[10px] text-[var(--color-ink)]/60">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 font-display italic text-lg text-[var(--color-ink)]/70">
            …and I&rsquo;d start over and count them all again with you.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-rose)] mb-3">
            us, lately
          </p>
          <h2 className="font-display italic text-4xl sm:text-5xl">
            frames I keep going back to
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {PHOTOS.map((p, i) => (
            <figure
              key={i}
              className="group relative overflow-hidden rounded-xl bg-[var(--color-cream)] aspect-[3/4] shadow-[0_10px_30px_-15px_oklch(0.3_0.05_20/0.4)]"
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 font-display italic text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-ivory)] py-24">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--color-rose)]/20 blur-3xl animate-drift" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-gold)]/15 blur-3xl animate-drift [animation-delay:2s]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-rose-soft)] mb-3">
            counting down to
          </p>
          <h2 className="font-display italic text-4xl sm:text-6xl mb-2">
            your birthday, my love
          </h2>
          <p className="font-body text-sm sm:text-base text-white/60 mb-12">
            21 September · the day the world got its best gift
          </p>

          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {[
              { n: days, l: "days" },
              { n: hours, l: "hours" },
              { n: minutes, l: "minutes" },
              { n: seconds, l: "seconds" },
            ].map((u) => (
              <div
                key={u.l}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur px-2 py-6 sm:px-4 sm:py-8"
              >
                <div className="font-display italic text-4xl sm:text-6xl tabular-nums">
                  {String(u.n).padStart(2, "0")}
                </div>
                <div className="mt-2 uppercase tracking-[0.3em] text-[10px] sm:text-xs text-white/60">
                  {u.l}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-14 font-display italic text-xl sm:text-2xl text-white/85 max-w-2xl mx-auto">
            I love you and will forever love you,{" "}
            <span className="text-[var(--color-rose-soft)]">sthandwa sam</span> ❤️
          </p>
        </div>
      </section>

      <footer className="bg-[var(--color-ink)] text-white/50 text-center py-8 text-xs tracking-[0.3em] uppercase border-t border-white/5">
        made with ❤️ for Itumeleng Nhlapo
      </footer>
    </main>
  );
}

function PhotoCard({
  photo,
  rotate,
  wide,
}: {
  photo: { src: string; caption: string };
  rotate: string;
  wide?: boolean;
}) {
  return (
    <figure
      style={{ transform: `rotate(${rotate})` }}
      className={`my-10 mx-auto ${wide ? "max-w-lg" : "max-w-xs"} bg-white p-3 pb-10 shadow-[0_20px_40px_-20px_oklch(0.3_0.05_20/0.4)] transition-transform hover:rotate-0 hover:scale-[1.02]`}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        loading="lazy"
        className="w-full aspect-[3/4] object-cover"
      />
      <figcaption className="text-center mt-3 font-display italic text-sm text-[var(--color-ink)]/70">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
