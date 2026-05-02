"use client";

import { memo, useCallback } from "react";
import { useTranslations } from "next-intl";

import type { FortuneRequest } from "@/lib/bazi/types";
import { Button, Input, SectionLabel, Select, InfoCallout } from "@/components/atoms";
import { GenderToggleGroup, CalendarTypeToggle } from "@/components/molecules";

interface LapLaSoFormProps {
  form: FortuneRequest;
  isPending: boolean;
  onFieldChange: <K extends keyof FortuneRequest>(field: K, value: FortuneRequest[K]) => void;
  onSubmit: () => void;
}

const LapLaSoForm = memo(function LapLaSoForm({ form, isPending, onFieldChange, onSubmit }: LapLaSoFormProps) {
  const t = useTranslations("laplaso.form");

  const timezones = [
    { label: t("timezoneLabels.hanoi"), value: "+07:00" },
    { label: t("timezoneLabels.saigon"), value: "+07:00" },
    { label: t("timezoneLabels.beijing"), value: "+08:00" },
    { label: t("timezoneLabels.california"), value: "-08:00" },
    { label: t("timezoneLabels.paris"), value: "+01:00" },
  ];

  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("fullName", event.target.value);
  }, [onFieldChange]);

  const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("birthDate", event.target.value);
  }, [onFieldChange]);

  const handleTimeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("birthTime", event.target.value);
  }, [onFieldChange]);

  const handleTimezoneChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onFieldChange("timezone", event.target.value);
  }, [onFieldChange]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  }, [onSubmit]);

  return (
    <section className="flex flex-col gap-8 lg:col-span-5 lg:gap-10">
      <header className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
        <p className="text-[0.6875rem] font-black uppercase tracking-[0.35em] text-primary">
          {t("kicker")}
        </p>
        <h1
          className="font-black tracking-tighter text-on-surface"
          style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: "0.95" }}
        >
          {t("title")}
          <br />
          <span className="text-primary">{t("highlight")}</span>
        </h1>
        <p className="mx-auto max-w-xl text-sm md:text-base font-medium leading-relaxed text-on-surface-variant">
          {t("description")}
        </p>
      </header>

      <form className="ui-shell mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-3xl p-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <SectionLabel>{t("fullName")}</SectionLabel>
          <Input
            type="text"
            value={form.fullName}
            onChange={handleNameChange}
            placeholder={t("fullNamePlaceholder")}
            className="ui-input rounded-2xl px-6 py-4 text-lg font-semibold"
          />
        </div>

        <div className="flex flex-col gap-3">
          <SectionLabel>{t("gender")}</SectionLabel>
          <GenderToggleGroup
            value={form.gender}
            onChange={(value) => onFieldChange("gender", value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <SectionLabel>{t("datetime")}</SectionLabel>
            <CalendarTypeToggle
              value={form.calendarType}
              onChange={(value) => onFieldChange("calendarType", value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={form.birthDate}
              onChange={handleDateChange}
              className="ui-input rounded-2xl px-6 py-4 font-bold"
            />
            <Input
              type="time"
              value={form.birthTime}
              onChange={handleTimeChange}
              className="ui-input rounded-2xl px-6 py-4 font-bold"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SectionLabel>{t("timezone")}</SectionLabel>
          <Select
            value={form.timezone}
            onChange={handleTimezoneChange}
            className="text-lg"
          >
            {timezones.map((timezone) => (
              <option key={timezone.label} value={timezone.value}>
                {timezone.label}
              </option>
            ))}
          </Select>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="mt-4 w-full rounded-2xl py-6 text-base font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? t("submitting") : t("submit")}
        </Button>
      </form>

      <div className="mx-auto max-w-2xl">
        <InfoCallout
          title={t("importantTitle")}
          description={t("importantDescription")}
        />
      </div>
    </section>
  );
});

LapLaSoForm.displayName = "LapLaSoForm";

export default LapLaSoForm;
