import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutStyles from '../styles/pages/_AboutPages.module.scss'
import { usePageSeo } from '../hooks/usePageSeo'

gsap.registerPlugin(ScrollTrigger)


const aboutDesc = [
  {
    area: 'intro',
    title: 'Intro',
    text: `
      4년간 웹 퍼블리싱과 프론트엔드 개발 경험을 쌓았습니다.
      Nuxt.js를 활용한 웹 플랫폼을 제작하며
      단순히 화면을 구현하는 것을 넘어, 데이터 구조와 확장 가능한 설계를 고민하게 되었습니다.
    `,
  },
  {
    area: 'how',
    title: 'How I Work',
    text: `
      웹 표준과 접근성을 준수한 시맨틱 마크업을 기반으로,
      반응형/분리형 웹사이트와 크로스 브라우징을 대응합니다.
      컴포넌트 단위로 구조를 분리하고 데이터 흐름을 먼저 설계하여
      유지보수 가능한 코드를 작성합니다.
    `,
  },
  {
    area: 'purpose',
    title: 'Technical Approach',
    text: `
      이 포트폴리오는 데이터 중심 설계를 통해 프로젝트 추가 시
      코드 변경 없이 JSON 데이터만으로 확장 가능하도록 구현했습니다.
      React.js활용해서 실제 서비스처럼 동작하는 구조를 목표로 제작했습니다.
    `,
  },
];

const stackItems = [
  {
    label: 'Data Modeling',
    desc: 'Excel 기반 원천 데이터를 가공하고, projectKey를 기준으로 시트 간 관계를 정의하여 중복 없이 관리 가능한 구조로 설계했습니다.',
  },
  {
    label: 'Data Layer',
    desc: 'UI와 분리된 JSON 기반 데이터 레이어를 구성하여 컴포넌트와 데이터 의존성을 최소화했습니다.',
    subDesc: `정적 JSON 파일을 기반으로 화면과 독립적인 데이터 구조를 설계하여
    유지보수성과 확장성을 고려한 구조로 개선했습니다.`,
  },
  {
    label: 'React (Vite) Migration & Deploy',
    desc: 'Nuxt 기반 프로젝트를 React + Vite 환경으로 마이그레이션했습니다.',
    subDesc: `컴포넌트 구조를 재설계하고 데이터 레이어를 분리하여
    유지보수가 용이한 구조로 개선했습니다.
    이후 빌드 및 정적 배포까지 완료하여 실제 서비스 가능한 형태로 퍼블리싱했습니다.`,
  },
];


