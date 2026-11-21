export interface ContactConfig {
  readonly email: string | null;
  readonly phone: string | null;
  readonly whatsapp: string | null;
  readonly schedulingUrl: string | null;
  readonly status: 'pending' | 'active';
}

/** Canais oficiais não foram fornecidos. Nunca renderizar destinos fictícios. */
export const CONTACT_CONFIG: ContactConfig = {
  email: null,
  phone: null,
  whatsapp: null,
  schedulingUrl: null,
  status: 'pending',
};
