export type AppRole = 'student' | 'admin';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  department: string;
  program: string;
  semester: number;
  gpa: number;
  attendancePct: number;
  photoUrl: string;
  dob: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  registrationStatus: 'Approved' | 'Pending Review' | 'Needs Documents' | 'Draft';
  registrationDate: string;
}

export interface FeeItem {
  id: string;
  title: string;
  category: 'Tuition' | 'Lab' | 'Library' | 'Exam' | 'Facilities' | 'Activity';
  amount: number;
  dueDate: string;
  semester: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  transactionId?: string;
  paymentMethod?: string;
  invoiceNumber: string;
}

export interface ScheduleItem {
  id: string;
  subject: string;
  code: string;
  instructor: string;
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  duration: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  attendanceRate: number; // e.g. 88%
  totalClasses: number;
  attendedClasses: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Fee Alert' | 'Exam' | 'Event' | 'General';
  date: string;
  author: string;
  isUrgent: boolean;
  pinned?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  options?: string[];
  scholarshipData?: {
    eligibleTier: string;
    discountPct: number;
    reasoning: string;
    requirements: string[];
  };
}

export interface DocumentVerifyResult {
  documentType: string;
  extractedName?: string;
  extractedGpa?: string;
  isValid: boolean;
  confidenceScore: number;
  summary: string;
  extractedFields: Record<string, string>;
}

export interface ClassStudent {
  id: string;
  studentName: string;
  studentCnic: string;
  fatherName: string;
  fatherCnic: string;
  mobile: string;
  address: string;
  selectedClass: 'Class_1' | 'Class_2' | 'Class_3' | 'Class_4' | 'Class_5' | 'Class_6' | 'Class_7' | 'Class_8' | 'Class_9' | 'Class_10';
  group?: 'Science' | 'Computer Science' | 'Humanities' | 'Bio Science' | 'General';
  createdAt: string;
  status: 'Registered' | 'Verified';
}

export interface ClassFeeChallan {
  id: string;
  studentName: string;
  studentCnic: string;
  selectedClass: 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5' | 'Class 6' | 'Class 7' | 'Class 8';
  admissionFee: number;
  monthlyFee: number;
  totalFee: number;
  challanNumber?: string;
  status: 'Unpaid' | 'Pending' | 'Approved' | 'Rejected';
  submittedAt?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface AdminStudentRecord {
  id: string;
  name: string;
  cnic: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  program: string;
  semester: number;
  gpa: number;
  attendancePct: number;
  guardianName: string;
  guardianPhone: string;
  status: 'Active' | 'Approved' | 'Pending Review' | 'Suspended';
  registrationDate: string;
}

export interface TeacherRecord {
  id: string;
  name: string;
  title: string;
  subject: string;
  code: string;
  email: string;
  office: string;
  consultationHours: string;
  avatar: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  department: string;
  program: string;
  previousGpa: string;
  guardianName: string;
  guardianPhone: string;
  feePlan: 'Semester Full' | 'Two Installments' | 'Monthly Flexible';
  documentUploaded: boolean;
  documentName?: string;
  documentSummary?: string;
}
