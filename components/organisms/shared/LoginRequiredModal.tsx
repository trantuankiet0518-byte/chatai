"use client";

import { UserCircle2 } from "@/components/icons";
import { Link } from "@/i18n/navigation";
import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";

type LoginRequiredModalProps = {
  pendingHref?: string | null;
  loginHref?: string;
  onClose?: () => void;
  onLogin?: () => void;
};

export default function LoginRequiredModal({
  pendingHref,
  loginHref = "/login",
  onClose,
  onLogin,
}: LoginRequiredModalProps) {
  const t = useTranslations("shared");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label={t("closeLoginPrompt")}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-outline-variant/25 bg-background/90 p-6 text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-outline-variant/25 bg-surface-container-low text-primary">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold">{t("loginRequiredTitle")}</div>
            <div className="text-sm text-on-surface-variant">
              {pendingHref
                ? `${pendingHref} ${t("loginRequiredDescription")}`
                : t("loginRequiredDescription")}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-on-surface-variant">
          {t("loginRequiredBody")}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-full border border-outline-variant/25 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/4"
            onClick={onClose}
          >
            {t("later")}
          </button>
          <Link
            href={loginHref}
            onClick={onLogin}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/90 px-5 py-2.5 text-sm font-semibold text-on-primary transition-transform hover:scale-[1.01]"
          >
            <UserCircle2 className="h-4 w-4" />
            {t("loginNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}
