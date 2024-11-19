"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function Page() {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    logo: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(course);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          Description:
          <input
            type="text"
            name="description"
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
        <label className={`${styles.label} ${styles.dateField}`}>
          Start Date:
          <input
            type="date"
            name="start_date"
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
        <label className={`${styles.label} ${styles.dateField}`}>
          End Date:
          <input
            type="date"
            name="end_date"
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          Logo:
          <input
            type="file"
            name="logo"
            className={styles.input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className={styles.buttonSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
