"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "@/requests/courses";

const updateCourse = async (slug: string, courseData: FormData) => {
  const response = await axios.put(
    `http://localhost:3000/courses/${slug}`,
    courseData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export default function Page() {
  const { push } = useRouter();
  const { slug } = useParams() as { slug: string };

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourse(slug, "include_lessons=true"),
    enabled: !!slug,
  });

  useEffect(() => {
    if (data) {
      setCourse({ ...data, image: "" });
    }
  }, [data]);

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

  // Handle form submission
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

    updateCourse(slug, formData)
      .then((response) => {
        if (response?.error) {
          setErrors(response.errors);
        } else {
          push(`/courses/${response?.slug}`);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao atualizar o curso.");
      });
  };

  if (isLoading && !data) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return (
      <div>
        Erro ao carregar os dados do curso:{" "}
        {error instanceof Error ? error.message : "Erro desconhecido"}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles.backLink}>
          <Link href={`/courses/`}>Voltar</Link>
        </div>
        {errors.length > 0 && (
          <div className={styles.errors}>
            <h1>Erro ao atualizar o curso</h1>
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
          value={course.title}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Descrição:</label>
        <input
          type="text"
          name="description"
          className={styles.input}
          value={course.description}
          onChange={handleInputChange}
        />

        <label className={`${styles.label} ${styles.dateField}`}>
          Data Início:
        </label>
        <input
          type="date"
          name="start_date"
          className={styles.input}
          value={course.start_date}
          onChange={handleInputChange}
        />

        <label className={`${styles.label} ${styles.dateField}`}>
          Data Término:
        </label>
        <input
          type="date"
          name="end_date"
          className={styles.input}
          value={course.end_date || ''}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Imagem de Capa:</label>
        {data.image ? (
          <img
            src={data.image as string}
            alt={`Imagem do curso ${data.title}`}
            className={styles.courseImage}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <span>Sem imagem</span>
          </div>
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
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
