import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import homeStyles from '../styles/pages/_HomePages.module.scss'
import { usePageSeo } from '../hooks/usePageSeo'
import { useLoading } from '../hooks/useLoading'
import WithLoading from '../components/WithLoading'

import axios from 'axios'
//import { getProject } from "./api"
//import { useProjects } from '../hooks/useProjects'

const slides = [
  { title: 'Think.', desc: 'Think in Structure' },
  { title: 'Search.', desc: 'Search for Better Markup' },
  { title: 'Calculate.', desc: 'Calculate UI Behavior' },
  { title: 'Communicate.', desc: 'Communicate with Purpose' },
  { title: 'Solved.', desc: 'Ship a Stable Interface' },
]

export default function HomePage() {
  //const { allProjects } = useProjects()
  //const groupedProjects = allProjects.reduce((acc, project) => {
  //  if (!acc[project.sort]) acc[project.sort] = []
  //  acc[project.sort].push(project)
  //  return acc
  //}, {})
  //
  //console.log(groupedProjects);

  const [projects, setProjects] = useState([])
  const { isLoading, setLoaded } = useLoading('projects')
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects')
        setProjects(response.data)
        setLoaded()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchProjects()
  }, [setLoaded])

  usePageSeo({
    title: 'Home – Jang Youngha Portfolio',
    description:
      '포트폴리오 메인 페이지입니다. 프로젝트와 데이터 중심 설계 구조를 한 눈에 볼 수 있습니다.',
  })
  return (
    <WithLoading isLoading={isLoading}>
      <div className={homeStyles.index_wrap}>
        <section className={`${homeStyles.inform_wrap} container`}>
          <a
            href='https://github.com/jang0ha'
            target='_blank'
            rel='noopener noreferrer'
            title='깃허브로 새창이동'
          >
            https://github.com/jang0ha
          </a>
        </section>
        <section className={`${homeStyles.hero_wrap} container`}>
          <h2 className={homeStyles.main_title}>Portfolio.</h2>
          <article className={homeStyles.hero_swiper_wrap}>
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect='fade'
              fadeEffect={{ crossFade: true }}
              loop={true}
              speed={1500}
              autoplay={{ delay: 2500 }}
              spaceBetween={0}
              slidesPerView={1}
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx} className='swiper-slide'>
                  <h3 className={homeStyles.hero_title}>{slide.title}</h3>
                  <p className={homeStyles.hero_desc}>{slide.desc}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
        </section>
        <section className={`${homeStyles.project_wrap} container`}>
          <ul className={`${homeStyles.project_list}`}>
            {projects.map((project) => (
              <li
                key={project.project_key}
                className={`${homeStyles.project_sort}`}
              >
                <span>{project.sort}</span>
                <div className={`${homeStyles.projects}`}>
                  <Link
                    key={project.project_key}
                    to={`/project/${project.project_key}`}
                    className={`${homeStyles.project_link}`}
                  >
                    {project.title}
                  </Link>
                </div>
              </li>
            ))}
            {/* {Object.entries(projectList).map((project, key) => (
            <li key={key} className={`${homeStyles.project_sort}`}>
              <span>{project.sort}</span>
              <div className={`${homeStyles.projects}`}>
                {list.map((project) => (
                  <Link
                    key={project.key}
                    to={`/project/${project.key}`}
                    className={`${homeStyles.project_link}`}
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            </li>
          ))} */}
          </ul>
        </section>
      </div>
    </WithLoading>
  )
}
