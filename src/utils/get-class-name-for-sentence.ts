export function getClassNameForSentence(
  isViolationInView: boolean,
  hasApproved: boolean
) {
  if (hasApproved) {
    return "p-1";
  }

  if (isViolationInView) {
    return "hover:cursor-pointer p-1 rounded-md border-3 border-black-800";
  }

  return "hover:cursor-pointer p-1 rounded-md border-1 border-black-200";
}
