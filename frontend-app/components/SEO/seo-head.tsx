import React from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, canonical }) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
  </>
);

export default SEOHead;
