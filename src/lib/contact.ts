/** Tipos e estado inicial do formulário de contato (compartilhados entre client e server action). */

export const CONTACT_PROFILES = ["Empresa", "Startup", "Outro"] as const;
export type ContactProfile = (typeof CONTACT_PROFILES)[number];

export type ContactField = "name" | "email" | "profile" | "message";

export interface ContactState {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<ContactField, string>>;
  /** Valores enviados, para repovoar o formulário em caso de erro. */
  values?: Partial<Record<ContactField, string>>;
}

export const initialContactState: ContactState = { status: "idle" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  values: Record<ContactField, string>,
): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};
  if (values.name.length < 2) errors.name = "Conte pra gente seu nome.";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Informe um e-mail válido.";
  if (!CONTACT_PROFILES.includes(values.profile as ContactProfile)) errors.profile = "Escolha um perfil.";
  if (values.message.length < 10) errors.message = "Escreva um pouco mais (mín. 10 caracteres).";
  return errors;
}
