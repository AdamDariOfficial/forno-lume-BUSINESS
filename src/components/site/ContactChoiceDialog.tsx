import type { ReactNode } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  mailLink,
  site,
  telLink,
  waLink,
  type ContactChannel,
  type ContactIntent,
} from "@/config/site";

type ContactChoiceDialogProps = {
  kind: ContactIntent;
  children: ReactNode;
};

const channelContent: Record<
  ContactChannel,
  { label: string; detail: string; icon: typeof Phone; href: () => string; external?: boolean }
> = {
  whatsapp: {
    label: "WhatsApp",
    detail: "Scrivi ora",
    icon: MessageCircle,
    href: () => waLink(site.contact.whatsappReserveMessage),
    external: true,
  },
  email: {
    label: "Email",
    detail: "Scrivi ora",
    icon: Mail,
    href: () => mailLink("Contatto Forno Lume"),
  },
  phone: {
    label: "Telefono",
    detail: "Chiama ora",
    icon: Phone,
    href: telLink,
  },
};

export function ContactChoiceDialog({ kind, children }: ContactChoiceDialogProps) {
  const isBooking = kind === "booking";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-modal="true"
        className="w-[calc(100%-1.5rem)] max-w-2xl gap-5 rounded-3xl border-border bg-card p-5 shadow-[var(--shadow-warm)] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:slide-in-from-top-3 data-[state=closed]:slide-out-to-top-2 sm:p-7"
      >
        <DialogHeader className="pr-10 text-left">
          <DialogTitle className="font-display text-2xl font-medium leading-tight text-foreground sm:text-3xl">
            {isBooking ? "Come preferisci prenotare?" : "Come preferisci contattarci?"}
          </DialogTitle>
          <DialogDescription className="pt-2 leading-relaxed">
            {isBooking ? "Scegli WhatsApp o telefono." : "Scegli email o telefono."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3.5 sm:grid-cols-2">
          {site.conversion[kind].map((channel) => {
            const content = channelContent[channel];
            const Icon = content.icon;

            return (
              <DialogClose asChild key={channel}>
                <a
                  href={content.href()}
                  target={content.external ? "_blank" : undefined}
                  rel={content.external ? "noopener noreferrer" : undefined}
                  className="interactive-card group flex min-h-20 min-w-0 items-center gap-3 rounded-2xl border border-border bg-background p-4 sm:gap-4 sm:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block whitespace-nowrap font-medium text-foreground">
                      {content.label}
                    </span>
                    <span className="mt-0.5 block whitespace-nowrap text-xs text-muted-foreground">
                      {content.detail}
                    </span>
                  </span>
                </a>
              </DialogClose>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
