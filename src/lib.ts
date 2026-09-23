import { getCollection } from 'astro:content';

export async function getQuestions() {
  return (await getCollection('questions')).sort((a, b) => a.data.title.localeCompare(b.data.title));
}
export async function getLearn() {
  return (await getCollection('learn')).sort((a, b) => a.data.order - b.data.order);
}
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
export function breadcrumbLd(site: URL, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: new URL(it.path, site).href })),
  };
}
export function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