export default function AboutPage() {
  const sectionRef = useRef(null)
  const scrollTextRef = useRef(null)
  const endingTextRef = useRef(null)

  usePageSeo({
    title: 'About – Jang Youngha Portfolio',
    description: '장영하의 작업 방식과 기술적 접근 방식을 소개하는 About 페이지입니다.',
  })

  useEffect(() => {
    const section = sectionRef.current
    const scrollText = scrollTextRef.current
    const endingText = endingTextRef.current

    if (!section) return

    const cards = section.querySelectorAll('[data-card="stack"]')
    if (!cards.length) return

    let ctx
    let mobileObserver

    // 모바일: IntersectionObserver
    const initMobileObserver = () => {
      gsap.set(cards, { opacity: 0, y: 40, scale: 1 })

      mobileObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            })

            mobileObserver.unobserve(entry.target)
          })
        },
        {
          threshold: 0.25,
          rootMargin: '0px 0px -10% 0px',
        },
      )

      cards.forEach((card) => mobileObserver.observe(card))
    }

    // 데스크톱: ScrollTrigger + 타임라인
    const initDesktopScroll = () => {
      ctx = gsap.context(() => {
        const cardHeight = cards[0].offsetHeight
        const STACK_GAP = 40
        const totalSteps = cards.length + 1
        const CARD_SCROLL = (cardHeight + STACK_GAP) * totalSteps

        gsap.set(cards, {
          opacity: 0,
          y: (i) => i * STACK_GAP * 3,
          scale: 0.96,
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${CARD_SCROLL}`,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
            markers: false,
            onUpdate(self) {
              if (scrollText) {
                gsap.set(scrollText, { autoAlpha: self.progress > 0.95 ? 0 : 1 })
              }
              if (endingText) {
                gsap.set(endingText, { autoAlpha: self.progress > 0.1 ? 1 : 0 })
              }
            },
          },
        })

        cards.forEach((card, index) => {
          tl.to(card, {
            opacity: 1,
            y: index * STACK_GAP,
            scale: 1,
            ease: 'power2.out',
          })

          if (index > 0) {
            tl.to(
              cards[index - 1],
              {
                scale: 0.9,
                ease: 'power2.out',
              },
              '<',
            )
          }
        })

        tl.to(cards[cards.length - 1], {
          scale: 0.9,
          ease: 'power2.out',
        })
      }, section)

      ScrollTrigger.refresh()
    }

    // matchMedia (데스크톱/모바일 분기)
    const mm = ScrollTrigger.matchMedia({
      '(min-width: 769px)': () => {
        initDesktopScroll()
        return () => {
          if (ctx) {
            ctx.revert()
            ctx = null
          }
        }
      },
      '(max-width: 768px)': () => {
        initMobileObserver()
        return () => {
          if (mobileObserver) {
            mobileObserver.disconnect()
            mobileObserver = null
          }
        }
      },
    })

    return () => {
      if (ctx) ctx.revert()
      if (mobileObserver) mobileObserver.disconnect()
      mm.revert()
    }
  }, [])
  return (
    <>
      <section className={`${aboutStyles.about_wrap}`}>
        <p ref={scrollTextRef} className={`${aboutStyles.scroll_text}`}>Scroll</p>
        {aboutDesc.map((about) => (
          <article
            className={`${aboutStyles.about_article} container ${about.area}`}
            key={about.area}
          >
            <h2>{about.title}</h2>
            <p>{about.text}</p>
          </article>
        ))}
        <article ref={sectionRef} className={`${aboutStyles.portfolio_structure} container`}>
          <div className={aboutStyles.inner}>
            <h2 className={aboutStyles.structure_title}>Portfolio Structure</h2>
            <div className={aboutStyles.stack_diagram}>
              <div className={aboutStyles.stack}>
                {stackItems.map((item, index) => (
                  <div
                    key={index}
                    className={aboutStyles.stack_card}
                    data-card="stack" // GSAP용 선택자
                  >
                    <strong className={aboutStyles.label}>
                      {item.label}
                      {item.api && <span className={aboutStyles.api_badge}>API</span>}
                    </strong>

                    <p className={aboutStyles.desc}>{item.desc}</p>
                    {item.subDesc && <p className={aboutStyles.desc}>{item.subDesc}</p>}
                    <span className={aboutStyles.number}>0{index + 1}</span>

                    {item.code && (
                      <a href={item.code} target="_blank" className={aboutStyles.code_link}>
                        View Code →
                      </a>
                    )}
                    <br />
                    {item.codeAPI && (
                      <a href={item.codeAPI} target="_blank" className={aboutStyles.code_link}>
                        View Code API →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </article>
      </section>
      <section ref={endingTextRef} className={`${aboutStyles.mop_wrap} container`}>
        <p className={aboutStyles.ending_text}>
          이 포트폴리오는 4년간의 실무 경험을 바탕으로 <strong>확장 가능한 데이터 구조와 컴포넌트 기반 설계</strong>를 적용한 작업물입니다.<br /><br />

          React.js를 활용한 사이트 제작 경험을 통해 데이터 흐름과 구조 설계의 중요성을 배웠으며, 이를
          바탕으로 확장 가능한 포트폴리오 시스템을 구축했습니다.<br /><br />

          웹 표준, 접근성, 성능 최적화를 기반으로 실무에서 요구되는 프론트엔드 개발 역량을 갖추고
          있습니다.
        </p>
        <Link to="https://jang0ha.notion.site/5edc3ee7d6194f02a8e9756bf07c0110?source=copy_link" target='_blank' title='프로젝트 노션으로 새창이동' className={`${aboutStyles.btn_more}`}>더 많은 정보 확인하러 가기</Link>
      </section>
    </>
  );
}
