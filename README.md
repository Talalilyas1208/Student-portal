# 🎓 University of Sargodha - Student & Faculty Portal

A modern, high-performance academic management portal built with **React 18**, **Ant Design 5**, and **Redux Toolkit**. Designed for students and faculty members to track courses, schedules, exams, grade cards, academic calendars, and departmental notices seamlessly.

---

## 🌟 Key Features

### 👨‍🎓 Student Portal
- **Dashboard Overview**: Instant summary of enrolled courses, upcoming exam dates, academic calendar highlights, campus announcements, and quick metric cards (CGPA, Total Credits, Attendance %).
- **Course Catalogue & My Courses**: Interactive Ant Design tables featuring searchable courses, credit counts, letter grades, percentage scores, and assigned instructors.
- **Interactive Academic Calendar**: Ant Design 5 calendar with custom day-cell event badges, month/year navigation, and click-to-view event details modal.
- **Degree Audit & Progress**: Visual circular progress rings and linear degree audit bars tracking completed credits vs. required graduation milestones.
- **Official Examination Result Card**: Dynamic evaluation form allowing students to submit and preview official printable grade cards with real-time field validation.
- **Curated Study Cards & Topics**: Knowledge track cards with topic tags, syllabus overviews, and downloadable resource modals (lecture slides, past papers, recorded sessions).

### 👩‍🏫 Lecturer & Faculty Portal
- **Faculty Management Dashboard**: High-level overview of assigned course sections, enrollment numbers, and class average scores.
- **Evaluation & Grading Queue**: Grade review table for managing student scores and exam submissions.
- **Campus Announcement Broadcast**: Quick modal action to publish campus-wide bulletins and notices in real-time.

### ⚡ Performance & Architectural Highlights
- **Route-Level Code Splitting**: Sub-routes are lazy-loaded on demand with `React.lazy()` and `Suspense`, keeping the initial bundle size minimal and instantaneous.
- **Unified Redux Toolkit Store**: Centralized state caching eliminates redundant network requests on route navigation.
- **Offline & Mock Resilient**: Built-in structured fallback datasets ensure zero UI crashes even when the mock server is offline.
- **Ant Design 5 Theme Tokens**: Modern, responsive, and accessible styling utilizing pure Ant Design tokens.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Core UI component framework with Concurrent Mode & Suspense |
| **Redux Toolkit (`@reduxjs/toolkit`)** | Centralized predictable state management & asynchronous thunks |
| **React-Redux** | React bindings for Redux store |
| **Ant Design 5 (`antd`)** | Enterprise-grade UI component library |
| **Ant Design Icons (`@ant-design/icons`)** | SVG vector icon system |
| **React Router 6 (`react-router-dom`)** | Client-side routing with role-based `ProtectedRoute` guards |
| **Dayjs** | Lightweight date manipulation engine for Ant Design 5 Calendar |

---

## 📁 Project Structure

