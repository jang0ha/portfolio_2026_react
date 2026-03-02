import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useProjects } from '../hooks/useProjects'
import projectStyles from '../styles/pages/_ProjectDetailPage.module.scss'
import { useResponsiveImage } from '../hooks/useResponsiveImage'
import { usePageSeo } from '../hooks/usePageSeo'


export default function ProjectDetailPage() {
	const { key } = useParams();          // URL의 :key
	const { getProject, getOtherProjects } = useProjects()
	const project = getProject(key)
	const otherProjects = getOtherProjects(key)

	console.log(project);
	console.log(key);

	const [isOpened, setIsOpened] = useState(false) //더보기 토글 함수
	const btnMoreToggle = () => setIsOpened((prev) => !prev)

	if (!project) return <div>Project not found</div>;// data/projects.js 에서 해당 프로젝트 찾기

	const { image } = useResponsiveImage(project?.images) //이미지 가져오기(반응형)

	usePageSeo({
		title: `${project.title} – Project | Jang Youngha`,
		description: `${project.sort} ${project.title} 프로젝트 상세 페이지입니다.`,
	})
	return (
		<section className={`${projectStyles.project_wrap}`}>
			{/* 프로젝트 분류 */}
			<article className={`${projectStyles.project_sort} container`}>
				<div className={`${projectStyles.sort}`}>{project.sort}</div>
				<h2 className={`${projectStyles.name}`}>{project.title}</h2>
				<div className={`${projectStyles.project_links}`}>
					{project.links.map((link, idx) => (
						<a className={`${projectStyles.links}`} key={idx} href={link.url} target="_blank" rel="noopener noreferrer" title={`${project.title} ${link.label} 새창 이동`}>
							@{link.label}
						</a>
					))}
				</div>
			</article>

			{/* 프로젝트 정보  */}
			<article className={`${projectStyles.project_information} container`}>
				<ul className={`${projectStyles.task_list}`}>
					{project.tasks.map((task) => (
						<li key={task}>
							{task}
						</li>
					))}
				</ul>

				<div className={`${projectStyles.project_description_wrap}`}>
					<button
						type="button"
						className={`${projectStyles.btn_more} ${isOpened ? `${projectStyles.is_opened}` : ''}`}
						onClick={btnMoreToggle}
					>
						{isOpened ? 'Project Detail' : 'Show more Information'}
					</button>

					<table className={`${projectStyles.project_description}`}>
						<caption>
							{project.title}프로젝트 설명
						</caption>
						<colgroup>
							<col width="20%" />
							<col />
						</colgroup>
						<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">내용</th>
							</tr>
						</thead>
						<tbody>
							{/* 요약 */}
							<tr>
								<th scope="row">유형</th>
								<td>{project.summary.type}</td>
							</tr>
							<tr>
								<th scope="row">투입인원</th>
								<td>{project.summary.people}</td>
							</tr>
							<tr>
								<th scope="row">전체 기여도</th>
								<td>{project.summary.contribution}</td>
							</tr>
							<tr>
								<th scope="row">환경 및 기술</th>
								<td>{project.summary.tech}</td>
							</tr>
							<tr>
								<th scope="row">언어</th>
								<td>{project.summary.language}</td>
							</tr>
							<tr>
								<th scope="row">기간</th>
								<td>{project.summary.period}</td>
							</tr>
							<tr>
								<th scope="row">구성</th>
								<td>
									{/* 담당업무 */}
									<ul className={`${projectStyles.task_list}`}>
										{project.configuration.map((config) => (
											<li key={config.label}>
												<div className={`${projectStyles.sort}`}>{config.label}</div>
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
					{otherProjects.map(others => (
						<li key={others}>
							<Link
								key={others.key}
								to={`/project/${others.key}`}
								title={`${others.title} 페이지로 이동`}
							>
								<span className={`${projectStyles.sort}`}>{others.sort}</span>
								<strong className={`${projectStyles.title}`}>{others.title}</strong>
							</Link>
						</li>
					))}
				</ul>
			</nav>

		</section >
	);
}
