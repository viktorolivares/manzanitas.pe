export const APP_NAME: string =
  (import.meta.env.VITE_APP_NAME as string | undefined)?.trim() || 'my.app';

export const COMPANY_NAME: string =
  (import.meta.env.VITE_COMPANY_NAME as string | undefined)?.trim() || 'my.app';

