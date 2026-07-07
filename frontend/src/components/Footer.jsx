function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Shoppifyy</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-gray-600">A polished shopping experience designed for modern brands and thoughtful shoppers.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li><a href="#about" className="transition hover:text-yellow-600">About</a></li>
            <li><a href="#contact" className="transition hover:text-yellow-600">Contact</a></li>
            <li><a href="#products" className="transition hover:text-yellow-600">Shop</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Support</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="transition hover:text-yellow-600">FAQ</a></li>
            <li><a href="#" className="transition hover:text-yellow-600">Privacy Policy</a></li>
            <li><a href="#" className="transition hover:text-yellow-600">Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">Newsletter</h3>
          <p className="mt-4 text-sm text-gray-600">Stay updated with launch drops and offers.</p>
          <form className="mt-4 flex flex-col gap-3">
            <label className="sr-only" htmlFor="newsletter">Email address</label>
            <input id="newsletter" type="email" placeholder="Email address" className="rounded-full border border-gray-200 px-4 py-3 text-sm" />
            <button type="button" className="rounded-full bg-yellow-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-yellow-500">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
        © 2026 Shoppifyy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
