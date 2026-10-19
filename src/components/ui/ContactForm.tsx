"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { useActionState, useState } from "react";

import { submitContact } from "@/app/actions/contact";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO, transitions } from "@/lib/animations";
import { CONTACT_PROFILES, initialContactState, type ContactField } from "@/lib/contact";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Campo com label flutuante e sublinhado animado                      */
/* ------------------------------------------------------------------ */

interface FieldProps {
  name: ContactField;
  label: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <m.p
          id={id}
          className="mt-2 text-sm text-signal"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={transitions.fast}
        >
          {error}
        </m.p>
      )}
    </AnimatePresence>
  );
}

function Field({ name, label, type = "text", multiline = false, autoComplete, defaultValue, error }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const controlClass = cn(
    "peer block w-full resize-none border-b bg-transparent pb-3 pt-5 text-lg text-paper outline-none placeholder:text-transparent focus-visible:outline-none",
    error ? "border-signal/70" : "border-paper/20",
  );
  const shared = {
    id,
    name,
    placeholder: " ",
    defaultValue,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: controlClass,
  };

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea rows={3} {...shared} />
        ) : (
          <input type={type} autoComplete={autoComplete} {...shared} />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-0 top-5 origin-left text-lg text-paper/50 transition-all duration-300 ease-out-expo peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-brand-light peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75"
        >
          {label}
        </label>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-expo peer-focus:scale-x-100"
        />
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Formulário                                                          */
/* ------------------------------------------------------------------ */

interface ContactFormInnerProps {
  onReset: () => void;
}

function ContactFormInner({ onReset }: ContactFormInnerProps) {
  const [state, formAction, isPending] = useActionState(submitContact, initialContactState);
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <m.div
          key="success"
          role="status"
          className="flex min-h-[26rem] flex-col items-start justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <m.span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-paper"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          >
            <Check className="h-8 w-8" aria-hidden />
          </m.span>
          <p className="mt-8 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
            Mensagem enviada.
          </p>
          <p className="mt-3 max-w-sm text-paper/60">Obrigado! A equipe do NERD vai entrar em contato em breve.</p>
          <button
            type="button"
            onClick={onReset}
            className="mt-8 text-sm uppercase tracking-[0.2em] text-paper/60 underline-offset-4 transition-colors hover:text-brand-light hover:underline"
          >
            Enviar outra mensagem
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          action={formAction}
          noValidate
          className="flex flex-col gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4 }}
        >
          {/* Honeypot anti-spam (invisível para pessoas) */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Empresa
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Field name="name" label="Nome" autoComplete="name" defaultValue={values.name} error={errors.name} />
            <Field
              name="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              error={errors.email}
            />
          </div>

          <fieldset aria-describedby={errors.profile ? "contact-profile-error" : undefined}>
            <legend className="text-sm text-paper/50">Você é</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CONTACT_PROFILES.map((profile) => (
                <label key={profile} className="cursor-pointer">
                  <input
                    type="radio"
                    name="profile"
                    value={profile}
                    defaultChecked={values.profile === profile}
                    className="peer sr-only"
                  />
                  <span className="block rounded-full border border-paper/25 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-paper peer-checked:border-brand peer-checked:bg-brand peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-light">
                    {profile}
                  </span>
                </label>
              ))}
            </div>
            <FieldError id="contact-profile-error" error={errors.profile} />
          </fieldset>

          <Field name="message" label="Como podemos ajudar?" multiline defaultValue={values.message} error={errors.message} />

          <div className="pt-2">
            <MagneticButton
              type="submit"
              disabled={isPending}
              icon={
                isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                )
              }
            >
              {isPending ? "Enviando…" : "Enviar mensagem"}
            </MagneticButton>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}

/** Formulário de contato minimalista. "Enviar outra" remonta o form para zerar o estado da action. */
export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}
