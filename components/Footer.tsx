import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone mt-32">
      <div className="shell pt-20 pb-10">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow opacity-60 mb-5">— Let's make it extraordinary</p>
            <h2 className="font-serif text-display leading-[0.95]">
              Have a space<br /> in mind?
            </h2>
            <Link
              href="/contact"
              className="btn-arrow mt-10 inline-flex border border-bone/30 rounded-full px-6 py-3 text-sm hover:bg-bone hover:text-ink transition-colors"
            >
              <span className="dot bg-bone" /> Start a project →
            </Link>
          </div>
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-4 mt-16 lg:mt-0">
            <div>
              <p className="eyebrow opacity-50 mb-4">Studio</p>
              <p className="text-sm leading-relaxed">
                2154 Sunset Blvd<br />
                Silver Lake, Los Angeles<br />
                CA 90026
              </p>
            </div>
            <div>
              <p className="eyebrow opacity-50 mb-4">Contact</p>
              <p className="text-sm leading-relaxed">
                hello@noma.studio<br />
                +1 (323) 555 0148
              </p>
            </div>
            <div>
              <p className="eyebrow opacity-50 mb-4">Social</p>
              <ul className="text-sm space-y-1 hover-fade">
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Are.na</a></li>
                <li><a href="#">Pinterest</a></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow opacity-50 mb-4">Index</p>
              <ul className="text-sm space-y-1 hover-fade">
                <li><Link href="/work">Work</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/process">Process</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-6 border-t border-bone/15 flex justify-between text-xs opacity-50">
          <span>© Noma Studio — 2026</span>
          <span>Calm · Clarity · Boldness</span>
        </div>
      </div>
    </footer>
  );
}
