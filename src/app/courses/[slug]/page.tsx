"use client";

import { Course } from "@/types";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { useState } from "react";
import LessonModal from "@/components/courses/lessonModal";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCourse, deleteCourse } from "@/requests/courses";
import { useRouter } from "next/navigation";

export default function Page() {
  const { push } = useRouter();
  const { slug } = useParams() as { slug: string };
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<Course>({
    queryKey: ["course", slug],
    queryFn: () => getCourse(slug, "include_lessons=true"),
    enabled: !!slug,
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteCourse,
    onSuccess: () => {
      alert("Curso deletado com sucesso!");
      push("/courses");
    },
    onError: () => {
      alert("Erro ao deletar o curso.");
    },
  });

  const handleDelete = () => {
    if (confirm("Você tem certeza que deseja deletar este curso?")) {
      deleteMutation.mutate(slug);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados do curso.</div>;
  }

  const course = data as Course;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/courses">Voltar</Link>
        <button
          className={styles.editButton}
          type="button"
          onClick={handleDelete}
        >
          Deletar
        </button>
      </div>

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
