"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/config/site";
import { useCatalog } from "@/hooks/use-catalog";

export function Footer() {
  const { categories } = useCatalog();

  return (
    <footer className="section-dark mt-auto border-t border-secondary-500/25 pb-24 md:pb-0">
      <div className="h-0.5 w-full bg-gradient-gold" />

      <div className="border-b border-white/10">
        <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/category/all"
                  className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300"
                >
                  All products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Help</h3>
            <ul className="space-y-2.5">
              <li><Link href="/orders" className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300">Track your order</Link></li>
              <li><Link href="/account" className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300">My account</Link></li>
              <li><Link href="/wishlist" className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300">Wishlist</Link></li>
              <li><Link href="/cart" className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300">Cart</Link></li>
              <li><Link href="/blog" className="text-sm text-on-dark-muted transition-colors hover:text-secondary-300">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Contact us</h3>
            <ul className="space-y-3 text-sm text-on-dark-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-secondary-400" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2},<br />
                  {siteConfig.address.city}, {siteConfig.address.state} - {siteConfig.address.pincode}
                </span>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2.5 transition-colors hover:text-secondary-300">
                  <Phone className="size-4 shrink-0 text-secondary-400" /> {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition-colors hover:text-secondary-300">
                  <Mail className="size-4 shrink-0 text-secondary-400" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-on-dark-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="transition-colors hover:text-secondary-300">Privacy Policy</Link>
          <Link href="/terms" className="transition-colors hover:text-secondary-300">Terms of Service</Link>
        </div>
      </Container>
    </footer>
  );
}
