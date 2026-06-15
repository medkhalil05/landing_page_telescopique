"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Star,
  Settings,
  XCircle,
  Wrench,
  Clock,
  ArrowDownCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  PackageCheck,
  CreditCard,
  Headset,
  RefreshCcw,
  Shirt,
  Bath,
  Maximize,
  ChevronRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import emailjs from '@emailjs/browser';

export default function LandingPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Casablanca"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Gallery slider state for mobile
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 0
  });

  const productImages = [
    "/images/product-living-room.jpeg",
    "/images/product-usage.jpeg",
    "/images/product-collage.jpeg",
    "/images/product-installation.jpeg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 0 }; 
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.address) return;
    
    setIsLoading(true);
    setErrorMessage("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          to_name: "Admin",
          from_name: formState.name,
          phone: formState.phone,
          city: formState.city,
          address: formState.address,
          product_name: "البار التلسكوبي",
          price: "129 درهم",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );

      setIsSubmitted(true);
      setFormState({
        name: "",
        phone: "",
        address: "",
        city: "Casablanca"
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrorMessage("حدث خطأ أثناء إرسال الطلب. المرجو المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cities = [
    "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
    "Meknès", "Oujda", "Kénitra", "Tétouan", "El Jadida", "Safi",
    "Nador", "Beni Mellal", "Khouribga", "Autre"
  ];

  const faqs = [
    { q: "هل يحتاج إلى الحفر؟", a: "لا، البار التلسكوبي مصمم ليثبت بقوة الدفع بين الجدارين دون الحاجة لأي براغي أو حفر." },
    { q: "هل يمكن تعديل الطول؟", a: "نعم، يمكنك تعديل الطول بسهولة ليناسب مساحتك من خلال تدوير البار وتوسيعه." },
    { q: "هل يتحمل الوزن؟", a: "نعم، بفضل تصميمه المتين والقواعد المانعة للانزلاق، يمكنه تحمل وزن الستائر الثقيلة والملابس المبللة بأمان." },
    { q: "كم مدة التوصيل؟", a: "التوصيل يستغرق عادة بين 24 إلى 48 ساعة إلى جميع مدن المغرب." },
    { q: "هل الدفع عند الاستلام متوفر؟", a: "نعم، يمكنك معاينة المنتج والدفع نقداً عند استلامه من مندوب التوصيل." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* STICKY CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 md:hidden flex justify-center items-center"
          >
            <button
              onClick={scrollToForm}
              className="w-full max-w-sm bg-primary text-white font-bold text-lg py-4 rounded-xl shadow-[0_8px_20px_rgba(255,107,0,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              اطلب الآن واستفد من الخصم
              <ArrowDownCircle className="w-6 h-6 animate-bounce" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP BUTTON */}
      <a
        href="https://wa.me/212627276980?text=مرحبًا%20،%20أرغب%20في%20الحصول%20على%20معلومات%20حول%20البار%20التلسكوبي"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 left-4 md:bottom-6 md:left-6 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all z-50 flex items-center justify-center group"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="absolute right-16 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          تواصل معنا
        </span>
      </a>

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="w-full lg:w-1/2 text-center lg:text-right"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full mb-6 border border-primary/20">
                المنتج الأكثر مبيعاً في المغرب 🔥
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                الحل الذكي لتعليق الستائر <span className="text-primary">بدون حفر</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                بار تلسكوبي قابل للتعديل يوفر لك حلاً عملياً وأنيقاً لتعليق الستائر وتنظيم المساحات بدون أدوات وبدون إتلاف الجدران.
              </motion.p>

              <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 mb-10 text-right">
                {[
                  { icon: CreditCard, text: "الدفع عند الاستلام" },
                  { icon: Truck, text: "توصيل لجميع المدن" },
                  { icon: Settings, text: "تركيب بدون حفر" },
                  { icon: Star, text: "جودة عالية" }
                ].map((badge, idx) => (
                  <motion.div key={idx} variants={fadeIn} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <badge.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-slate-800">{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                variants={fadeIn}
                onClick={scrollToForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white font-bold text-xl py-4 px-12 rounded-xl shadow-[0_10px_30px_rgba(255,107,0,0.3)] transition-all flex items-center justify-center gap-3 mx-auto lg:mx-0 cursor-pointer"
              >
                اطلب الآن
                <ArrowDownCircle className="w-6 h-6 animate-bounce" />
              </motion.button>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
             <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-200 group">
              <Image
                src="/images/living-room.jpeg"
                alt="استخدامات البار التلسكوبي"
                width={1080}
                height={1080}
                priority
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
              
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">التقييمات</p>
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-bold text-slate-800">+10,000 زبون</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      
     

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">هل تواجه هذه <span className="text-red-500">المشاكل؟</span></h2>
            <div className="w-24 h-1.5 bg-red-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: XCircle, title: "لا تريد إتلاف الجدران", desc: "الحفر يترك أثراً سيئاً ويتلف صباغة وتصميم الجدران." },
              { icon: Wrench, title: "تركيب معقد ومكلف", desc: "استدعاء حرفي لتركيب الستائر يكلف وقتاً ومالاً إضافياً." },
              { icon: Clock, title: "تحتاج إلى حل سريع", desc: "تريد تركيب الستائر الآن بدون انتظار أو تجهيزات." },
              { icon: Maximize, title: "فوضى في المساحات", desc: "صعوبة في تنظيم الأغراض في الخزانة أو الحمام." }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeIn}
                className="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:shadow-xl transition-shadow"
              >
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">الحل الأمثل لمنزلك</h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium">
              البار التلسكوبي متعدد الاستخدامات يثبت بسهولة بين الجانبين دون الحاجة لأي أدوات أو براغي، يوفر لك حماية لجدرانك وقوة تحمل استثنائية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* USES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">استخدامات <span className="text-primary">المنتج</span></h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Images for Uses */}
            <motion.div 
              className="w-full lg:w-1/2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/images/usage.jpeg"
                alt="استخدامات متنوعة"
                width={800}
                height={1400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
              
             
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: Maximize, title: "تعليق الستائر", desc: "نوافذ الغرف والصالونات" },
                { icon: Shirt, title: "نشر الملابس", desc: "في الشرفات أو الغرف" },
                { icon: PackageCheck, title: "تنظيم الخزانات", desc: "لتعليق الملابس الإضافية" },
                { icon: Bath, title: "تنظيم المطبخ والحمام", desc: "تعليق المناشف والأدوات" }
              ].map((use, idx) => (
                <motion.div key={idx} variants={fadeIn} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-primary/30 transition-colors">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <use.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{use.title}</h3>
                  <p className="text-slate-500 font-medium">{use.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* INSTALLATION STEPS */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">طريقة التركيب في <span className="text-primary">ثوانٍ</span></h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-slate-600 text-lg">بسيطة جداً ولا تتطلب أي مجهود أو أدوات</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
            {/* Installation Image */}
            <motion.div 
              className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <Image
                  src="/images/installation.jpeg"
                  alt="مخطط طريقة التركيب"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain bg-white group-hover:scale-105 transition-transform duration-500 ease-out"
                />
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { step: "1", title: "افتح البار", desc: "اسحب البار من الطرفين بلطف" },
                { step: "2", title: "عدّل الطول", desc: "اسحب حتى يصل للطول المطلوب" },
                { step: "3", title: "ثبت بإحكام", desc: "قم بتدوير الأطراف للتثبيت القوي" },
                { step: "4", title: "جاهز للاستعمال", desc: "علق ستائرك أو ملابسك فوراً" }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeIn} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:border-primary/20 transition-colors">
                  <div className="w-14 h-14 shrink-0 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-2xl font-black text-primary">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h3>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES LIST */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-12">لماذا يختاره الآلاف؟</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right sm:text-center">
              {[
                "بدون حفر", "بدون أدوات", "قابل للتعديل", "متعدد الاستخدامات",
                "قواعد مانعة للانزلاق", "قوي وثابت", "تصميم أنيق", "سهل التركيب"
              ].map((adv, idx) => (
                <div key={idx} className="flex items-center sm:justify-center gap-3 bg-white/10 p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="font-semibold">{adv}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { icon: Truck, text: "توصيل سريع" },
              { icon: CreditCard, text: "الدفع عند الاستلام" },
              { icon: ShieldCheck, text: "جودة مضمونة" },
              { icon: Headset, text: "خدمة زبناء مميزة" },
              { icon: RefreshCcw, text: "استبدال مجاني" }
            ].map((trust, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-slate-700">
                  <trust.icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-slate-800">{trust.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER & FORM SECTION */}
      <section id="order-form" className="py-20 bg-slate-50 relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            
            {/* Offer Side */}
            <div className="w-full lg:w-2/5 bg-primary text-white p-8 md:p-12 flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20 mix-blend-overlay" />
              
              <div className="relative z-10">
                <div className="inline-block bg-white text-primary font-black px-6 py-2 rounded-full mb-8 text-lg shadow-lg rotate-3">
                  عرض خاص لفترة محدودة
                </div>
                
                <h3 className="text-4xl font-black mb-8">خصم 35%</h3>
                
                <div className="flex flex-col items-center justify-center gap-2 mb-10">
                  <span className="text-white/70 text-xl line-through decoration-red-500 decoration-4">199 درهم</span>
                  <div className="text-6xl font-black flex items-center gap-2 text-gold drop-shadow-md">
                    169 <span className="text-2xl mt-4">درهم فقط</span>
                  </div>
                </div>

                <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium mb-3">ينتهي العرض خلال:</p>
                  <div className="flex justify-center gap-4 text-center" dir="ltr">
                    <div className="bg-white text-primary w-16 py-2 rounded-lg font-black text-2xl shadow-inner">
                      {timeLeft.hours.toString().padStart(2, '0')}
                      <span className="block text-[10px] text-slate-500 font-bold uppercase mt-1">Hours</span>
                    </div>
                    <div className="text-2xl font-black py-2">:</div>
                    <div className="bg-white text-primary w-16 py-2 rounded-lg font-black text-2xl shadow-inner">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                      <span className="block text-[10px] text-slate-500 font-bold uppercase mt-1">Mins</span>
                    </div>
                    <div className="text-2xl font-black py-2">:</div>
                    <div className="bg-white text-primary w-16 py-2 rounded-lg font-black text-2xl shadow-inner">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                      <span className="block text-[10px] text-slate-500 font-bold uppercase mt-1">Secs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-3/5 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-slate-900 mb-3">اطلب الآن</h3>
                <p className="text-slate-500 font-medium">املأ المعلومات التالية وسنتواصل معك لتأكيد الطلب</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل *</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف *</label>
                    <input 
                      type="tel" 
                      required
                      dir="ltr"
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium text-right"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">المدينة *</label>
                      <div className="relative">
                        <select 
                          value={formState.city}
                          onChange={(e) => setFormState({...formState, city: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium appearance-none cursor-pointer"
                        >
                          {cities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">العنوان الكامل *</label>
                      <input 
                        type="text" 
                        required
                        value={formState.address}
                        onChange={(e) => setFormState({...formState, address: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-slate-50 focus:bg-white text-slate-800 font-medium"
                        placeholder="الحي، الشارع، الرقم..."
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xl py-4 rounded-xl shadow-[0_10px_25px_rgba(255,107,0,0.3)] hover:shadow-[0_15px_35px_rgba(255,107,0,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0 mt-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      "تأكيد الطلب"
                    )}
                  </button>

                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-bold text-center mt-3 bg-red-50 p-3 rounded-lg border border-red-100"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                  <p className="text-center text-sm text-slate-500 font-medium mt-4 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    معلوماتك آمنة ولن يتم مشاركتها
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">شكراً لك!</h3>
                  <p className="text-xl text-slate-600 font-medium">تم استلام طلبك بنجاح وسنتواصل معك قريباً لتأكيد الطلب.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-primary font-bold hover:underline"
                  >
                    تقديم طلب آخر
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">الأسئلة الشائعة</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between font-bold text-lg text-slate-800 hover:text-primary transition-colors text-right cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.q}
                  {openFaq === idx ? 
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-slate-600 font-medium leading-relaxed"
                    >
                      <div className="pt-2 border-t border-slate-200">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6 text-slate-500" />
              <span>التوصيل إلى جميع مدن المغرب</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CreditCard className="w-6 h-6 text-slate-500" />
              <span>الدفع عند الاستلام</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Headset className="w-6 h-6 text-slate-500" />
              <span>خدمة العملاء متوفرة 7 أيام في الأسبوع</span>
            </div>
          </div>
          <p>© 2026 جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}
