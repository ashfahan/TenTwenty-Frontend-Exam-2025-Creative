import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { ArrowRightIcon, CloseIcon, MenuIcon } from "@/components/Icons"
import { navLinks, SITE_NAME } from "@/constants/site"
import { cn } from "@/utils/cn"
import { useId, useState } from "react"

const navLinkClass =
  "block py-3 text-base text-neutral-800 transition hover:text-neutral-950 lg:inline lg:py-0 lg:text-[0.9375rem] lg:font-normal"

const brandClassName =
  "h-auto gap-0 px-0 py-0 text-sm font-semibold tracking-tight text-neutral-900 hover:bg-transparent hover:text-neutral-600"

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  return (
    <header className="sticky top-0 z-999 border-b border-neutral-200/80 bg-white shadow-sm lg:fixed lg:inset-x-5 lg:top-5">
      <Container className="relative px-0 lg:px-12">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>

        <div className="flex items-center justify-between py-4 lg:py-6">
          <div className="px-4 lg:hidden">
            <span className="text-xl font-bold tracking-tight text-neutral-900">{SITE_NAME}</span>
          </div>

          <nav
            id={menuId}
            aria-label="Primary"
            className={cn(
              "hidden lg:block",
              menuOpen &&
                "absolute inset-x-0 top-full block border-t border-neutral-200 bg-white px-4 py-8 lg:static lg:block lg:border-0 lg:bg-transparent lg:p-0"
            )}
          >
            <ul className="m-0 flex list-none flex-col gap-6 p-0 lg:flex-row lg:items-center lg:gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    {label}
                  </a>
                </li>
              ))}

              <li className="mt-4 lg:hidden">
                <Button href="#contact" variant="outline" className="w-full justify-between">
                  Contact us <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 px-4 lg:px-0">
            <div className="hidden lg:block">
              <Button href="#contact" variant="outline" className="px-8 py-3">
                Contact us <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>

            <div className="lg:hidden">
              <Button
                type="button"
                variant="ghost"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((o) => !o)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center p-0 hover:bg-neutral-100"
              >
                {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
