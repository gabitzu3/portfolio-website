export type {
  Achievement,
  AchievementCategory,
  Certification,
  Database,
  Log,
  Post,
  PostCategory,
  PostStatus,
  Profile,
  Project,
  ProjectStatus,
  Review,
  ReviewStatus,
} from "./database";
export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };
