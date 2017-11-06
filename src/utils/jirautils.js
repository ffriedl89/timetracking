
export function sanitizeIssueNo(issueNo) {
  let i = issueNo.trim();
  i = i.split(/(\s|-)/g);
  return `${i[0]}-${i[2]}`;
}

export default {
  sanitizeIssueNo,
};
