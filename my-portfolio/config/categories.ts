export const postCategories = [
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "leadership", label: "Leadership" },
  { value: "projects", label: "Projects" },
] as const;
export type PostCategory = (typeof postCategories)[number]["value"];
export const achievementCategories = [
  { value: "ctf", label: "CTF" },
  { value: "internship", label: "Internship" },
  { value: "competition", label: "Competition" },
  { value: "education", label: "Education" },
] as const;
export type AchievementCategory =
  (typeof achievementCategories)[number]["value"];
export const reviewStatuses = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
] as const;
export type ReviewStatus = (typeof reviewStatuses)[number]["value"];
export const postStatuses = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
] as const;
export type PostStatus = (typeof postStatuses)[number]["value"];