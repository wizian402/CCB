import React from "react";
import writePbanc from "./views/recruit/bzRecruit/WritePbanc";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

// consulting

const ConsultationItem = React.lazy(() =>
  import("./views/consulting/admin/ConsultationItem")
);
const ConsultationSchedule = React.lazy(() =>
  import("./views/consulting/admin/ConsultationSchedule")
);
const Result = React.lazy(() =>
  import("./views/consulting/admin/ConsultationResult")
);

const ScheduleCheck = React.lazy(() =>
  import("./views/consulting/counselor/CounselorSchedule")
);
const Timetable = React.lazy(() =>
  import("./views/consulting/counselor/TimetableRegistration")
);

const Request = React.lazy(() =>
  import("./views/consulting/RequestConsultation")
);

const Requestschedule = React.lazy(() =>
  import("./views/consulting/Requestschedule")
);

// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Paginations")
);
const Placeholders = React.lazy(() =>
  import("./views/base/placeholders/Placeholders")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const Progress = React.lazy(() => import("./views/base/progress/Progress"));
const Spinners = React.lazy(() => import("./views/base/spinners/Spinners"));
const Tables = React.lazy(() => import("./views/base/tables/Tables"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const TablesResume = React.lazy(() =>
  import("./views/base/tables/TablesResume")
);

// Buttons
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Dropdowns = React.lazy(() =>
  import("./views/buttons/dropdowns/Dropdowns")
);

//Forms
const ChecksRadios = React.lazy(() =>
  import("./views/forms/checks-radios/ChecksRadios")
);
const FloatingLabels = React.lazy(() =>
  import("./views/forms/floating-labels/FloatingLabels")
);
const FormControl = React.lazy(() =>
  import("./views/forms/form-control/FormControl")
);
const InputGroup = React.lazy(() =>
  import("./views/forms/input-group/InputGroup")
);
const Layout = React.lazy(() => import("./views/forms/layout/Layout"));
const Range = React.lazy(() => import("./views/forms/range/Range"));
const Select = React.lazy(() => import("./views/forms/select/Select"));
const Validation = React.lazy(() =>
  import("./views/forms/validation/Validation")
);

const Charts = React.lazy(() => import("./views/charts/Charts"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// Notifications

const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

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
const WritePbanc = React.lazy(() => import("./views/recruit/bzRecruit/WritePbanc"));

const routes = [
  // consulting
  { path: "/consultationItem", name: "Theme", element: ConsultationItem },

  {
    path: "/consultationSchedule",
    name: "Theme",
    element: ConsultationSchedule,
  },
  { path: "/result", name: "Theme", element: Result },
  { path: "/schedule", name: "Theme", element: ScheduleCheck },
  { path: "/timeTable", name: "Theme", element: Timetable },
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
  { path: "/recruit/tablePbanc", name: "TablePbanc", element: TablePbanc },
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
  { path: "/recruit/HandleResume", name: "HandleResume", element: HandleResume },
  { path: "/recruit/bzRecruit/WritePbanc", name: "WritePbanc", element: WritePbanc },

  //
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", element: Breadcrumbs },
  { path: "/base/cards", name: "Cards", element: Cards },
  { path: "/base/carousels", name: "Carousel", element: Carousels },
  { path: "/base/collapses", name: "Collapse", element: Collapses },
  { path: "/base/list-groups", name: "List Groups", element: ListGroups },
  { path: "/base/navs", name: "Navs", element: Navs },
  { path: "/base/paginations", name: "Paginations", element: Paginations },
  { path: "/base/placeholders", name: "Placeholders", element: Placeholders },
  { path: "/base/popovers", name: "Popovers", element: Popovers },
  { path: "/base/progress", name: "Progress", element: Progress },
  { path: "/base/spinners", name: "Spinners", element: Spinners },
  { path: "/base/tables", name: "Tables", element: Tables },
  { path: "/base/tablesResume", name: "TablesResume", element: TablesResume },
  { path: "/base/tooltips", name: "Tooltips", element: Tooltips },
  { path: "/buttons", name: "Buttons", element: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", element: Buttons },
  { path: "/buttons/dropdowns", name: "Dropdowns", element: Dropdowns },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    element: ButtonGroups,
  },
  { path: "/charts", name: "Charts", element: Charts },
  { path: "/forms", name: "Forms", element: FormControl, exact: true },
  { path: "/forms/form-control", name: "Form Control", element: FormControl },
  { path: "/forms/select", name: "Select", element: Select },
  {
    path: "/forms/checks-radios",
    name: "Checks & Radios",
    element: ChecksRadios,
  },
  { path: "/forms/range", name: "Range", element: Range },
  { path: "/forms/input-group", name: "Input Group", element: InputGroup },
  {
    path: "/forms/floating-labels",
    name: "Floating Labels",
    element: FloatingLabels,
  },
  { path: "/forms/layout", name: "Layout", element: Layout },
  { path: "/forms/validation", name: "Validation", element: Validation },
  { path: "/icons", exact: true, name: "Icons", element: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", element: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", element: Flags },
  { path: "/icons/brands", name: "Brands", element: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    element: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", element: Alerts },
  { path: "/notifications/badges", name: "Badges", element: Badges },
  { path: "/notifications/modals", name: "Modals", element: Modals },
  { path: "/notifications/toasts", name: "Toasts", element: Toasts },
  { path: "/widgets", name: "Widgets", element: Widgets },
];

export default routes;
