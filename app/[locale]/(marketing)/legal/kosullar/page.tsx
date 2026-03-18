import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("terms"),
    robots: { index: false, follow: false },
  };
}

export default async function TermsOfServicePage() {
  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Kullanım Koşulları
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Son güncelleme: 1 Ocak 2025
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              1. Genel Hükümler
            </h2>
            <p>
              Bu kullanım koşulları, elizim.art web sitesini (&quot;site&quot;)
              kullanan tüm ziyaretçiler ve müşteriler (&quot;kullanıcı&quot;) için
              geçerlidir. Siteyi kullanarak bu koşulları kabul etmiş
              sayılırsınız. Koşulları kabul etmiyorsanız siteyi
              kullanmamanızı rica ederiz.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              2. Hizmet Tanımı
            </h2>
            <p>
              Elizim, el işçiliği ile üretilen ev tekstili ürünlerinin
              tanıtımını ve satışını yapmaktadır. Ürünlerimiz tamamen el
              emeği ile üretilmekte olup, her ürün benzersizdir. Sitede
              görüntülenen ürün görselleri temsili olabilir; el işi
              ürünlerde küçük farklılıklar doğal ve beklenen bir durumdur.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              3. Sipariş ve Ödeme
            </h2>
            <ul className="list-disc space-y-2 ps-6">
              <li>
                Siparişler WhatsApp üzerinden veya site üzerinden
                alınmaktadır.
              </li>
              <li>
                Sipariş onayı, ödemenin alınmasından sonra verilir.
              </li>
              <li>
                Ödeme yöntemleri: Havale/EFT, kapıda ödeme.
              </li>
              <li>
                Fiyatlar Türk Lirası (TL) cinsindendir ve KDV dahildir.
              </li>
              <li>
                Fiyatlar önceden haber verilmeksizin değiştirilebilir.
                Sipariş anındaki fiyat geçerlidir.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              4. Teslimat
            </h2>
            <p>
              Ürünler, üretim süresine bağlı olarak sipariş tarihinden
              itibaren belirtilen süre içinde kargoya verilir. Kargo
              süresi 1-3 iş günüdür. Teslimat adresi bilgilerinin doğru
              girilmesinden kullanıcı sorumludur. Hatalı adres nedeniyle
              oluşan ek kargo maliyetleri kullanıcıya aittir.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              5. İade ve Değişim
            </h2>
            <ul className="list-disc space-y-2 ps-6">
              <li>
                Üretim hatası bulunan ürünler 14 gün içinde ücretsiz
                değiştirilir.
              </li>
              <li>
                Özel tasarım ürünlerde iade kabul edilmemektedir.
              </li>
              <li>
                Standart ürünlerde, kullanılmamış ve orijinal ambalajında
                olan ürünler 14 gün içinde iade edilebilir.
              </li>
              <li>
                İade kargo ücreti kullanıcıya aittir (üretim hatası
                hariç).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              6. Fikri Mülkiyet
            </h2>
            <p>
              Sitede yer alan tüm içerikler (tasarımlar, görseller,
              metinler, logolar) Elizim&apos;e aittir ve telif hakkı ile
              korunmaktadır. İçeriklerin izinsiz kopyalanması,
              çoğaltılması veya dağıtılması yasaktır.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              7. Sorumluluk Sınırlandırması
            </h2>
            <p>
              Elizim, site üzerinden yapılan işlemlerden kaynaklanan
              doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
              Mücbir sebepler nedeniyle (doğal afet, salgın, vb.)
              hizmet aksamalarından sorumluluk kabul edilmez.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              8. Uyuşmazlık Çözümü
            </h2>
            <p>
              Bu koşullardan doğan uyuşmazlıklarda Karabük Mahkemeleri ve
              İcra Daireleri yetkilidir. Türkiye Cumhuriyeti kanunları
              uygulanır.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              9. İletişim
            </h2>
            <p>
              Kullanım koşulları hakkında sorularınız için:
            </p>
            <p className="mt-2">
              E-posta: info@elizim.art
              <br />
              Telefon: +90 544 861 14 79
              <br />
              Adres: Karabük, Türkiye
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
