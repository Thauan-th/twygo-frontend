"use client";

import { getCourses } from "@/requests/courses";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

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
    <div className={styles.container}>
      <div className={styles.addCourseContainer}>
        <Link href="/courses/new" className={styles.addCourse}>
          Adicionar Novo Curso
        </Link>
      </div>
      <div className={styles.courseList}>
        {courses.map((course: any) => (
          <Link key={course.id} className={styles.courseCard} href={`/courses/${course.slug}`}>
            {course.image ? (
              <img
                src={course.image}
                alt={`Imagem do curso ${course.title}`}
                className={styles.courseImage}
              />
            ) : (
              <div className={styles.placeholderImage}>
                <span>Sem imagem</span>
              </div>
            )}
            <h1 className={styles.courseTitle}>{course.title}</h1>
            <p className={styles.courseDescription}>{course.description}</p>
            <p className={styles.courseDate}>
              <strong>Início:</strong> {course.start_date}
            </p>
            <p className={styles.courseDate}>
              <strong>Término:</strong> {course.end_date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
