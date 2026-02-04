import Link from "next/link"

export function FooterLegal() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10 pt-6">
      <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center shadow-sm backdrop-blur">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <Link
            href="/confidentialite"
            className="text-xs text-white/70 hover:text-white transition"
          >
            Politique de confidentialité
          </Link>

          <span className="hidden sm:inline text-white/25">•</span>

          <Link
            href="/mentions-legales"
            className="text-xs text-white/70 hover:text-white transition"
          >
            Mentions légales
          </Link>

          <span className="hidden sm:inline text-white/25">•</span>

          <Link
            href="/droit-oubli"
            className="text-xs text-white/70 hover:text-white transition"
          >
            Exercer mes droits (RGPD)
          </Link>
        </div>

        <p className="mt-4 text-[11px] leading-5 text-white/45">
          Et j&apos;ai crié traite les données confiées uniquement pour permettre
          l&apos;expérience mémorielle, à la demande de la famille.
        </p>
      </div>
    </footer>
  )
}
