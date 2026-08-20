import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";

/**
 * Discreet Parents entry point. The real PIN/math gate and settings panel
 * arrive in Phase 4 — this establishes the navigation target only.
 */
export function ParentsGateScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-navy px-6 text-center text-cream">
      <span className="text-6xl" aria-hidden="true">
        🔒
      </span>
      <div>
        <h1 className="font-display text-3xl font-extrabold">Parents Area</h1>
        <p className="mt-2 max-w-sm text-cream/70">
          Settings, progress tracking, and a parent gate are coming in a
          future update.
        </p>
      </div>
      <Button variant="soft" onClick={() => navigate("/home")}>
        Back to Home
      </Button>
    </div>
  );
}
