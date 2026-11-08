export function SiteTheme({ appearance }) {
  return <style>{`:root{--color-primary:${appearance.primaryColor};--color-secondary:${appearance.secondaryColor};--color-accent:${appearance.accentColor};${appearance.sectionSpacing === "compact" ? "--section-padding:4rem" : appearance.sectionSpacing === "spacious" ? "--section-padding:8rem" : "--section-padding:6rem"}}`}</style>;
}
