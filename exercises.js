
// exercise.js
'use strict';

/*
 Mini in-memory backend: students + courses
*/

// ---------- In-memory stores ----------
const students = new Map(); // key: id, value: Student instance
const courses = new Map();  // key: id, value: Course instance

// ---------- Classes ----------
class Student {
  constructor(id, name, age, email) {
    this.id = id;               // string or number
    this.name = name;
    this.age = age;
    this.email = email;
    this.courses = new Set();   // store course ids
  }

  enroll(courseId) {
    this.courses.add(courseId);
  }

  leave(courseId) {
    this.courses.delete(courseId);
  }

  listCourses() {
    return Array.from(this.courses);
  }
}

class Course {
  constructor(id, title, durationHours = 1) {
    this.id = id;
    this.title = title;
    this.duration = durationHours;
  }
}

// ---------- Functions (to implement) ----------

// 1) addStudent(obj)
//  - accepts object { id, name, age, email }
//  - stores in `students` Map
// function addStudent({ id, name, age, email }) {
//   students.set(id, {name, age, email})
//   console.log(students)
// }
// 1) addStudent(obj)
//  - accepts object { id, name, age, email }
//  - stores in `students` Map
function addStudent({ id, name, age, email }) {
  if (!students.has(id)) {
    students.set(id, new Student(id, name, age, email));
  }
}

// 2) addCourse(obj)
//  - accepts object { id, title, duration }
//  - stores in `courses` Map
function addCourse({ id, title, duration = 1 }) {
  if (!courses.has(id)) {
    courses.set(id, new Course(id, title, duration));
  }
}

// 3) findStudentByEmail(email) -> Student or null
function findStudentByEmail(email) {
    for (const [k, v] of students.entries()) {
      if (v.email == email) {
        console.log(students.get(k))
      }
    }
}

// 4) enrollStudentToCourse(studentId, courseId) -> Student
function enrollStudentToCourse(studentId, courseId) {
  // TODO: check student and course exist, use student.enroll()
  if (!students.has(studentId)) throw new Error('Estudante não encontrado');
  if (!courses.has(courseId)) throw new Error("Curso não encontrado");

  const student = students.get(studentId)
  student.enroll(courseId)
  
}

// 5) getStudentsInCourse(courseId) -> array of student objects (simple)
function getStudentsInCourse(courseId) {
  const studentsArray = []
  for (const student of students.values()) {
    if (student.courses.has(courseId)) {
      studentsArray.push(student)
    }
  }
  return studentsArray
}

// 6) averageAge() -> number (use array reduce)
function averageAge() {
  return students.values().reduce((soma, students) => {
        soma += students.age

    return soma
}, 0) / students.size
}

// 7) listAllStudents() -> array of { id, name, email }
function listAllStudents() {
  console.log(students)
}

// ---------- Seed & demo runner (não mexer inicialmente) ----------
function seed() {
  addCourse({ id: 'c1', title: 'JS Básico', duration: 4 });
  addCourse({ id: 'c2', title: 'Git & CLI', duration: 3 });
  addStudent({ id: 's1', name: 'Ana', age: 20, email: 'ana@example.com' });
  addStudent({ id: 's2', name: 'Bruno', age: 25, email: 'bruno@example.com' });
  enrollStudentToCourse('s1', 'c1');
  enrollStudentToCourse('s2', 'c1');
  enrollStudentToCourse('s2', 'c2');
}

function printState() {
  console.log('Students:', listAllStudents());
  console.log('Students in c1:', getStudentsInCourse('c1').map(s => s.name));
  console.log('Average age:', averageAge());
}

seed()
printState()
