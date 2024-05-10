import React from "react";

// consulting

const ConsultationItem = React.lazy(() =>
  import("./views/consulting/admin/ConsultationItem")
);
const ConsultationSchedule = React.lazy(() =>
  import("./views/consulting/admin/ConsultationSchedule")
);
const ResultList = React.lazy(() =>
  import("./views/consulting/admin/ConsultationResult")
);

const ScheduleCheck = React.lazy(() =>
  import("./views/consulting/counselor/CounselorSchedule/CounselorSchedule")
);
const Timetable = React.lazy(() =>
  import(
    "./views/consulting/counselor/TimetableRegistration/TimetableRegistration"
  )
);
const Processing = React.lazy(() =>
  import("./views/consulting/counselor/RequestProcessing/RequestProcessing")
);

const Result = React.lazy(() =>
  import("./views/consulting/counselor/ResultRegistration/ResultRegistration")
);

const Request = React.lazy(() =>
  import("./views/consulting/student/RequestConsultation")
);

const Requestschedule = React.lazy(() =>
  import("./views/consulting/student/Requestschedule")
);

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));


// TNG
const ProfessorSelect = React.lazy(() =>
  import("./views/TNG/SCSBJT/ProfessorSelect")
);
const TngApproval = React.lazy(() => import("./views/TNG/Admin/TngApproval"));
const StdntAply = React.lazy(() => import("./views/TNG/Stdnt/StdntAply"));
const StdntProgAply = React.lazy(() =>
  import("./views/TNG/Stdnt/StdntProgAply")
);
const TNGApplication = React.lazy(() =>
  import("./views/TNG/BZENTY/TNGApplication")
);
const TNGList = React.lazy(() => import("./views/TNG/BZENTY/TngList"));
const TngAplyStdntList = React.lazy(() =>
  import("./views/TNG/BZENTY/TngAplyStdntList")
);
const TngProgStdnt = React.lazy(() =>
  import("./views/TNG/BZENTY/TngProgStdnt")
);
const TngAttend = React.lazy(() => import("./views/TNG/BZENTY/TngAttend"));
const TngRcd = React.lazy(() => import("./views/TNG/BZENTY/TngRcd"));

//RECRUIT
const TablePbanc = React.lazy(() => import("./views/recruit/TablePbanc"));
const DetailPbanc = React.lazy(() => import("./views/recruit/DetailPbanc"));
const TableAplyPbanc = React.lazy(() => import("./views/recruit/ApplyList"));
const WriteResume = React.lazy(() => import("./views/recruit/WriteResume"));
const HandleResume = React.lazy(() => import("./views/recruit/HandleResume"));
const WritePbanc = React.lazy(() =>
  import("./views/recruit/bzRecruit/WritePbanc")
);

const routes = [
  // consulting
  { path: "/consultationItem", name: "Theme", element: ConsultationItem },

  {
    path: "/consultationSchedule",
    name: "Theme",
    element: ConsultationSchedule,
  },
  { path: "/resultList", name: "Theme", element: ResultList },
  { path: "/schedule", name: "Theme", element: ScheduleCheck },
  { path: "/timeTable", name: "Theme", element: Timetable },
  { path: "/processing", name: "Theme", element: Processing },
  { path: "/result", name: "Theme", element: Result },

  { path: "/consultationRequest", name: "Theme", element: Request },
  {
    path: "/requestschedule/:sonuselorId",
    name: "Theme",
    element: Requestschedule,
  },

  // TNG
  {
    path: "/professorSelect",
    name: "지도교수 배정",
    element: ProfessorSelect,
  },
  { path: "/tngApplication", name: "현장실습 신청", element: TNGApplication },
  { path: "/tngList", name: "현장실습목록", element: TNGList },
  { path: "/tngApproval", name: "현장실습 참여 관리", element: TngApproval },
  { path: "/stdntAply", name: "현장실습 목록", element: StdntAply },
  {
    path: "/tngAplyStdntList",
    name: "현장실습 신청 학생",
    element: TngAplyStdntList,
  },
  { path: "/tngProgStdnt", name: "현장실습 진행 학생", element: TngProgStdnt },
  { path: "/tngAttend", name: "현장 실습 출석", element: TngAttend },
  {
    path: "/stdntProgAply",
    name: "진행중인 현장 실습",
    element: StdntProgAply,
  },
  { path: "/tngRcd", name: "지도일지 작성", element: TngRcd },

  // RECRUIT
  { path: "/recruit/TablePbanc", name: "TablePbanc", element: TablePbanc },
  {
    path: "/recruit/detailPbanc/:pbancSn",
    name: "detailPbanc",
    element: DetailPbanc,
  },
  {
    path: "/recruit/TableAplyPbanc",
    name: "TableAplyPbanc",
    element: TableAplyPbanc,
  },
  { path: "/recruit/WriteResume", name: "WriteResume", element: WriteResume },
  {
    path: "/recruit/HandleResume",
    name: "HandleResume",
    element: HandleResume,
  },
  {
    path: "/recruit/bzRecruit/WritePbanc",
    name: "WritePbanc",
    element: WritePbanc,
  },
  

  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
];

export default routes;
