import { Maybe } from '@/lib/graphql/generated';

export const t = async (
  label: string,
  defaultValue?: Maybe<string>,
  translation?: Record<string, string>
) => {
  return translation?.[label] || defaultValue || label;
};
