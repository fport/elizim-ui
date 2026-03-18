import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  return {
    title: t("kvkk"),
    robots: { index: false, follow: false },
  };
}

export default async function KvkkPage() {
  return (
    <div className="px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
          Aydınlatma Metni
        </p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              1. Veri Sorumlusu
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
              uyarınca, kişisel verileriniz; veri sorumlusu olarak
              Elizim (&quot;Şirket&quot;) tarafından aşağıda açıklanan kapsamda
              işlenebilecektir.
            </p>
            <p className="mt-2">
              Veri Sorumlusu: Elizim
              <br />
              Adres: Karabük, Türkiye
              <br />
              E-posta: info@elizim.art
              <br />
              Telefon: +90 544 861 14 79
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              2. İşlenen Kişisel Veriler
            </h2>
            <p>
              Aşağıdaki kişisel verileriniz, belirtilen amaçlar
              doğrultusunda işlenebilmektedir:
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>
                <strong className="text-foreground">Kimlik Bilgileri:</strong>{" "}
                Ad, soyad
              </li>
              <li>
                <strong className="text-foreground">İletişim Bilgileri:</strong>{" "}
                E-posta adresi, telefon numarası, teslimat adresi
              </li>
              <li>
                <strong className="text-foreground">
                  İşlem Güvenliği Bilgileri:
                </strong>{" "}
                IP adresi, tarayıcı bilgileri, çerez verileri
              </li>
              <li>
                <strong className="text-foreground">
                  Müşteri İşlem Bilgileri:
                </strong>{" "}
                Sipariş geçmişi, ürün tercihleri
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              3. Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>
                Ürün ve hizmetlerin sunulması, sipariş süreçlerinin
                yürütülmesi
              </li>
              <li>Müşteri ilişkileri yönetimi ve iletişim</li>
              <li>Teslimat ve lojistik süreçlerinin yönetimi</li>
              <li>
                Yasal yükümlülüklerin yerine getirilmesi (vergi
                mevzuatı, tüketici hakları vb.)
              </li>
              <li>
                Şirket faaliyetlerinin iyileştirilmesi ve
                raporlanması
              </li>
              <li>
                Bilgi güvenliği süreçlerinin yürütülmesi
              </li>
              <li>
                İzin verilmesi halinde pazarlama ve tanıtım
                faaliyetleri
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              4. Kişisel Verilerin İşlenme Hukuki Sebebi
            </h2>
            <p>
              Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde
              belirtilen aşağıdaki hukuki sebeplere dayanılarak
              işlenmektedir:
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>Sözleşmenin kurulması ve ifası</li>
              <li>Kanunlarda açıkça öngörülmesi</li>
              <li>
                Veri sorumlusunun meşru menfaati (temel hak ve
                özgürlüklere zarar vermemek kaydıyla)
              </li>
              <li>Açık rıza (pazarlama faaliyetleri için)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              5. Kişisel Verilerin Aktarılması
            </h2>
            <p>
              Kişisel verileriniz, yukarıda belirtilen amaçlar
              doğrultusunda ve KVKK&apos;nın 8. ve 9. maddelerine uygun
              olarak aşağıdaki kişi/kurumlara aktarılabilmektedir:
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>
                Kargo ve lojistik şirketleri (teslimat amacıyla)
              </li>
              <li>
                Yetkili kamu kurum ve kuruluşları (yasal zorunluluk
                halinde)
              </li>
              <li>
                Hizmet sağlayıcılar (hosting, analitik vb. - veri
                işleme sözleşmesi kapsamında)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              6. Veri Saklama Süresi
            </h2>
            <p>
              Kişisel verileriniz, işleme amacının gerektirdiği süre
              boyunca ve yasal saklama yükümlülüklerimiz kapsamında
              saklanmaktadır. Saklama süresi sona erdikten sonra
              verileriniz silinir, yok edilir veya anonim hale
              getirilir.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              7. KVKK Kapsamındaki Haklarınız
            </h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara
              sahipsiniz:
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>
                Kişisel verilerinizin işlenip işlenmediğini öğrenme
              </li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi
                talep etme
              </li>
              <li>
                Kişisel verilerinizin işlenme amacını ve bunların
                amacına uygun kullanılıp kullanılmadığını öğrenme
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerin
                aktarıldığı üçüncü kişileri bilme
              </li>
              <li>
                Kişisel verilerin eksik veya yanlış işlenmiş olması
                halinde bunların düzeltilmesini isteme
              </li>
              <li>
                KVKK&apos;nın 7. maddesinde öngörülen şartlar
                çerçevesinde kişisel verilerin silinmesini veya yok
                edilmesini isteme
              </li>
              <li>
                Düzeltme ve silme işlemlerinin kişisel verilerin
                aktarıldığı üçüncü kişilere bildirilmesini isteme
              </li>
              <li>
                İşlenen verilerin münhasıran otomatik sistemler
                vasıtasıyla analiz edilmesi suretiyle kişinin
                kendisi aleyhine bir sonucun ortaya çıkmasına itiraz
                etme
              </li>
              <li>
                Kişisel verilerin kanuna aykırı olarak işlenmesi
                sebebiyle zarara uğraması halinde zararın
                giderilmesini talep etme
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-foreground">
              8. Başvuru Yöntemi
            </h2>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak için
              aşağıdaki yöntemlerle bize başvurabilirsiniz:
            </p>
            <ul className="mt-2 list-disc space-y-1 ps-6">
              <li>E-posta: info@elizim.art</li>
              <li>Telefon: +90 544 861 14 79</li>
              <li>Posta: Karabük, Türkiye</li>
            </ul>
            <p className="mt-3">
              Başvurularınız en geç 30 gün içinde ücretsiz olarak
              sonuçlandırılacaktır. İşlemin ayrıca bir maliyeti
              gerektirmesi halinde, Kişisel Verileri Koruma
              Kurulu&apos;nca belirlenen tarifedeki ücret alınabilir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
