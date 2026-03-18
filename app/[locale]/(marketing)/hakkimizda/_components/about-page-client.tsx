"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Heart, Award, Users, Sparkles } from "lucide-react";

const values = [
  { icon: Heart, color: "text-red-500" },
  { icon: Award, color: "text-amber-500" },
  { icon: Users, color: "text-blue-500" },
  { icon: Sparkles, color: "text-purple-500" },
];

const valueKeys = [
  {
    title: "El Emeği, Göz Nuru",
    description:
      "Her ürünümüz, geleneksel Anadolu el sanatları tekniklerini yaşatma amacıyla üretilmektedir. Makinenin değil, insan elinin dokunuşu her dikişte hissedilir.",
  },
  {
    title: "Kalite ve Özen",
    description:
      "En kaliteli iplikler ve kumaşlar kullanarak, yıllarca dayanacak ürünler üretiyoruz. Her detay titizlikle kontrol edilir.",
  },
  {
    title: "Müşteri Memnuniyeti",
    description:
      "Müşterilerimizin ihtiyaçlarını dinler, özel tasarım isteklerini hayata geçiririz. WhatsApp ile birebir iletişim sağlarız.",
  },
  {
    title: "Sürdürülebilir Üretim",
    description:
      "Doğal malzemeler kullanarak, çevreye duyarlı bir üretim anlayışı benimsiyoruz. Yerel üretimi destekliyoruz.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
} as const;

export function AboutPageClient() {
  const t = useTranslations("about");

  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* Workshop story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="mb-6 font-heading text-2xl font-bold sm:text-3xl">
            {t("story")}
          </h2>
          <div className="glass-card space-y-4 rounded-2xl p-8 text-muted-foreground leading-relaxed">
            <p>
              Elizim, Karabük&apos;ün kalbinde, Anadolu&apos;nun zengin el sanatları
              geleneğini yaşatmak amacıyla kurulmuş bir atölyedir. Nesilden
              nesile aktarılan nakış, dantel ve işleme tekniklerini modern
              tasarımlarla buluşturarak, evinize değer katan ürünler
              üretiyoruz.
            </p>
            <p>
              Atölyemizde her ürün, deneyimli ustalarımızın sabırlı ellerinde
              şekillenir. Doğal malzemeler, geleneksel teknikler ve modern
              estetik anlayışı bir araya gelir. Anadolu motiflerinden
              ilham alan özgün tasarımlarımız, evinizin her köşesine
              sıcaklık ve zarafet katar.
            </p>
            <p>
              Müşterilerimizle WhatsApp üzerinden birebir iletişim kurarak,
              özel tasarım isteklerini hayata geçiriyoruz. Çeyiz
              hazırlıklarından özel gün hediyelerine, günlük kullanım
              ürünlerinden dekoratif parçalara kadar geniş bir yelpazede
              hizmet veriyoruz.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 font-heading text-2xl font-bold sm:text-3xl"
          >
            {t("values")}
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {values.map(({ icon: Icon, color }, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="glass-card flex gap-5 rounded-2xl p-6"
              >
                <div className={`shrink-0 ${color}`}>
                  <Icon className="size-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {valueKeys[index].title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {valueKeys[index].description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Google Maps */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 font-heading text-2xl font-bold sm:text-3xl">
            Atölyemiz
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2!2d32.62!3d41.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEyJzAwLjAiTiAzMsKwMzcnMTIuMCJF!5e0!3m2!1str!2str!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elizim Atölye Konumu"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Karabük, Türkiye
          </p>
        </motion.section>
      </div>
    </div>
  );
}
