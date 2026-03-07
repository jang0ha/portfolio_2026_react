import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
//import { useProjects } from '../hooks/useProjects'
import projectStyles from '../styles/pages/_ProjectDetailPage.module.scss'
import { useResponsiveImage } from '../hooks/useResponsiveImage'
import { useLoading } from '../hooks/useLoading'
import WithLoading from '../components/WithLoading'
import { usePageSeo } from '../hooks/usePageSeo'
import axios from 'axios'

export default function ProjectDetailPage() {
  const { key } = useParams() // URL의 :key
  //const { getProject, getOtherProjects } = useProjects()
  //const project = getProject(key)
  //const otherProjects = getOtherProjects(key)
  //
  //console.log(project);
  //console.log(key);
  //
  const [isOpened, setIsOpened] = useState(false) //더보기 토글 함수
  const btnMoreToggle = () => setIsOpened((prev) => !prev)
  //
  //if (!project) return <div>Project not found</div>;// data/projects.js 에서 해당 프로젝트 찾기

  const [projectKey, setProjectKey] = useState({
    key: '',
    sort: '',
    title: '',
    summary: [],
    tasks: [],
    links: [],
    images: [],
    configurations: [],
  })
  usePageSeo({
    title: `${projectKey.title} – Project | Jang Youngha`,
    description: `${projectKey.sort} ${projectKey.title} 프로젝트 상세 페이지입니다.`,
  })

  const [allProjects, setAllProjects] = useState([])
  const { isLoading, setLoaded } = useLoading(key)
  const otherProjects = allProjects.filter((p) => p.project_key !== key)
  const { image } = useResponsiveImage(projectKey?.images) //이미지 가져오기(반응형)

  // 전체 프로젝트 목록은 최초 1번만 가져오기
  useEffect(() => {
    axios
      .get('/api/projects')
      .then((response) => setAllProjects(response.data))
      .catch((error) => console.log('Error fetching projects:', error))
  }, [])

  // 현재 프로젝트 데이터는 key 변경 시마다 가져오기
  useEffect(() => {
    axios
      .get(`/api/projects/${key}`)
      .then((response) => {
        setProjectKey(response.data)
        setIsOpened(false)
        setLoaded()
      })
      .catch((error) => console.log('Error fetching data:', error))
  }, [key, setLoaded])

  return (
    <WithLoading isLoading={isLoading}>
    <section className={`${projectStyles.project_wrap}`}>
      {/* 프로젝트 분류 */}
      <article className={`${projectStyles.project_sort} container`}>
        <div className={`${projectStyles.sort}`}>{projectKey.sort}</div>
        <h2 className={`${projectStyles.name}`}>{projectKey.title}</h2>
        <div className={`${projectStyles.project_links}`}>
          {projectKey.links.map((link, idx) => (
            <a
              className={`${projectStyles.links}`}
              key={idx}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              title={`${projectKey.title} ${link.label} 새창 이동`}
            >
              @{link.label}
            </a>
          ))}
        </div>
      </article>

      {/* 프로젝트 정보  */}
      <article className={`${projectStyles.project_information} container`}>
        <ul className={`${projectStyles.task_list}`}>
          {projectKey.tasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>

        <div className={`${projectStyles.project_description_wrap}`}>
          <button
            type='button'
            className={`${projectStyles.btn_more} ${isOpened ? `${projectStyles.is_opened}` : ''}`}
            onClick={btnMoreToggle}
          >
            {isOpened ? 'Project Detail' : 'Show more Information'}
          </button>

          <table className={`${projectStyles.project_description}`}>
            <caption>{projectKey.title}프로젝트 설명</caption>
            <colgroup>
              <col width='20%' />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope='col'>구분</th>
                <th scope='col'>내용</th>
              </tr>
            </thead>
            <tbody>
              {/* 요약 */}
              <tr>
                <th scope='row'>유형</th>
                <td>{projectKey.summary[0]?.type}</td>
              </tr>
              <tr>
                <th scope='row'>투입인원</th>
                <td>{projectKey.summary[0]?.people}</td>
              </tr>
              <tr>
                <th scope='row'>전체 기여도</th>
                <td>{projectKey.summary[0]?.contribution}</td>
              </tr>
              <tr>
                <th scope='row'>환경 및 기술</th>
                <td>{projectKey.summary[0]?.tech}</td>
              </tr>
              <tr>
                <th scope='row'>언어</th>
                <td>{projectKey.summary[0]?.language}</td>
              </tr>
              <tr>
                <th scope='row'>기간</th>
                <td>{projectKey.summary[0]?.period}</td>
              </tr>
              <tr>
                <th scope='row'>구성</th>
                <td>
                  {/* 담당업무 */}
                  <ul className={`${projectStyles.task_list}`}>
                    {projectKey.configurations.map((config) => (
                      <li key={config.label}>
                        <div className={`${projectStyles.sort}`}>
                          {config.label}
                        </div>
                        {config.description && (
                          <span style={{ whiteSpace: 'pre-line' }}>
                            {config.description}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      {/* 이미지 */}
      {image && (
        <article className={projectStyles.project_images}>
          <img
            src={image.src}
            alt={image.alt}
            className={projectStyles.project_img}
          />
        </article>
      )}

      {/* 현재 페이지 외 나머지 프로젝트 네비게이션 */}
      <nav className={`${projectStyles.nav_others_wrap} container`}>
        <h3 className={`${projectStyles.nav_title}`}>Other Projects</h3>
        <ul className={`${projectStyles.project_list}`}>
          {otherProjects.map((others) => (
            <li key={others.project_key}>
              <Link
                to={`/project/${others.project_key}`}
                title={`${others.title} 페이지로 이동`}
              >
                <span className={`${projectStyles.sort}`}>{others.sort}</span>
                <strong className={`${projectStyles.title}`}>
                  {others.title}
                </strong>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
    </WithLoading>
  )
}
