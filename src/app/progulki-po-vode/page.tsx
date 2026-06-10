"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Anchor,
  CalendarDays,
  Camera,
  Check,
  Clock,
  Compass,
  MessageCircle,
  Phone,
  Sailboat,
  Send,
  ShipWheel,
  Users,
  Waves,
} from "lucide-react";

const phone = "+7 (921) 863-93-63";
const phoneHref = "tel:+79218639363";
const whatsappHref = "https://wa.me/79218639363";
const telegramHref = "https://t.me/";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const fleet = [
  {
    name: "Парусная яхта",
    label: "для залива и тишины",
    image: "/progulki-po-vode/sailing-main.jpg",
    gallery: ["/progulki-po-vode/sailing-1.jpg", "/progulki-po-vode/sailing-2.jpg"],
    capacity: "до 6 гостей",
    route: "Финский залив, Нева",
    mood: "ветер, закат, камерная прогулка",
    description:
      "Выбор для тех, кто хочет почувствовать Петербург не только как город на воде, но и как выход к морю: мягкий темп, парусная атмосфера и красивые кадры на фоне залива.",
  },
  {
    name: "Royal Crown",
    label: "для праздника на воде",
    image: "/progulki-po-vode/royal-crown-main.jpg",
    gallery: ["/progulki-po-vode/royal-crown-1.jpg", "/progulki-po-vode/royal-crown-2.jpg"],
    capacity: "до 10 гостей",
    route: "Нева, центр, залив",
    mood: "статусно, просторно, торжественно",
    description:
      "Моторная яхта для дня рождения, встречи с гостями, вечернего маршрута и прогулки с ощущением полноценного события, а не просто трансфера по воде.",
  },
  {
    name: "Dominator 68",
    label: "премиальная моторная яхта",
    image: "/progulki-po-vode/dominator-main.png",
    gallery: ["/progulki-po-vode/dominator-1.png", "/progulki-po-vode/dominator-2.png"],
    capacity: "до 12 гостей",
    route: "Нева, Финский залив",
    mood: "комфорт, приватность, большая палуба",
    description:
      "Формат для премиальной прогулки, деловой встречи или особого вечера: больше пространства, уверенный ход и несколько зон для отдыха гостей.",
  },
  {
    name: "Monte-Carlo Sealine F43",
    label: "катер для города и каналов",
    image: "/progulki-po-vode/sealine-main.png",
    gallery: [
      "/progulki-po-vode/sealine-1.png",
      "/progulki-po-vode/sealine-2.png",
    ],
    capacity: "до 8 гостей",
    route: "реки, каналы, центр",
    mood: "динамично, близко к городу, удобно",
    description:
      "Хороший вариант для маршрутов по рекам и каналам Санкт-Петербурга, фотопрогулки, короткой встречи или спокойного выхода по центральной акватории.",
  },
];

const routes = [
  {
    title: "Реки и каналы",
    text: "Камерный маршрут через исторический центр, набережные, мосты и узнаваемые перспективы Петербурга.",
    icon: Anchor,
  },
  {
    title: "Парадная Нева",
    text: "Широкая вода, Эрмитаж, Петропавловская крепость, стрелка Васильевского острова и вечерний город.",
    icon: Waves,
  },
  {
    title: "Финский залив",
    text: "Больше воздуха, горизонта и приватности: особенно хорошо для парусной яхты и длинных прогулок.",
    icon: Compass,
  },
];

