"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { submitDraft } from "@/lib/questionnaire/actions";
import { clearDraft, loadDraft } from "@/lib/questionnaire/draft-storage";

export function CompleteDraft() {
  const t = useTranslations("Questionnaire.complete");
  const router = useRouter();
  const started = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Guards against the effect running twice (React strict mode), which would create the business twice.
    if (started.current) return;
    started.current = true;

    const stored = loadDraft();
    if (!stored) {
      router.replace("/dashboard");
      return;
    }

    submitDraft(stored.draft)
      .then((result) => {
        if (!result.ok) return setFailed(true);
        clearDraft();
        router.replace("/dashboard");
      })
      .catch(() => setFailed(true));
  }, [router]);

  if (failed) {
    return (
      <div className="space-y-2">
        <p>{t("failed")}</p>
        <Link href="/start" className="underline">
          {t("backToQuestionnaire")}
        </Link>
      </div>
    );
  }

  return <p>{t("saving")}</p>;
}
