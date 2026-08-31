import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { WorldCard, StatBadge } from "../components/ui";
import { WORLDS, WORLD_ITEMS } from "../data/worlds";
import { useProgress, getGlobalProgress, getWorldProgress } from "../state/progress";

export function HomeScreen() {
  const progress = useProgress();
  const { totalStars, worldsCompleted } = getGlobalProgress(progress, WORLD_ITEMS);

  return (
    <div className="min-h-dvh bg-cream pb-12">
      <PageShell className="safe-top pt-6 sm:pt-10">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-lg font-bold text-purple sm:text-xl">
              Hi there! 👋
            </p>
            <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              What do you want to learn today?
            </h1>
          </div>
          <Link
            to="/parents"
            className="mt-1 shrink-0 text-2xl text-navy/30 transition-colors hover:text-navy/60"
            aria-label="Parents area"
            title="For Parents"
          >
            ⚙️
          </Link>
        </header>

        <div className="mt-5 flex flex-wrap gap-3">
          <StatBadge icon="⭐" label="Stars earned" value={totalStars} />
          <StatBadge icon="🏅" label="Worlds completed" value={worldsCompleted} />
        </div>

        <section className="mt-8" aria-label="Learning worlds">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
            {WORLDS.map((world) => {
              const worldProgress = getWorldProgress(progress, world.id, WORLD_ITEMS[world.id]);
              return (
                <WorldCard
                  key={world.id}
                  world={world}
                  starsEarned={worldProgress.starsEarned}
                  starsTotal={worldProgress.starsTotal}
                  isComplete={worldProgress.isWorldComplete}
                />
              );
            })}
          </div>
        </section>
      </PageShell>
    </div>
  );
}
