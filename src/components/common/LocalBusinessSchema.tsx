import { Helmet } from "react-helmet-async";
import { COMPANY } from "../../constants/company";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: COMPANY.name,
    telephone: COMPANY.whatsapp,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address,
      addressLocality: "Lençóis Paulista",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    openingHours: COMPANY.openingHours,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
