import { MainPage } from './components/MainPage/MainPage';

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Brand-thing!</h1>
        <MainPage />
      </div>
    </main>
  )
}
