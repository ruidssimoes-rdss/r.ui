'use client';

import { useLint } from './LintContext';
import { IssuesTab } from './IssuesTab';
import { RulesTab } from './RulesTab';
import { LearnTab } from './LearnTab';
import { ShareTab } from './ShareTab';

export function LintTabContent() {
  const { activeTab } = useLint();

  switch (activeTab) {
    case 'issues':
      return <IssuesTab />;
    case 'rules':
      return <RulesTab />;
    case 'learn':
      return <LearnTab />;
    case 'share':
      return <ShareTab />;
    default:
      return null;
  }
}
