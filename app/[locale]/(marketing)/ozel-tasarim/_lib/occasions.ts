export interface OccasionConfig {
  slug: string;
  key: string;
  image: string;
}

export const OCCASIONS: OccasionConfig[] = [
  { slug: "sevgililer-gunu", key: "occasionValentines", image: "/valentines-tshirt.jpg" },
  { slug: "dogum-gunu", key: "occasionBirthday", image: "/birthday-hoodie.jpg" },
  { slug: "yildonumu", key: "occasionAnniversary", image: "/anniversary-crop.jpg" },
  { slug: "anneler-gunu", key: "occasionMothersDay", image: "/mothers-day-shirt.jpg" },
  { slug: "babalar-gunu", key: "occasionFathersDay", image: "/fathers-day-polo.jpg" },
  { slug: "dugun", key: "occasionWedding", image: "/wedding-couple.jpg" },
  { slug: "mezuniyet", key: "occasionGraduation", image: "/graduation-sweatshirt.jpg" },
  { slug: "yeni-yil", key: "occasionNewYear", image: "/newyear-longsleeve.jpg" },
  { slug: "bebek", key: "occasionBaby", image: "/baby-onesie.jpg" },
];

export function getOccasionBySlug(slug: string) {
  return OCCASIONS.find((o) => o.slug === slug);
}
