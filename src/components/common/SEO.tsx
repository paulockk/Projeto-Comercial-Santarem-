import { Helmet } from "react-helmet-async";
import { COMPANY } from "../../constants/company";

interface SEOProps {
  title?: string;
  fullTitle?: string;
  description: string;
  image?: string;
  url?: string;
}

export function SEO({ title, fullTitle, description, image, url }: SEOProps) {
  const tabTitle =
    fullTitle ?? (title ? `${title} | ${COMPANY.name}` : COMPANY.name);
  const siteUrl = "https://comercialsantarem.com.br";

  return (
    <Helmet>
      <title>{tabTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={tabTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={`${siteUrl}${url}`} />}

      <meta name="geo.placename" content="Lençóis Paulista" />
      <meta name="geo.region" content="BR-SP" />
    </Helmet>
  );
}
