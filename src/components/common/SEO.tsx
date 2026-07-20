import { Helmet } from "react-helmet-async";
import { COMPANY } from "../../constants/company";

interface SEOProps {
  fullTitle: string;
  description: string;
  image?: string;
  url?: string;
}

const SITE_URL = "https://comercialsantarem.com.br";

export function SEO({ fullTitle, description, image, url }: SEOProps) {
  const tabTitle = `${fullTitle} | ${COMPANY.name}`;
  const canonicalUrl = `${SITE_URL}${url ?? ""}`;

  return (
    <Helmet>
      <title>{tabTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={tabTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={canonicalUrl} />

      <meta name="geo.placename" content="Lençóis Paulista" />
      <meta name="geo.region" content="BR-SP" />
    </Helmet>
  );
}
