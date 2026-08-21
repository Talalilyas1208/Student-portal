export const defaultAnnouncements = [
  { id: 1, announcement_text: "Mid-Term Examination schedule has been released for Fall 2026." },
  { id: 2, announcement_text: "Library will remain open 24/7 during the final exam week." },
  { id: 3, announcement_text: "Fee submission deadline for the upcoming semester is October 15th." },
  { id: 4, announcement_text: "Workshop on Artificial Intelligence & Cloud Systems scheduled for Friday." },
  { id: 5, announcement_text: "Sports gala registration is now open at the Student Affairs office." },
  { id: 6, announcement_text: "Course drop/add deadline ends this Wednesday at 5:00 PM." }
];

export const defaultCourses = [
  { course_id: "CS-101", course_title: "Introduction to Computer Science", awarded: 3.8, Credits: 4, score: 92, grade: "A", instructor: "Dr. Asad Malik" },
  { course_id: "CS-201", course_title: "Data Structures & Algorithms", awarded: 3.7, Credits: 4, score: 88, grade: "A-", instructor: "Prof. Maryam Bilal" },
  { course_id: "CS-301", course_title: "Database Management Systems", awarded: 3.9, Credits: 3, score: 95, grade: "A+", instructor: "Dr. Iqbal Murad" },
  { course_id: "CS-401", course_title: "Operating Systems & Concurrency", awarded: 3.5, Credits: 4, score: 82, grade: "B+", instructor: "Prof. Sarfaraz Arshad" },
  { course_id: "SE-302", course_title: "Software Engineering & Architecture", awarded: 4.0, Credits: 3, score: 98, grade: "A+", instructor: "Dr. Ali Hamza" },
  { course_id: "CS-405", course_title: "Artificial Intelligence & ML", awarded: 3.6, Credits: 3, score: 85, grade: "A-", instructor: "Dr. Asad Malik" },
  { course_id: "MA-102", course_title: "Calculus and Analytical Geometry", awarded: 3.2, Credits: 3, score: 78, grade: "B", instructor: "Prof. Ahmad Raza" },
  { course_id: "EE-205", course_title: "Digital Logic & Microprocessors", awarded: 3.4, Credits: 4, score: 80, grade: "B+", instructor: "Dr. Syed Tanveer" },
  { course_id: "HU-101", course_title: "Technical Writing & Presentation", awarded: 4.0, Credits: 2, score: 96, grade: "A+", instructor: "Prof. Ayesha Khan" }
];

export const defaultExams = [
  { id: 1, course_subject: "Introduction to Computer Science", exam_type: "Practical / Lab", exam_date_time: "2026-09-12 09:00 AM", venue: "Lab 3B" },
  { id: 2, course_subject: "Data Structures & Algorithms", exam_type: "Midterm Written", exam_date_time: "2026-09-15 11:30 AM", venue: "Hall A" },
  { id: 3, course_subject: "Database Management Systems", exam_type: "Project Viva", exam_date_time: "2026-09-18 02:00 PM", venue: "Room 204" },
  { id: 4, course_subject: "Operating Systems", exam_type: "Theory Exam", exam_date_time: "2026-09-22 10:00 AM", venue: "Hall B" },
  { id: 5, course_subject: "Software Engineering", exam_type: "Case Study Presentation", exam_date_time: "2026-09-25 01:00 PM", venue: "Auditorium" }
];

export const defaultCalendarEvents = [
  { date: "2026-08-25", type: "warning", content: "Semester Registration Starts" },
  { date: "2026-09-01", type: "success", content: "Orientation Day & Welcome Ceremony" },
  { date: "2026-09-12", type: "error", content: "Midterm Exams Begin" },
  { date: "2026-09-25", type: "processing", content: "Project Showcase & Hackathon" },
  { date: "2026-10-15", type: "warning", content: "Fee Submission Deadline" },
  { date: "2026-11-20", type: "error", content: "Final Examination Week" }
];

export const defaultProgress = [
  { id: 1, name: "Core Computer Science", percent: 88, type: "circle", creditsCompleted: 44, totalCredits: 50 },
  { id: 2, name: "Mathematics & Natural Sciences", percent: 92, type: "circle", creditsCompleted: 22, totalCredits: 24 },
  { id: 3, name: "Software Engineering Specialization", percent: 75, type: "circle", creditsCompleted: 18, totalCredits: 24 },
  { id: 4, name: "Humanities & Social Sciences", percent: 100, type: "circle", creditsCompleted: 12, totalCredits: 12 },
  { id: 5, name: "Senior Capstone Project", percent: 60, type: "circle", creditsCompleted: 3, totalCredits: 6 }
];

export const defaultStudyCards = [
  { id: 1, label: "Algorithms & Complexity", color: "#1677ff", description: "Asymptotic notation, dynamic programming, and graph algorithms.", resources: 14 },
  { id: 2, label: "System Architecture", color: "#52c41a", description: "Microservices, distributed caching, load balancing, and cloud deployments.", resources: 9 },
  { id: 3, label: "Full Stack Web Engineering", color: "#722ed1", description: "React, Node.js, Redux, GraphQL, and modern web development.", resources: 21 },
  { id: 4, label: "Machine Learning & AI", color: "#fa8c16", description: "Supervised models, neural networks, computer vision, and transformers.", resources: 18 },
  { id: 5, label: "Database Engineering", color: "#eb2f96", description: "Indexing, query optimization, ACID transactions, and NoSQL engines.", resources: 11 },
  { id: 6, label: "Cybersecurity & Cryptography", color: "#13c2c2", description: "Public key infrastructure, OAuth2, penetration testing, and zero trust.", resources: 8 }
];

export const defaultStudentProfile = {
  name: "Talal Ilyas",
  studentId: "SP-2026-8812",
  department: "Computer Science & Engineering",
  semester: "7th Semester",
  cgpa: "3.84",
  status: "Active",
  avatarUrl: "",
  email: "talal.ilyas@university.edu",
  attendance: "94.5%",
  earnedCredits: 99,
  totalCredits: 128
};

export const defaultLecturerProfile = {
  name: "Prof. Dr. Maryam Bilal",
  employeeId: "FAC-2026-104",
  department: "Department of Computer Science",
  designation: "Associate Professor",
  status: "Active",
  coursesCount: 4,
  totalStudents: 142,
  email: "maryam.bilal@university.edu"
};

export const defaultTeacherCourses = [
  { id: "CS-201", name: "Data Structures & Algorithms", section: "BSCS-4A", students: 48, averageScore: 84.2, status: "Ongoing" },
  { id: "CS-301", name: "Database Management Systems", section: "BSCS-6B", students: 52, averageScore: 88.5, status: "Ongoing" },
  { id: "SE-302", name: "Software Engineering", section: "BSCS-6A", students: 42, averageScore: 91.0, status: "Ongoing" }
];
