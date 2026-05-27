"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Phone, MessageCircle, Send, Star, Music, MapPin, Sparkles, ShieldCheck, Camera, Waves, X } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <header className="fixed top-0 z-50 w-full bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="section-wrap h-16 flex items-center justify-between">
          <div className="font-heading text-2xl">Яхта Дениса</div>
          <nav className="hidden lg:flex gap-6 text-sm text-textSecondary">{["Преимущества","Сценарии","Тарифы","Отзывы","О Денисе","FAQ","Контакты"].map(i=><a key={i} href={`#${i}`} className="hover:text-gold">{i}</a>)}</nav>
          <div className="hidden md:flex items-center gap-3"><a href="tel:+79218639363"><Phone size={18}/></a><a href="https://wa.me/79218639363"><MessageCircle size={18}/></a><a href="https://t.me/"><Send size={18}/></a></div>
          <button className="lg:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
        </div>
        {open && <div className="lg:hidden glass mx-4 mb-3 rounded-xl p-4 space-y-3">{["Преимущества","Сценарии","Тарифы","Отзывы","О Денисе","FAQ","Контакты"].map(i=><a onClick={()=>setOpen(false)} key={i} href={`#${i}`} className="block">{i}</a>)}</div>}
      </header>

      <section className="relative min-h-screen flex items-end pt-20">
        <Image src="/Vesta_yaht_spb_neva_8.jpg" alt="Яхта" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.45) 35%,rgba(0,0,0,.78) 100%)"}}/>
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="section-wrap relative pb-20">
          <p className="text-gold tracking-[0.2em] text-xs mb-4">ПРЕМИАЛЬНЫЕ ПРОГУЛКИ НА ЯХТЕ</p>
          <h1 className="font-heading text-6xl md:text-8xl">Яхта Дениса</h1>
          <p className="text-textSecondary max-w-xl mt-4">Для отдыха, романтики и особенных встреч на воде в Санкт-Петербурге</p>
        </motion.div>
      </section>

      <section id="Преимущества" className="py-20 section-wrap"><SectionTitle title="Почему гости возвращаются снова"/><div className="grid md:grid-cols-3 gap-4">{[{icon: Music, text:"Премиальная музыка"},{icon:MapPin,text:"Лучшие виды города"},{icon:Waves,text:"Всё для отдыха"},{icon:Sparkles,text:"Атмосфера luxury"},{icon:ShieldCheck,text:"Опытный капитан"},{icon:Camera,text:"Идеально для контента"}].map(({icon: Icon,text})=><motion.div whileHover={{scale:1.02}} key={text} className="glass rounded-2xl p-6"><Icon className="text-gold mb-3"/><p>{text}</p></motion.div>)}</div></section>

      <section className="section-wrap py-10"><SectionTitle title="Атмосфера, ради которой стоит выйти в море"/><div className="columns-1 md:columns-2 gap-4 space-y-4">{[5,7,3,13].map(n=><div className="relative h-72 md:h-96 overflow-hidden rounded-2xl" key={n}><Image src={`/Vesta_yaht_spb_neva_${n}.jpg`} alt="галерея" fill className="object-cover hover:scale-105 transition duration-500"/></div>)}</div></section>

      <section id="Сценарии" className="section-wrap py-20"><SectionTitle title="Яхта под любой сценарий отдыха"/><div className="grid md:grid-cols-3 gap-4">{[{t:"Романтические свидания",i:14},{t:"Дни рождения",i:15},{t:"Девичники и вечеринки",i:16},{t:"Контент и съёмки",i:5},{t:"Семейные прогулки",i:11},{t:"Бизнес-встречи",i:13}].map(c=><div key={c.t} className="relative h-72 rounded-2xl overflow-hidden group"><Image src={`/Vesta_yaht_spb_neva_${c.i}.jpg`} alt={c.t} fill className="object-cover group-hover:scale-105 transition"/><div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition"/><p className="absolute bottom-4 left-4 font-heading text-2xl">{c.t}</p></div>)}</div></section>

      <section id="Тарифы" className="section-wrap py-20"><SectionTitle title="Тарифы"/><div className="grid md:grid-cols-3 gap-4">{[{t:"MINI",p:"от 12 000 ₽",i:2,f:["1 час","капитан","музыка","до 6 гостей"]},{t:"SUNSET",p:"от 25 000 ₽",i:8,f:["развод мостов","пледы","шампанское"]},{t:"PREMIUM NIGHT",p:"от 45 000 ₽",i:9,f:["вечерняя прогулка","музыка","бар"]}].map(c=><div key={c.t} className="glass border border-gold/40 rounded-2xl overflow-hidden"><div className="relative h-44"><Image src={`/Vesta_yaht_spb_neva_${c.i}.jpg`} alt={c.t} fill className="object-cover"/></div><div className="p-5"><h3>{c.t}</h3><ul className="text-textSecondary text-sm my-3">{c.f.map(x=><li key={x}>• {x}</li>)}</ul><p className="text-gold">{c.p}</p></div></div>)}</div></section>

      <section id="Отзывы" className="section-wrap py-16"><SectionTitle title="Отзывы"/><div className="grid md:grid-cols-3 gap-4">{["Анастасия","Игорь","Мария"].map(n=><div key={n} className="glass rounded-2xl p-6"><div className="flex gap-1 text-gold">{Array.from({length:5}).map((_,i)=><Star key={i} size={16} fill="currentColor"/>)}</div><p className="mt-3 text-textSecondary">Невероятная атмосфера, сервис и красивые маршруты. Вернёмся снова.</p><p className="mt-3">{n}</p></div>)}</div></section>

      <section id="О Денисе" className="section-wrap py-16 grid md:grid-cols-2 gap-8 items-center"><div className="relative h-96 rounded-2xl overflow-hidden"><Image src="/Vesta_yaht_spb_neva_17.jpg" alt="Денис" fill className="object-cover"/></div><div><SectionTitle title="О Денисе"/><p className="text-textSecondary whitespace-pre-line">Меня зовут Денис.

Я создал этот сервис, потому что сам люблю атмосферу воды, вечернего города и спокойного отдыха без суеты.

Для меня важно, чтобы каждая прогулка была не просто арендой яхты, а настоящим впечатлением, которое хочется повторить.

Поэтому мы уделяем внимание атмосфере, маршрутам, сервису и деталям.

Большинство гостей приходят к нам снова или рекомендуют друзьям.</p><p className="font-heading text-3xl mt-4">Денис</p></div></section>

      <section id="FAQ" className="section-wrap py-16"><SectionTitle title="FAQ"/><div className="space-y-3">{["Можно со своей едой?","Есть ли туалет?","Что если плохая погода?","Можно включать свою музыку?","Есть ли капитан?"].map(q=><details key={q} className="glass rounded-xl p-4"><summary className="cursor-pointer">{q}</summary><p className="mt-2 text-textSecondary">Да, детали согласуем перед прогулкой.</p></details>)}</div></section>

      <section id="Контакты" className="relative py-20"><Image src="/Vesta_yaht_spb_neva_18.jpg" alt="cta" fill className="object-cover"/><div className="absolute inset-0 bg-black/65"/><div className="section-wrap relative"><SectionTitle title="Забронируйте свою прогулку уже сегодня"/><form onSubmit={(e)=>{e.preventDefault();alert("Спасибо! Мы свяжемся с вами.");}} className="grid md:grid-cols-4 gap-3"><input className="glass rounded-xl p-3" placeholder="Имя" required/><input className="glass rounded-xl p-3" placeholder="Телефон" required/><input type="date" className="glass rounded-xl p-3" required/><input type="number" min={1} max={10} className="glass rounded-xl p-3" placeholder="Гостей" required/><button className="md:col-span-4 gold-gradient text-black rounded-xl p-3 font-semibold">Забронировать яхту</button></form></div></section>
      <a href="https://wa.me/79218639363" className="fixed bottom-4 left-4 right-4 z-40 md:hidden gold-gradient text-black text-center py-3 rounded-xl font-semibold">Забронировать</a>
      <footer className="border-t border-white/10 py-8"><div className="section-wrap flex flex-col md:flex-row justify-between gap-4"><p className="font-heading text-2xl">Яхта Дениса</p><div className="text-textSecondary"><p>+7 (921) 863-93-63</p><p><a href="https://wa.me/79218639363">WhatsApp</a> · <a href="https://t.me/">Telegram</a></p></div></div></footer>
    </main>
  );
}
