"use client";
import axios from "axios";
import { useState } from "react";
import styles from "./lessomModal.module.css";

export default function Page() {
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
        } else {
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        alert("Erro ao criar o curso.");
      });
  };

  return (
    <div className={styles.container}>
    </div>
  );
}