export default function WaterTripsPage() {
  return (
    <main className="min-h-screen bg-[#071111] text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/25 backdrop-blur-md">
        <div className="section-wrap flex h-16 items-center justify-between">
          <a href="#top" className="font-heading text-xl md:text-2xl">
            Прогулки на яхтах СПб
          </a>
          <nav className="hidden items-center gap-6 text-sm text-textSecondary lg:flex">
            <a className="hover:text-gold" href="#fleet">Флот</a>
            <a className="hover:text-gold" href="#routes">Маршруты</a>
            <a className="hover:text-gold" href="#format">Формат</a>
            <a className="hover:text-gold" href="#contacts">Контакты</a>
          </nav>
          <div className="flex items-center gap-3">
            <a className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-textSecondary transition hover:border-gold hover:text-gold md:inline-flex" href={phoneHref}>
              {phone}
            </a>
            <a className="grid h-10 w-10 place-items-center rounded-full bg-gold text-black" href={whatsappHref} aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative flex min-h-screen items-end overflow-hidden pt-20">
        <Image src="/progulki-po-vode/hero-zaliv.jpg" alt="Прогулка на яхте по воде Санкт-Петербурга" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,15,.9),rgba(5,13,15,.62)_45%,rgba(5,13,15,.2)),linear-gradient(180deg,rgba(5,13,15,.25),rgba(5,13,15,.9))]" />
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="section-wrap relative pb-16 md:pb-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">реки, каналы и Финский залив</p>
          <h1 className="max-w-5xl font-heading text-5xl leading-none md:text-8xl">
            Прогулки на яхтах и катерах по Санкт-Петербургу
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-textSecondary md:text-xl">
            Подберите судно под прогулку вдвоем, праздник, фотосъемку или деловую встречу: парусная яхта, Royal Crown, Dominator 68 и Monte-Carlo Sealine F43.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="gold-gradient rounded-xl px-5 py-3 font-semibold text-black" href="#fleet">Выбрать судно</a>
            <a className="glass rounded-xl px-5 py-3 font-semibold" href={whatsappHref}>Написать в WhatsApp</a>
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              [ShipWheel, "4 судна", "под разные сценарии"],
              [Clock, "от 1 часа", "короткие и длинные маршруты"],
              [Camera, "центр и залив", "виды для фото и видео"],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="glass rounded-xl p-4">
                <Icon className="mb-3 text-gold" size={22} />
                <p className="font-semibold">{String(title)}</p>
                <p className="text-sm text-textSecondary">{String(text)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="fleet" className="section-wrap py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">флот</p>
          <h2 className="font-heading text-4xl md:text-6xl">Четыре варианта транспорта для прогулки</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {fleet.map((boat) => (
            <article key={boat.name} className="glass overflow-hidden rounded-2xl">
              <div className="relative h-72 md:h-96">
                <Image src={boat.image} alt={boat.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">{boat.label}</p>
                  <h3 className="font-heading text-4xl">{boat.name}</h3>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="mb-5 grid grid-cols-1 gap-3 text-sm text-textSecondary sm:grid-cols-3">
                  <span className="rounded-xl bg-white/5 p-3"><Users className="mb-2 text-gold" size={18} />{boat.capacity}</span>
                  <span className="rounded-xl bg-white/5 p-3"><Compass className="mb-2 text-gold" size={18} />{boat.route}</span>
                  <span className="rounded-xl bg-white/5 p-3"><Sailboat className="mb-2 text-gold" size={18} />{boat.mood}</span>
                </div>
                <p className="text-textSecondary">{boat.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {boat.gallery.map((image) => (
                    <div key={image} className="relative h-32 overflow-hidden rounded-xl md:h-40">
                      <Image src={image} alt={`${boat.name}: фото`} fill className="object-cover transition duration-500 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="routes" className="bg-white/[0.03] py-20">
        <div className="section-wrap">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">маршруты</p>
            <h2 className="font-heading text-4xl md:text-6xl">Собираем прогулку под ваш повод</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {routes.map(({ title, text, icon: Icon }) => (
              <article key={title} className="glass rounded-2xl p-6">
                <Icon className="mb-12 text-gold" size={28} />
                <h3 className="mb-3 font-heading text-3xl">{title}</h3>
                <p className="text-textSecondary">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="format" className="section-wrap grid gap-10 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">как это работает</p>
          <h2 className="font-heading text-4xl md:text-6xl">Вы говорите дату, гостей и желаемое настроение</h2>
          <p className="mt-5 text-textSecondary">
            Мы предложим подходящее судно, маршрут и длительность. Можно сделать спокойную прогулку, праздник с музыкой, фотосъемку, вечерний выход или маршрут по заливу.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Подберем судно под количество гостей и маршрут",
            "Согласуем старт, длительность и дополнительные пожелания",
            "Оставим тот же контакт для заявки, что и в основном лендинге",
          ].map((text) => (
            <div key={text} className="glass flex items-start gap-3 rounded-2xl p-5">
              <Check className="mt-1 shrink-0 text-gold" size={20} />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contacts" className="relative py-20">
        <Image src="/progulki-po-vode/contact-kater.jpg" alt="Катер на воде" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="section-wrap relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">контакты</p>
            <h2 className="font-heading text-4xl md:text-6xl">Напишите, и мы соберем предложение</h2>
            <p className="mt-5 text-textSecondary">
              Сообщите дату, количество гостей, желаемый маршрут и судно. Ответим в том же контактном канале, который уже используется на основном лендинге.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 md:p-6">
            <div className="grid gap-3 md:grid-cols-3">
              <a className="rounded-xl bg-white/10 p-4 transition hover:bg-white/15" href={phoneHref}>
                <Phone className="mb-4 text-gold" />
                <p className="font-semibold">Позвонить</p>
                <p className="text-sm text-textSecondary">{phone}</p>
              </a>
              <a className="rounded-xl bg-white/10 p-4 transition hover:bg-white/15" href={whatsappHref}>
                <MessageCircle className="mb-4 text-gold" />
                <p className="font-semibold">WhatsApp</p>
                <p className="text-sm text-textSecondary">быстрая заявка</p>
              </a>
              <a className="rounded-xl bg-white/10 p-4 transition hover:bg-white/15" href={telegramHref}>
                <Send className="mb-4 text-gold" />
                <p className="font-semibold">Telegram</p>
                <p className="text-sm text-textSecondary">написать в чат</p>
              </a>
            </div>
            <a className="gold-gradient mt-4 flex items-center justify-center gap-2 rounded-xl p-4 font-semibold text-black" href={whatsappHref}>
              <CalendarDays size={18} /> Забронировать прогулку
            </a>
          </div>
        </div>
      </section>

      <a href={whatsappHref} className="gold-gradient fixed bottom-4 left-4 right-4 z-40 rounded-xl py-3 text-center font-semibold text-black md:hidden">
        Забронировать прогулку
      </a>
    </main>
  );
}



