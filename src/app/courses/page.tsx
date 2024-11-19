'use client';

import { getCourses } from "@/requests/courses";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const courses = await getCourses();
      setCourses(courses);
    })();
  }, []);

  if (courses.length === 0) {
    return (
      <div className={styles.noCourses}>
        <h1>Nenhum curso encontrado</h1>
      </div>
    );
  }

  return (
    <div className={styles.courseList}>
      {courses.map((course: any) => (
        <div key={course.id} className={styles.courseCard}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.courseDescription}>{course.description}</p>
          <p className={styles.courseDate}>
            <strong>Início:</strong> {course.start_date}
          </p>
          <p className={styles.courseDate}>
            <strong>Término:</strong> {course.end_date}
          </p>
        </div>
      ))}
    </div>
  );
}
