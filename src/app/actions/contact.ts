"use server";

import { validateContact, type ContactField, type ContactState } from "@/lib/contact";

const FIELDS: readonly ContactField[] = ["name", "email", "profile", "message"];

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots preenchem o campo invisível; fingimos sucesso e descartamos.
  if (String(formData.get("company") ?? "").length > 0) return { status: "success" };

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  ) as Record<ContactField, string>;

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  // TODO: integrar o envio (e-mail transacional, CRM ou planilha) com as credenciais do NERD.
  return { status: "success" };
}