```text
Student-portal/
├── public/                     # Static HTML template and favicon
├── mockeserver/                # Optional HTTP mock server
│   └── mockserver/
│       ├── Data.js             # Mock API datasets
│       └── index.js            # Mock endpoints (port 8080)
├── src/
│   ├── Components/             # Reusable Ant Design 5 components
│   │   ├── SPButton.js         # Standardized AntD Button with loading states
│   │   ├── SPInput.js          # Unified Input / Password / TextArea
│   │   ├── SPFrominput.js      # Form.Item input wrapper with validation
│   │   ├── Sptable.js          # AntD Table with sorting, search & pagination
│   │   ├── SPcalender.js       # AntD 5 Calendar with Dayjs & event badges
│   │   ├── SPHeader.js         # User profile header with avatar & status
│   │   ├── SPRoleSelector.js   # Segmented Student / Lecturer selector
│   │   ├── SPStatCard.js       # Statistic card with icons & tags
│   │   ├── SPsearch.js         # Debounced search bar wired to Redux
│   │   ├── SPlogoheader.js     # Responsive portal header & icon
│   │   ├── SPimagebg.js        # Optimized background hero image
│   │   ├── Sppersonalinfo.js   # Personal details form section
│   │   ├── ResultInfo.js       # Dynamic grade/evaluation form section
│   │   ├── DashboardCardSection.js # Standardized container card
│   │   └── index.js            # Barrel export of all components
│   ├── FetchHOOk/
│   │   └── Hookfetchdata.js    # Custom data fetching hook with request cache
│   ├── Images/                 # Image assets
│   ├── redux/
│   │   ├── data/
│   │   │   └── defaultData.js  # Resilient fallback & mock datasets
│   │   ├── slices/
│   │   │   ├── authSlice.js    # Authentication, roles, token & session
│   │   │   ├── portalSlice.js  # Courses, exams, calendar, progress, study cards
│   │   │   └── uiSlice.js      # Sidebar collapse, search queries & modals
│   │   └── store.js            # Configured Redux store
│   ├── Academiccalender.js     # Full calendar view
│   ├── App.js                  # App root with Redux & AntD ConfigProvider
│   ├── CourseTable.js          # Course catalogue & registered courses view
│   ├── DashboardOverview.js    # Main student summary dashboard
│   ├── Lecturer.js             # Role wrapper component
│   ├── Lecturerlogin.js        # Faculty sign-in page
│   ├── Login.js                # Portal entry & role selection page
│   ├── Myprogress.js           # Degree audit & progress metrics
│   ├── Pagerouting.js          # Route definitions & ProtectedRoute guards
│   ├── Resultcard.js           # Student result card submission view
│   ├── Sidebar.js              # Ant Design 5 collapsible navigation menu
│   ├── Studentdashboard.js     # Main student layout shell & top navigation
│   ├── Studentexam.js          # Exam schedule table
│   ├── Studentlogin.js         # Student sign-in page
│   ├── Studycard.js            # Study card & learning resource explorer
│   ├── Teacherdashborad.js     # Lecturer layout shell
│   ├── Teacherdashboardoverveiw.js # Lecturer course management overview
│   └── index.js                # React DOM entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v16.x or higher
- **npm**: v8.x or higher

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/Talalilyas1208/Student-portal.git
cd Student-portal
npm install
```

### 3. Running the Development Server
Start the React application:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. (Optional) Running the Mock Server
If you wish to run the backend mock API server on port 8080:
```bash
cd mockeserver/mockserver
node index.js
```
> **Note**: The application is fully equipped with built-in Redux fallback datasets, meaning it works 100% smoothly even without running the mock server.

### 5. Production Build
To create an optimized production build:
```bash
npm run build
```

---

## 🔑 Demo Credentials

You can use the built-in **"Fill Demo Credentials"** button on the login forms or use the following:

### Student Account:
- **Username**: `emilys` *(or any Student ID like `1234`)*
- **Password**: `emilyspassword` *(or any password)*
- **Role**: Student

### Faculty / Lecturer Account:
- **Username**: `kminchelle` *(or `admin`)*
- **Password**: `0lelplR`
- **Role**: Lecturer

---

## 🧩 Reusable Components Reference

All components are centralized in `src/Components/index.js` and can be imported directly:

```javascript
import {
  SPtable,
  SPCalendar,
  SPStatCard,
  SPButton,
  SPFormInput,
  SPHeader,
  SPRoleSelector,
  SPsearch,
  DashboardCardSection
} from "./Components";
```

### Example: `SPTable`
```jsx
<SPtable
  data={courses}
  columns={columns}
  pagination={{ pageSize: 8 }}
  bordered
  rowKey="course_id"
/>
```

### Example: `SPStatCard`
```jsx
<SPStatCard
  title="Current CGPA"
  value="3.84"
  prefix={<TrophyOutlined />}
  color="#52c41a"
  tagText="Top 5% of Class"
  tagColor="green"
/>
```

---

## 📜 License & Author

- **Author**: [Talal Ilyas](https://github.com/Talalilyas1208)
- **Repository**: [Talalilyas1208/Student-portal](https://github.com/Talalilyas1208/Student-portal.git)
- **License**: ISC
