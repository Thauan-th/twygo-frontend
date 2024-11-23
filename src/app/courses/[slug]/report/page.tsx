"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Report {
  file: string;
  created_at: string;
}

export default function Page() {
  const { slug } = useParams() as { slug: string };

  const [reports, setReports] = useState<Report[]>([]);

  const requestNewReport = () => {
    axios
      .post(`http://localhost:3000/courses/${slug}/reports`)
      .then((response) => {
        const { data } = response;

        if (data?.error) {
          alert("Erro ao criar o relatório.");
        } else {
          alert("Relatório criado com sucesso.");
        }
      });
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:3000/courses/${slug}/reports/`
      );
      const { data } = response;
      setReports(data.results);
    })();
  }, [slug]);

  return (
    <div className={styles.container}>
      <Link href={`/courses/${slug}`} className={styles.backLink}>
        Voltar
      </Link>

      <div className={styles.newReport}>
        <button
          className={styles.newReportButton}
          onClick={() => requestNewReport()}
        >
          Novo Relatório
        </button>
      </div>

      {reports.length > 0 ? (
        <>
          <ul className={styles.reportList}>
            {reports.map((report: Report, index: number) => (
              <li key={index} className={styles.reportItem}>
                <div className={styles.reportDetails}>
                  <h3 className={styles.reportTitle}>Relatório {index + 1}</h3>
                  <p className={styles.reportDate}>
                    Data: {new Date(report.created_at).toLocaleDateString()}
                  </p>
                  { report.file ? (
                    <a
                    href={report.file}
                    target="_blank"
                    className={styles.downloadLink}
                  >
                    Ver
                  </a>
                  ) : (
                    <span className={styles.noFile}>Sem arquivo</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h1 className={styles.courseTitle}>Nenhum relatório encontrado</h1>
        </div>
      )}
    </div>
  );
}
