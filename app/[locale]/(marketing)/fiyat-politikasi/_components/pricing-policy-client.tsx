"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Sparkles, Clock, Shield, Palette } from "lucide-react";

const sections = [
  {
    icon: Sparkles,
    title: "El İşçiliği Değeri",
    content:
      "Ürünlerimiz tamamen el emeği ile üretilmektedir. Her bir ürün, deneyimli ustalarımızın saatlerce süren titiz çalışmasının sonucudur. Fiyatlarımız, bu emeğin ve ustalığın karşılığını yansıtmaktadır. Makine üretimi ürünlerle kıyaslandığında daha yüksek olabilir ancak kalite, özgünlük ve dayanıklılık açısından çok üstündür.",
  },
  {
    icon: Clock,
    title: "Üretim Süreci",
    content:
      "Her ürünün üretim süresi, karmaşıklığına ve boyutuna göre değişmektedir. Basit bir havlu kenarı 1-3 gün sürerken, kapsamlı bir çeyiz seti 2-3 hafta sürebilir. Fiyatlarımız, üretim süresini ve kullanılan malzeme kalitesini yansıtır.",
  },
  {
    icon: Shield,
    title: "Kalite Garantisi",
    content:
      "Tüm ürünlerimiz kalite kontrol sürecinden geçmektedir. Herhangi bir üretim hatası durumunda 14 gün içinde ücretsiz değişim yapılmaktadır. Ürünlerimizin uzun ömürlü olması için bakım talimatları ürünle birlikte gönderilmektedir.",
  },
  {
    icon: Palette,
    title: "Özel Tasarım Fiyatlandırma",
    content:
      "Özel tasarım ürünler, standart ürünlere göre farklı fiyatlandırılmaktadır. Tasarımın karmaşıklığı, boyutu ve kullanılacak malzemeye göre fiyat belirlenir. Özel tasarım talepleriniz için WhatsApp üzerinden fiyat teklifi alabilirsiniz. Toplu siparişlerde indirim uygulanmaktadır.",
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

export function PricingPolicyClient() {
  const t = useTranslations("pricingPolicy");

  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h1 className="font-heading text-4xl font-bold sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 glass-card rounded-2xl p-8"
        >
          <p className="leading-relaxed text-muted-foreground">
            Elizim olarak, el işçiliği ürünlerimizin fiyatlandırmasında
            şeffaflık ilkesini benimsiyoruz. Fiyatlarımız; kullanılan
            malzemenin kalitesi, üretim süresi, tasarımın karmaşıklığı ve
            usta işçiliğin değeri göz önünde bulundurularak belirlenmektedir.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="glass-card flex gap-5 rounded-2xl p-6 sm:p-8"
              >
                <div className="shrink-0">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold">{section.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            Fiyatlarımız Türk Lirası (TL) cinsinden belirlenmiştir ve KDV
            dahildir. Kargo ücreti sipariş tutarına göre değişiklik
            gösterebilir. Güncel fiyatlar için ürün sayfalarını
            inceleyebilir veya WhatsApp üzerinden bilgi alabilirsiniz.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
