"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import LessonModal from "@/components/courses/lessonModal";
import Link from "next/link";

interface Lesson {
  title: string;
  description: string;
  video_url: string;
}

interface Course {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  image: string | File;
  lessons: Lesson[];
}

export default function Page() {
  const { push } = useRouter();
  const { slug } = useParams() as { slug: string };

  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    image: "",
    lessons: [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [newLesson, setNewLesson] = useState<Lesson>({
    title: "",
    description: "",
    video_url: "",
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:3000/courses/${slug}?include_lessons=true`
      );
      const { data } = response;
      setCourse(data);
    })();
  }, [slug]);

  return (
    <div className={styles.container}>
      <Link href="/courses">Voltar</Link>

      <h1 className={styles.courseTitle}>{course.title}</h1>
      <p className={styles.courseDescription}>{course.description}</p>

      <div className={styles.buttonContainer}>
        <button
          className={styles.addLessonButton}
          onClick={() => setModalOpen(true)}
        >
          Adicionar Aula
        </button>
        <Link
          className={styles.generateReportLink}
          href={`/courses/${slug}/report`}
        >
          Gerar Relatório
        </Link>
      </div>

      <h2>Aulas</h2>
      <ul className={styles.lessons}>
        {course.lessons.map((lesson, index) => (
          <li key={index} className={styles.lessonItem}>
            <div className={styles.lessonDetails}>
              <div className={styles.lessonInfo}>
                <h3 className={styles.lessonTitle}>
                  <span className={styles.lessonNumber}>{index + 1}: </span>
                  {lesson.title}
                </h3>
                <p className={styles.lessonDescription}>{lesson.description}</p>
              </div>

              {lesson.video_url && (
                <div className={styles.videoWrapper}>
                  <video controls className={styles.videoPlayer}>
                    <source src={lesson.video_url} type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                  </video>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <LessonModal
          courseSlug={slug || ""}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
