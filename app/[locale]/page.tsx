"use client";

import { useTranslations, useLocale } from "next-intl";
import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useRequestFormHref } from "@/hooks/useRequestFormHref";
import { mergeMarketingQuery, persistMarketingQuery } from "@/lib/marketingParams";
import { buildThankYouUrl } from "@/lib/thankYouUrl";
import { AmoFormEmbed } from "@/components/AmoFormEmbed";
import { AMO_FORM_ORIGIN, getAmoFormSubmitResult } from "@/lib/amoFormEmbed";
import type { Locale } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Wallet, 
  MapPin, 
  Users, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  XCircle,
  Banknote,
  FileX,
  Timer,
  Send,
  Star,
  Building,
  Trophy
} from "lucide-react";

type WithRequestFormHref = { requestFormHref: string };

const Hero = ({ requestFormHref }: WithRequestFormHref) => {
  const t = useTranslations("hero");
  
  return (
    <section className="relative flex items-center overflow-hidden pt-20 pb-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-navy-50" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-brand-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            <Building2 className="w-4 h-4 mr-2 inline" />
            {t("badge")}
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-5">
            <span className="text-gradient">{t("title1")}</span>
            <br />
            <span className="text-foreground">{t("title2")}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button size="default" className="px-6 py-2.5 rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20 min-w-[200px] sm:min-w-0" asChild>
              <Link href={requestFormHref} className="inline-flex items-center justify-center gap-2">
                <span className="whitespace-nowrap">{t("cta")}</span>
                <ArrowRight className="ml-2 w-4 h-4 flex-shrink-0" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>{t("feature1")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>{t("feature2")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-500" />
              <span>{t("feature3")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PainPoints = () => {
  const t = useTranslations("painPoints");
  
  const items = [
    { icon: AlertTriangle, titleKey: "item1Title", descKey: "item1Desc" },
    { icon: XCircle, titleKey: "item2Title", descKey: "item2Desc" },
    { icon: FileX, titleKey: "item3Title", descKey: "item3Desc" },
    { icon: Banknote, titleKey: "item4Title", descKey: "item4Desc" },
    { icon: Timer, titleKey: "item5Title", descKey: "item5Desc" },
    { icon: Users, titleKey: "item6Title", descKey: "item6Desc" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <Badge variant="outline" className="mb-3 border-red-200 text-red-600 bg-red-50 text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {t("badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-foreground">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("description")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <Card 
              key={index}
              className="border-red-100 bg-white hover:border-red-200 hover:shadow-md transition-all"
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base mb-1 text-foreground">{t(item.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10 max-w-2xl mx-auto p-5 rounded-xl bg-red-50 border border-red-100">
          <p className="text-base text-red-800" dangerouslySetInnerHTML={{ __html: t.raw("conclusion") }} />
        </div>
      </div>
    </section>
  );
};

const Benefits = ({ requestFormHref }: WithRequestFormHref) => {
  const t = useTranslations("benefits");
  const tForm = useTranslations("requestForm");
  
  const items = [
    { icon: ShieldCheck, titleKey: "item1Title", descKey: "item1Desc", highlightKey: "item1Highlight" },
    { icon: Clock, titleKey: "item2Title", descKey: "item2Desc", highlightKey: "item2Highlight" },
    { icon: Wallet, titleKey: "item3Title", descKey: "item3Desc", highlightKey: "item3Highlight" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-2">
            {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border hover:border-brand-300 transition-all hover:shadow-lg group"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-brand-100 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative pb-2">
                <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center mb-4 shadow-md shadow-brand-500/20">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-lg font-medium">{t(item.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="relative pt-0">
                <p className="text-muted-foreground text-base mb-4">{t(item.descKey)}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  {t(item.highlightKey)}
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={requestFormHref}>
                    {tForm("title")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const t = useTranslations("testimonials");
  
  const testimonials = [
    { quoteKey: "quote1", nameKey: "name1", roleKey: "role1", locationKey: "location1", image: "/asel.png" },
    { quoteKey: "quote2", nameKey: "name2", roleKey: "role2", locationKey: "location2", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { quoteKey: "quote3", nameKey: "name3", roleKey: "role3", locationKey: "location3", image: "/faisal.png" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold">
            {t("title")}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-5 right-5 text-5xl font-serif text-brand-200/50">&quot;</div>
              <CardHeader className="pb-2">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-base mb-5 relative z-10 leading-relaxed">
                  {t(testimonial.quoteKey)}
                </p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={t(testimonial.nameKey)}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-200"
                  />
                  <div>
                    <p className="font-medium">{t(testimonial.nameKey)}</p>
                    <p className="text-sm text-muted-foreground">
                      {t(testimonial.roleKey)}, {t(testimonial.locationKey)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Product = () => {
  const t = useTranslations("product");
  
  const features = [
    { icon: Building, key: "feature1" },
    { icon: FileX, key: "feature2" },
    { icon: ShieldCheck, key: "feature3" },
    { icon: Clock, key: "feature4" },
    { icon: Mail, key: "feature5" },
    { icon: Users, key: "feature6" }
  ];
  
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-3 text-sm">{t("badge")}</Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
                {t("title")} <span className="text-gradient">{t("titleHighlight")}</span>?
              </h2>
              <p className="text-base text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.raw("description1") }} />
              <p className="text-base text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: t.raw("description2") }} />
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-50 border border-brand-200">
                <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-brand-900">{t("locationsTitle")}</p>
                  <p className="text-sm text-brand-700">{t("locationsDesc")}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {features.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <p className="text-foreground">{t(item.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PRICING_CONTENT = {
  ru: {
    badge: "Тарифы", title: "Выберите подходящий пакет",
    description: "Прозрачные цены под ключ с НДС, никаких скрытых платежей. Уставный капитал оплачивается отдельно.",
    popular: "Популярный", vat: "сум", cta: "Запросить консультацию",
    standard: { title: "Стандарт", for: "Для ООО без НДС", price: "1 190 000", features: ["Регистрация ООО под ключ", "Юридический адрес для регистрации", "Постановка на учёт (e-ijara, Didox)", "Помощь юриста на всех этапах"] },
    business: { title: "Бизнес", for: "Для ООО на НДС", price: "2 490 000", features: ["Всё из пакета Стандарт", "Регистрация плательщиком НДС", "Юридический адрес 18 м² под НДС", "Сопровождение постановки на учёт по НДС"] },
    foreign: { title: "Премиум", for: "Иностранное предприятие", price: "от 3 500 000", features: ["Регистрация предприятия с иностранными инвестициями", "Для нерезидентов — удалённо, по доверенности", "Юридический адрес и постановка на учёт"] },
  },
  en: {
    badge: "Plans", title: "Choose the right package",
    description: "Transparent turnkey prices incl. VAT, no hidden fees. Charter capital is paid separately.",
    popular: "Popular", vat: "UZS", cta: "Request a consultation",
    standard: { title: "Standard", for: "For an LLC without VAT", price: "1 190 000", features: ["Turnkey LLC registration", "Legal address for registration", "Tax registration (e-ijara, Didox)", "Lawyer support at every step"] },
    business: { title: "Business", for: "For an LLC with VAT", price: "2 490 000", features: ["Everything in Standard", "Registration as a VAT payer", "18 m² legal address for VAT", "Support with VAT tax registration"] },
    foreign: { title: "Premium", for: "Foreign enterprise", price: "from 3 500 000", features: ["Registration of an enterprise with foreign investment", "For non-residents — remotely, by power of attorney", "Legal address and tax registration"] },
  },
  kk: {
    badge: "Тарифтер", title: "Қолайлы пакетті таңдаңыз",
    description: "Кілтпен ашық бағалар, ҚҚС қосылған, жасырын төлемдерсіз. Жарғылық капитал бөлек төленеді.",
    popular: "Танымал", vat: "сум", cta: "Кеңес сұрау",
    standard: { title: "Стандарт", for: "ҚҚС-сіз ЖШС үшін", price: "1 190 000", features: ["ЖШС-ны кілтпен тіркеу", "Тіркеу үшін заңды мекенжай", "Есепке қою (e-ijara, Didox)", "Барлық кезеңде заңгер көмегі"] },
    business: { title: "Бизнес", for: "ҚҚС төлеуші ЖШС үшін", price: "2 490 000", features: ["Стандарт пакеттегінің бәрі", "ҚҚС төлеуші ретінде тіркеу", "ҚҚС үшін 18 м² заңды мекенжай", "ҚҚС есебіне қоюды сүйемелдеу"] },
    foreign: { title: "Премиум", for: "Шетелдік кәсіпорын", price: "3 500 000-нан", features: ["Шетел инвестициялары бар кәсіпорынды тіркеу", "Бейрезиденттерге — қашықтан, сенімхат бойынша", "Заңды мекенжай және есепке қою"] },
  },
  uz: {
    badge: "Tariflar", title: "Mos paketni tanlang",
    description: "Shaffof tan narxlar, QQS bilan, yashirin to'lovlarsiz. Ustav kapitali alohida to'lanadi.",
    popular: "Mashhur", vat: "so'm", cta: "Konsultatsiya so'rash",
    standard: { title: "Standart", for: "QQS-siz MChJ uchun", price: "1 190 000", features: ["MChJ-ni kalit topshirish bilan ro'yxatdan o'tkazish", "Ro'yxatdan o'tish uchun yuridik manzil", "Hisobga qo'yish (e-ijara, Didox)", "Barcha bosqichlarda yurist yordami"] },
    business: { title: "Biznes", for: "QQS to'lovchi MChJ uchun", price: "2 490 000", features: ["Standart paketdagi hammasi", "QQS to'lovchi sifatida ro'yxatdan o'tkazish", "QQS uchun 18 m² yuridik manzil", "QQS hisobiga qo'yishni qo'llab-quvvatlash"] },
    foreign: { title: "Premium", for: "Xorijiy korxona", price: "3 500 000 dan", features: ["Xorijiy investitsiyali korxonani ro'yxatdan o'tkazish", "Norezidentlar uchun — masofadan, ishonchnoma bo'yicha", "Yuridik manzil va hisobga qo'yish"] },
  },
  zh: {
    badge: "套餐", title: "选择合适的套餐",
    description: "透明的一站式价格，含增值税，无隐藏费用。注册资本另付。",
    popular: "热门", vat: "苏姆", cta: "申请咨询",
    standard: { title: "标准", for: "无增值税有限责任公司", price: "1 190 000", features: ["有限责任公司一站式注册", "注册用法定地址", "税务登记（e-ijara、Didox）", "全程律师协助"] },
    business: { title: "商业", for: "增值税有限责任公司", price: "2 490 000", features: ["包含标准套餐全部内容", "增值税纳税人注册", "增值税用 18 m² 法定地址", "增值税税务登记支持"] },
    foreign: { title: "高级", for: "外国企业", price: "3 500 000 起", features: ["外资企业注册", "面向非居民——远程、凭授权书", "法定地址及税务登记"] },
  },
} as const;

const Pricing = ({ requestFormHref }: WithRequestFormHref) => {
  const locale = useLocale() as keyof typeof PRICING_CONTENT;
  const c = PRICING_CONTENT[locale] ?? PRICING_CONTENT.ru;
  const tiers = [
    { d: c.standard, variant: "plain" as const },
    { d: c.business, variant: "popular" as const },
    { d: c.foreign, variant: "premium" as const },
  ];
  return (
    <section id="pricing" className="py-10 lg:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[100px]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3 text-sm">{c.badge}</Badge>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 text-foreground">{c.title}</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{c.description}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {tiers.map((t, idx) => {
            const popular = t.variant === "popular";
            return (
              <Card key={idx} className={popular
                ? "bg-gradient-to-b from-brand-500 to-brand-600 border-brand-400 text-white relative overflow-hidden md:scale-[1.03] shadow-xl shadow-brand-500/20"
                : "bg-white border-border relative overflow-hidden hover:border-brand-300 hover:shadow-lg transition-all"}>
                {popular && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-yellow-400 text-yellow-900 border-0 shadow-md"><Star className="w-4 h-4 mr-1 fill-yellow-900" />{c.popular}</Badge>
                  </div>
                )}
                <CardHeader className={popular ? "pb-3 pt-10" : "pb-3 pt-5"}>
                  <Badge variant="secondary" className={popular
                    ? "bg-white/20 text-white border-white/30 mb-3 w-fit"
                    : (t.variant === "premium" ? "bg-amber-50 text-amber-700 border-amber-200 mb-3 w-fit" : "bg-emerald-50 text-emerald-700 border-emerald-200 mb-3 w-fit")}>
                    {t.variant === "premium" && <Trophy className="w-4 h-4 mr-1" />}{t.d.title}
                  </Badge>
                  <p className={`text-sm mb-2 ${popular ? "text-brand-100" : "text-muted-foreground"}`}>{t.d.for}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-semibold">{t.d.price}</span>
                    <span className={`text-sm ${popular ? "text-brand-100" : "text-muted-foreground"}`}>{c.vat}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <ul className="space-y-2.5">
                    {t.d.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${popular ? "text-white" : "text-brand-500"}`} />
                        <span className={popular ? "text-white" : "text-foreground"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  {popular ? (
                    <Button className="w-full rounded-full bg-white text-brand-700 hover:bg-brand-50 font-medium" asChild>
                      <Link href={requestFormHref} className="inline-flex items-center justify-center gap-2"><span className="whitespace-nowrap">{c.cta}</span><ArrowRight className="ml-1 w-4 h-4" /></Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full rounded-full" asChild>
                      <Link href={requestFormHref}>{c.cta}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const RequestFormSection = () => {
  const t = useTranslations("requestForm");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const redirectedRef = useRef(false);
  const searchParams = useSearchParams();
  const marketing = mergeMarketingQuery(searchParams.toString());

  useEffect(() => {
    if (marketing) persistMarketingQuery(marketing);
  }, [searchParams, marketing]);

  useEffect(() => {
    redirectedRef.current = false;
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#request-form" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [locale]);

  useEffect(() => {
    const redirectToThankYou = () => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.location.assign(buildThankYouUrl(locale as Locale));
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== AMO_FORM_ORIGIN) return;
      const result = getAmoFormSubmitResult(event.data);
      if (result === "success") redirectToThankYou();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [locale]);

  return (
    <section id="request-form" ref={sectionRef} className="py-5 lg:py-7 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center text-foreground w-full">
            {t("title")}
          </h2>
          <AmoFormEmbed key={locale} marketingQuery={marketing} aria-label={t("title")} />
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const t = useTranslations("cta");
  
  return (
    <section className="pt-5 pb-12 md:pb-8 lg:py-7 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-navy-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-400/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {t("description")}
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" className="px-8 rounded-full bg-gradient-brand hover:opacity-90 transition-all shadow-md shadow-brand-500/20" asChild>
              <a href="https://t.me/BizRegUz" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 w-5 h-5" />
                {t("button")}
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw("tagline") }} />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const t = useTranslations("footer");
  
  return (
    <footer className="py-6 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t("copyright")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("company")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const requestFormHref = useRequestFormHref();

  return (
    <main className="min-h-screen">
      <Hero requestFormHref={requestFormHref} />
      <PainPoints />
      <Benefits requestFormHref={requestFormHref} />
      <Testimonials />
      <Product />
      <Pricing requestFormHref={requestFormHref} />
      <RequestFormSection />
      <CTA />
      <Footer />
    </main>
  );
}
