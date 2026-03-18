import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("privacy"),
    robots: { index: false, follow: false },
  };
}

export default async function PrivacyPolicyPage() {
  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Gizlilik Politikası
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Son güncelleme: 1 Ocak 2025
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              1. Genel Bilgi
            </h2>
            <p>
              Bu gizlilik politikası, Elizim (&quot;biz&quot;, &quot;bizim&quot; veya &quot;şirket&quot;)
              tarafından işletilen elizim.art web sitesi (&quot;site&quot;)
              aracılığıyla toplanan kişisel verilerin nasıl
              toplandığını, kullanıldığını, saklandığını ve korunduğunu
              açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              2. Toplanan Veriler
            </h2>
            <p>Sitemizi kullanırken aşağıdaki verileri toplayabiliriz:</p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>Ad ve soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>Teslimat adresi</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
              <li>Sipariş geçmişi ve tercihler</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              3. Verilerin Kullanım Amaçları
            </h2>
            <p>Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>Sipariş işleme ve teslimat</li>
              <li>Müşteri hizmetleri ve iletişim</li>
              <li>Ürün ve hizmet iyileştirme</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Pazarlama iletişimi (onay alınarak)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              4. Veri Güvenliği
            </h2>
            <p>
              Kişisel verilerinizi korumak için endüstri standardı güvenlik
              önlemleri uygulamaktayız. Verileriniz şifrelenmiş bağlantılar
              (SSL/TLS) üzerinden iletilmekte ve güvenli sunucularda
              saklanmaktadır. Ancak internet üzerinden yapılan hiçbir
              iletişimin %100 güvenli olmadığını hatırlatmak isteriz.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              5. Üçüncü Taraf Paylaşımı
            </h2>
            <p>
              Kişisel verileriniz, sipariş teslimatı için kargo şirketleri
              ve yasal zorunluluklar dışında üçüncü taraflarla
              paylaşılmamaktadır. Verileriniz hiçbir koşulda satılmaz veya
              kiralanmaz.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              6. Çerezler (Cookies)
            </h2>
            <p>
              Sitemiz, kullanıcı deneyimini iyileştirmek için çerezler
              kullanmaktadır. Çerezler; oturum yönetimi, tercih saklama ve
              analitik amaçlı kullanılmaktadır. Tarayıcı ayarlarınızdan
              çerezleri devre dışı bırakabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              7. Haklarınız
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
              aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmiş ise buna ilişkin bilgi talep etme</li>
              <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
              <li>İşlemenin kısıtlanmasını talep etme</li>
              <li>Veri taşınabilirliği hakkı</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              8. İletişim
            </h2>
            <p>
              Gizlilik politikamız hakkında sorularınız için bizimle
              iletişime geçebilirsiniz:
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
