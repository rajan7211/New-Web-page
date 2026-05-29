import { useNavigate } from "react-router-dom";
import { AlertTriangle, LogOut, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function ImpersonationBanner() {
  const { isImpersonating, currentUser, realUser, stopImpersonating, getDashboardRoute } = useAuth();
  const navigate = useNavigate();

  if (!isImpersonating || !realUser) return null;

  const handleStop = () => {
    stopImpersonating();
    navigate(getDashboardRoute(realUser.role), { replace: true });
  };

  return (
    <div className="sticky top-0 z-[9999] w-full bg-amber-500 text-amber-950 shadow-md" role="alert" aria-live="polite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5">
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-900/20">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span>
              You are impersonating{" "}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-900/15 font-bold">
                <User className="w-3 h-3" aria-hidden="true" />
                {currentUser?.name}
              </span>{" "}
              <span className="font-normal opacity-75">({currentUser?.role})</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs opacity-75 hidden sm:block">
              Logged in as: <strong>{realUser?.name}</strong> ({realUser?.role})
            </span>
            <Button
              size="sm"
              onClick={handleStop}
              className="gap-2 rounded-lg bg-amber-900 text-amber-50 hover:bg-amber-950"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Stop Impersonating
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

