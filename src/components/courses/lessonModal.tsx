"use client";
import axios from "axios";
import { useState } from "react";
import styles from "./lessonModal.module.css";

export default function LessonModal({
  courseSlug,
  onClose,
}: {
  courseSlug: string;
  onClose: () => void;
}) {
  const [lesson, setLesson] = useState<{
    title: string;
    description: string;
    video: string | File;
  }>({
    title: "",
    description: "",
    video: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "video") {
      const files = event.target.files;

      if (!files || files.length === 0) {
        return;
      }

      setLesson({ ...lesson, video: files[0] });
    } else {
      setLesson({ ...lesson, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("lesson[title]", lesson.title);
    formData.append("lesson[description]", lesson.description);
    if (lesson.video) {
      formData.append("lesson[video]", lesson.video);
    }

    let url = `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseSlug}/lessons`;

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data?.error) {
          alert("Erro ao criar a aula.");
        } else {
          alert("Aula criada com sucesso!");
          onClose();
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao criar a aula.");
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Adicionar Aula</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Título:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={lesson.title}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Descrição:
            </label>
            <input
              id="description"
              name="description"
              value={lesson.description}
              onChange={handleInputChange}
              className={styles.textarea}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="video" className={styles.label}>
              Vídeo:
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              Criar Aula
            </button>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
