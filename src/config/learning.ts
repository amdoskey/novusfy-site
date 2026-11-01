/**
 * Learning interest form options. The keys are what the form submits and what
 * /contact/send accepts (allow-list); `cat` points at the matching
 * learning.cat{n}Title message so the labels stay in one place.
 */
export const LEARNING_TOPICS = [
  { key: 'ai-automation', cat: 1 },
  { key: 'websites-apps', cat: 2 },
  { key: 'paid-ads', cat: 3 },
  { key: 'seo', cat: 4 },
  { key: 'marketing-strategy', cat: 5 },
  { key: 'playbooks', cat: 6 },
  { key: 'other', cat: null },
] as const

export const LEARNING_FORMATS = ['coaching', 'workshop', 'course'] as const

export type LearningTopic = (typeof LEARNING_TOPICS)[number]['key']
export type LearningFormat = (typeof LEARNING_FORMATS)[number]
