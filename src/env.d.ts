/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	RESEND_API_KEY: string;
	RESEND_USER_EMAIL: string;
	BANK_ACCOUNT: string;
	PUBLIC_GALLERY: boolean;
}
