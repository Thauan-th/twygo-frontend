"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Report {
  file: string;
  created_at: string;
}

const fetchReports = async (slug: string) => {
  const response = await axios.get(`http://localhost:3000/courses/${slug}/reports/`);
  return response.data.results;
};

const requestNewReport = async (slug: string) => {
  const response = await axios.post(`http://localhost:3000/courses/${slug}/reports`);
  return response.data;
};

export default function Page() {
  const { slug } = useParams() as { slug: string };

  const { isPending, error, data, isLoading, refetch } = useQuery<Report[]>({
    queryKey: ["courses"],
    queryFn: () => fetchReports(slug),
  });

  const handleRequestNewReport = async () => {
    const result = await requestNewReport(slug);
    if (result?.error) {
      alert("Erro ao criar o relatório.");
    } else {
      alert("Relatório criado com sucesso.");
      refetch();
    }
  };

  const reports = data || [];

  return (
    <div className={styles.container}>
      <Link href={`/courses/${slug}`} className={styles.backLink}>
        Voltar
      </Link>

      <div className={styles.newReport}>
        <button
          className={styles.newReportButton}
          onClick={handleRequestNewReport}
          disabled={isLoading}
        >
          {isLoading ? "Criando..." : "Novo Relatório"}
        </button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro ao carregar relatórios</p>
      ) : reports.length > 0 ? (
        <ul className={styles.reportList}>
          {reports.map((report, index) => (
            <li key={index} className={styles.reportItem}>
              <div className={styles.reportDetails}>
                <h3 className={styles.reportTitle}>Relatório {index + 1}</h3>
                <p className={styles.reportDate}>Data: {report.created_at}</p>
                {report.file ? (
                  <a href={report.file} target="_blank" className={styles.downloadLink}>
                    Ver
                  </a>
                ) : (
                  <span className={styles.noFile}>Sem arquivo</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className={styles.courseTitle}>Nenhum relatório encontrado</h1>
      )}
    </div>
  );
}
