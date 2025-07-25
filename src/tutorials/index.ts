import { lte, major, minor, patch, prerelease, rcompare, valid } from 'semver';
import v7x from './v7.0.0/index';
import v8x from './v8.0.0/index';

export type TutorialStep = {
  header: string;
  Content: any;
  code: string | Record<string, string>;
  completedCode?: string | Record<string, string>;
  activeFile?: string;
};

export type TutorialEntry = {
  description: string;
  thumbnail?: string;
  steps: TutorialStep[];
  extraPackages?: Record<string, string>;
};

export type TutorialCardData = {
  title: string;
  description: string;
  thumbnail?: string;
};

// TODO: Use await import to dynamically load versioned content on demand instead?
const versions: Record<string, Record<string, TutorialEntry>> = {
  'v7.0.0': v7x,
  'v8.0.0': v8x,
};

function getBestVersion(version: string) {
  const isPrerelease = prerelease(version);
  const versionToCompare = isPrerelease ? `${major(version)}.${minor(version)}.${patch(version)}` : version;

  // Get the keys of the versions object and filter them to find the best match
  const bestMatch = Object.keys(versions)
    .filter((name) => valid(name) && lte(name, versionToCompare))
    .sort((a, b) => rcompare(a, b))[0];

  // Return the entries and options of the best match
  return versions[bestMatch];
}

export function getTutorialEntry(version: string, key: string) {
  const bestVersion = getBestVersion(version);

  return bestVersion?.[key];
}

export function getTutorialCardsData(version: string) {
  const bestVersion = getBestVersion(version);
  const list: TutorialCardData[] = [];

  for (const key in bestVersion) {
    const tutorial = bestVersion[key];
    const { description, thumbnail } = tutorial;

    list.push({ title: key, description, thumbnail });
  }

  return list;
}
