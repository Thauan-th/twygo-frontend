"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Page() {
  const { push } = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const [course, setCourse] = useState<{
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    image: string | File;
  }>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    image: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "image") {
      const files = event.target.files;

      if (!files || files.length === 0) {
        return;
      }

      setCourse({ ...course, image: files[0] });
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("course[title]", course.title);
    formData.append("course[description]", course.description);
    formData.append("course[start_date]", course.start_date);
    formData.append("course[end_date]", course.end_date);
    if (course.image) {
      formData.append("course[image]", course.image);
    }

    // TODO: SEPARATE THIS REQUEST
    axios
      .post("http://localhost:3000/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data?.error) {
          setErrors(data.errors);
        } else {
          push(`/courses/${data?.slug}`);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao criar o curso.");
      });
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {errors.length > 0 && (
          <div className={styles.errors}>
            <h1>Erro ao criar o curso</h1>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <label className={styles.label}>Título:</label>
        <input
          type="text"
          name="title"
          className={styles.input}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Descrição:</label>
        <input
          type="text"
          name="description"
          className={styles.input}
          onChange={handleInputChange}
        />

        <label className={`${styles.label} ${styles.dateField}`}>
          Data Início:
        </label>
        <input
          type="date"
          name="start_date"
          className={styles.input}
          onChange={handleInputChange}
        />

        <label className={`${styles.label} ${styles.dateField}`}>
          Data Término:
        </label>
        <input
          type="date"
          name="end_date"
          className={styles.input}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Imagem de Capa:</label>
        <input
          type="file"
          name="image"
          className={styles.input}
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.buttonSubmit}>
          Enviar
        </button>
      </form>
    </div>
  );
}
