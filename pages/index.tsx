import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AbrFileLoader from '../components/BrushFilePicker';
import BrushSetImages from '../components/BrushSetImages';
import { useStore } from '../stores/store';
import { ContainerLayout } from '../components/Layout';
import BrushSetExportCard from '../components/BrushSetExportCard';

const Home: NextPage = () => {
  const brushes = useStore(state => state.brushes);

  return (
    <div className={styles.container}>
      <ContainerLayout>
        <AbrFileLoader />
        {brushes && <BrushSetExportCard />}
        {brushes && <BrushSetImages />}
      </ContainerLayout>
    </div>
  )
}

export default Home
