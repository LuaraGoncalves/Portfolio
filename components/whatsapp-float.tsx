import Link from "next/link";

import { profile } from "@/lib/portfolio";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function WhatsAppFloat() {
  const phone = profile.whatsappNumber.replace(/\D/g, "");
  if (!phone) return null;

  return (
    <Link
      aria-label="Conversar comigo pelo WhatsApp"
      className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      href={`https://wa.me/${phone}`}
      rel="noreferrer"
      target="_blank"
      title="Conversar pelo WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </Link>
  );
}
