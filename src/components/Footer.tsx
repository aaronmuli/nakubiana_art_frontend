import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/40 py-24 px-8 md:px-16">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-4">
        <h3 className="font-heading italic text-xl mb-6">Nakubiana . N</h3>
        <p className="text-xs text-muted-foreground leading-[2] font-body max-w-xs">
          Original contemporary artworks.
          Each piece a room you can walk into.
        </p>
      </div>
      <div className="md:col-span-2 md:col-start-8">
        <p className="text-label mb-6">Navigate</p>
        <div className="space-y-3 text-xs font-body">
          <Link to="/gallery" className="block gallery-link w-fit">Gallery</Link>
          <Link to="/about" className="block gallery-link w-fit">About</Link>
          <Link to="/contact" className="block gallery-link w-fit">Contact</Link>
        </div>
      </div>
      <div className="md:col-span-2 md:col-start-11">
        <p className="text-label mb-6">Connect</p>
        <div className="space-y-3 text-xs font-body">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block gallery-link w-fit">
            Instagram
          </a>
          <a href="https://www.facebook.com/samueln.nakubiana" target="_blank" rel="noreferrer" className="block gallery-link w-fit">
            Facebook
          </a>
          {/* <a href="mailto:hello@elaravoss.art" className="block gallery-link w-fit">
            Email
          </a> */}
        </div>
      </div>
    </div>
    <div className="mt-24 pt-8 border-t border-border/20 flex items-center justify-between text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase font-body">
      <span>© {new Date().getFullYear()} Nakubiana . N</span>
      <span>All rights reserved</span>
    </div>
  </footer>
);

export default Footer;
