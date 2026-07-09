import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SceneBackground } from "@/components/three/scene-background";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/api";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Byldd" },
  sameAs: site.socials.map((s) => s.href),
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SceneBackground />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
