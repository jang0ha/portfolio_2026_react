import projects from './raw/projects.json';
import links from './raw/links.json';
import tasks from './raw/tasks.json';
import summary from './raw/summary.json';
import configuration from './raw/configuration.json';
import images from './raw/images.json';

const result = {};

// 기본
projects.forEach((project) => {
  result[project.projectKey] = {
    key: project.projectKey,
    sort: project.sort,
    title: project.title,
    links: [],
    tasks: [],
    summary: {},
    configuration: [],
    images: {},
  };
});
// 링크 links
links.forEach((link) => {
  result[link.projectKey]?.links.push({
    label: link.label,
    url: link.url,
  });
});

// 업무 기술 tasks
tasks.forEach((task) => {
  result[task.projectKey]?.tasks.push(task.text);
});

// 요약 summary
summary.forEach((summarytext) => {
  result[summarytext.projectKey].summary = {
    type: summarytext.type,
    people: summarytext.people,
    contribution: summarytext.contribution,
    tech: summarytext.tech,
    language: summarytext.language,
    period: summarytext.period,
  };
});

// 담당 업무 configuration
configuration.forEach((configtext) => {
  result[configtext.projectKey]?.configuration.push({
    label: configtext.label,
    description: configtext.description || '',
  });
});

// 이미지 images
images.forEach((img) => {
  result[img.projectKey].images[img.device] = {
    src: img.src,
    alt: img.alt,
  };
});

export default result;
