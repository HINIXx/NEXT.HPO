import {
  cabin360VideoUrl,
  type LearningViewerRequest,
} from "@/features/learning-resources/data/learning-resource-catalog";
import type { SyllabusLearningResource } from "./subject-syllabus-framework-types";

/** Học liệu trong modal Chương trình khung → yêu cầu mở trình xem (cùng đích như V2 script.js trang Quy trình). */
export function syllabusResourceToLearningViewerRequest(
  resource: SyllabusLearningResource,
): LearningViewerRequest {
  switch (resource.kind) {
    case "sign-group":
      return { kind: "document", doc: "bien-bao", target: resource.target };
    case "engine-animation":
      return { kind: "document", doc: "engine-4ky" };
    case "driving-technique":
      return {
        kind: "document",
        doc: "ky-thuat-lai-xe",
        target: resource.target,
      };
    case "cabin-360":
      return {
        kind: "lesson",
        title: resource.title,
        videoUrl: cabin360VideoUrl,
      };
    case "lesson-video":
      return {
        kind: "lesson",
        title: resource.title,
        lessonTarget: resource.target,
      };
  }
}
