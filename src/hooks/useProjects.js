import projects from '../data/projects'

// 프로젝트 데이터 헬퍼 훅
export function useProjects() {
  // 객체 → 배열
  const allProjects = Object.values(projects)

  // key로 단일 프로젝트 찾기
  const getProject = (key) => allProjects.find((project) => project.key === key)

  // 현재 프로젝트를 제외한 나머지 프로젝트
  const getOtherProjects = (currentKey) =>
    allProjects.filter((project) => project.key !== currentKey)

  return {
    allProjects,
    getProject,
    getOtherProjects,
  }
}