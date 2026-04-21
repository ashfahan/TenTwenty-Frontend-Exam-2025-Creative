export const SITE_NAME = "TenTwenty Farms"
export const SITE_DESC = "From our farms to your hands. Quality agricultural products and farm-fresh commitment."
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#news", label: "News" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Our Team" },
  { href: "#enquiry", label: "Make Enquiry" },
] as const

export type NavLink = (typeof navLinks)[number]
