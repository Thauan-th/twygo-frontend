"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

// Interface para a aula
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
  const { slug } = useParams();

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

  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post(
      `http://localhost:3000/courses/${slug}/lessons`,
      newLesson
    );

    if (response.status === 201) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        lessons: [...prevCourse.lessons, response.data],
      }));
      setModalOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.courseTitle}>{course.title}</h1>
      <p className={styles.courseDescription}>{course.description}</p>

      <h2>Aulas</h2>
      <ul className={styles.lessons}>
        {course.lessons.map((lesson, index) => (
          <li key={index} className={styles.lessonItem}>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            {lesson.video_url && (
              <video controls className={styles.videoPlayer}>
                <source src={lesson.video_url} type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
              </video>
            )}
          </li>
        ))}
      </ul>

      <button
        className={styles.addLessonButton}
        onClick={() => setModalOpen(true)}
      >
        Adicionar Aula
      </button>

      {/* Modal para adicionar aula */}
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Adicionar Aula</h3>
            <form onSubmit={handleLessonSubmit}>
              <label>Título:</label>
              <input
                type="text"
                value={newLesson.title}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, title: e.target.value })
                }
              />
              <label>Descrição:</label>
              <textarea
                value={newLesson.description}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, description: e.target.value })
                }
              />
              <label>URL do vídeo:</label>
              <input
                type="text"
                value={newLesson.video_url}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, video_url: e.target.value })
                }
              />
              <button type="submit">Salvar Aula</button>
              <button type="button" onClick={() => setModalOpen(false)}>
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
