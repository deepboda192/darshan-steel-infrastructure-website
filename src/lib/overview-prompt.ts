/**
 * The prompt an administrator pastes into an AI assistant to draft a
 * project overview. Built from the editor's fields so the facts are exact
 * and the assistant is told not to invent any others.
 */
export type OverviewBrief = {
  name: string
  buildingType: string
  location: string
  area: string
}

const clean = (value: string) => value.replace(/\s+/g, ' ').trim()

export function overviewPrompt(brief: OverviewBrief): string {
  const facts = [
    `- Client / project name: ${clean(brief.name) || '[PROJECT NAME]'}`,
    `- Building type: ${clean(brief.buildingType) || '[BUILDING TYPE]'}`,
    `- Location: ${clean(brief.location) || '[LOCATION]'}`,
    `- Built-up area: ${clean(brief.area) || '[BUILT-UP AREA]'}`,
  ].join('\n')

  return `You write the short overview shown on a project page of Darshan Steel Infrastructure (DSI), a pre-engineered steel building (PEB) company in Rajkot, Gujarat, India. DSI designs, fabricates and erects the steel structure; the client named below is the company the building was built for.

Project facts (use only these figures):
${facts}

First, search the web for the client and find out what the company does. If you cannot identify the company with confidence, describe the building without describing the client's business.

Then write one paragraph of two or three sentences, 45 to 70 words, in plain British English, third person, sentence case. Say what the client does, then what DSI delivered: the building type, the location and the built-up area exactly as given. No headings, bullet points, quotation marks, exclamation marks or marketing superlatives. Do not invent spans, tonnages, dates, budgets or programme durations.

Return only the paragraph.`
}
