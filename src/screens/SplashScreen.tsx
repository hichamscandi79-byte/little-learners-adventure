import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AUTO_ADVANCE_MS = 2000;

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate("/home", { replace: true }), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <button
      type="button"
      onClick={() => navigate("/home", { replace: true })}
      aria-label="Continue to Little Learners Adventure"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-8 overflow-hidden bg-linear-to-b from-sky via-purple to-coral px-6 text-center"
    >
      <div className="absolute -left-10 top-16 text-6xl opacity-30 sm:text-8xl" aria-hidden="true">
        ⭐
      </div>
      <div className="absolute -right-6 bottom-24 text-6xl opacity-30 sm:text-8xl" aria-hidden="true">
        🌈
      </div>
      <div className="absolute right-10 top-24 text-5xl opacity-20 sm:text-7xl" aria-hidden="true">
        ☁️
      </div>

      <span
        className="flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-white text-6xl shadow-soft sm:h-36 sm:w-36 sm:text-7xl"
        aria-hidden="true"
      >
        🎈
      </span>

      <div>
        <h1 className="font-display text-4xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-6xl">
          Little Learners
          <br />
          Adventure
        </h1>
        <p className="font-display mt-4 text-lg font-bold tracking-wide text-white/90 sm:text-2xl">
          Listen • Touch • Trace • Play • Learn
        </p>
      </div>

      <span className="font-display text-base font-bold text-white/80 sm:text-lg">
        Tap to begin
      </span>
    </button>
  );
}
