"use client"
import styles from "./page.module.css";
import Calendar from "./Calendar";

export default function Home() {
  return (
    <main className={styles.main}>
      <Calendar />
    </main>
  );
}
