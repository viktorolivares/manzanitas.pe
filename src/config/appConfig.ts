export const COMPANY_NAME: string =
  (import.meta.env.VITE_COMPANY_NAME as string | undefined)?.trim() || 'codevo.pe';
