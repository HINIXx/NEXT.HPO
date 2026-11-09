import type { ReactNode } from "react";
import { LearningResourceViewerProvider } from "@/features/learning-resources/components/learning-resource-viewer-provider";
import { SyllabusModalProviderWithDialog } from "./syllabus-modal-provider-with-dialog";
import { TrainingTimeAllocationTableCard } from "./training-time-allocation-table-card";
import {
  TrainingProcessSectionHead,
  trainingProcessSectionClassName,
} from "./training-process-shared-typography";

/**
 * Bước 2 (V2 `#dao-tao`, nền #f5f7fc): bảng phân bổ thời gian (bấm môn → modal Chương trình khung)
 * + danh mục "Chương trình đào tạo lái xe ô tô thông minh" (`curriculum`, khối dùng chung với trang chủ).
 */
export function TrainingProgramStepSection({
  curriculum,
}: {
  curriculum?: ReactNode;
}) {
  return (
    <section
      id="dao-tao"
      aria-labelledby="training-title"
      className={`bg-surface ${trainingProcessSectionClassName}`}
    >
      <div className="container-site">
        <TrainingProcessSectionHead
          eyebrow="Bước 02"
          titleId="training-title"
          title={
            <>
              Chương trình <em>đào tạo</em>
            </>
          }
          description="Khung chương trình đào tạo tổng hợp các nội dung lý thuyết, thực hành, thời lượng học và quãng đường yêu cầu cho từng hạng giấy phép lái xe."
        />
        <LearningResourceViewerProvider>
          <SyllabusModalProviderWithDialog>
            <TrainingTimeAllocationTableCard />
          </SyllabusModalProviderWithDialog>
          {curriculum}
        </LearningResourceViewerProvider>
      </div>
    </section>
  );
}
