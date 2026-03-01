import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import '../styles/pages/_HomePages.scss'

const slides = [
  { title: 'Think.', desc: 'Think in Structure' },
  { title: 'Search.', desc: 'Search for Better Markup' },
  { title: 'Calculate.', desc: 'Calculate UI Behavior' },
  { title: 'Communicate.', desc: 'Communicate with Purpose' },
  { title: 'Solved.', desc: 'Ship a Stable Interface' },
];

export default function HomePage() {
  return (
    <div className="index_wrap">
      <section className="inform_wrap container">
        <a
          href="https://github.com/jang0ha"
          target="_blank"
          rel="noopener noreferrer"
          title="깃허브로 새창이동"
        >
          https://github.com/jang0ha
        </a>
      </section>
      <section className="hero_wrap container">
        <h2 className="main_title">Portfolio.</h2>
        <article className="hero_swiper_wrap">
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            speed={1500}
            autoplay={{ delay: 2500 }}
            spaceBetween={0}
            slidesPerView={1}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx} className="swiper-slide">
                <h3 className="hero_title">{slide.title}</h3>
                <p className="hero_desc">{slide.desc}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      </section>
      <section className='project_wrap container'>
            <ul className="project_list">
              <li className="project_sort">
                <Routes>
                  <Route path=""></Route>
                </Routes>
              </li>
            </ul>
      </section>
    </div>
  );
}
