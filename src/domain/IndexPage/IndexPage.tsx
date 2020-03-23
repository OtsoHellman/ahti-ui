import React, { useEffect } from 'react';
import { Koros } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import HeroBanner from '../../common/ui-components/HeroBanner/HeroBanner';
import ListView from '../../common/ui-components/ListView/ListView';
import { useOvermind } from '../overmind';
import CategoryNavigation from '../../common/ui-components/CategoryNavigation/CategoryNavigation';
import { Feature, useFeaturesQuery } from '../api/generated/types.d';
import styles from './IndexPage.module.scss';
import ImageWithCard from '../../common/ui-components/ImageWithCard/ImageWithCard';
import { useScrollToTop } from '../../common/utils/hooks';
import PromotionCard from '../../common/ui-components/PromotionCard/PromotionCard';
import { featuresLens } from '../../common/utils/lenses';

const IndexPage: React.FC = () => {
  const { state, actions } = useOvermind();
  const { data, refetch } = useFeaturesQuery({
    variables: {
      first: 4,
      category: ['ahti:category:restaurant', 'ahti:category:cafe']
    }
  });
  const { t, i18n } = useTranslation();
  const history = useHistory();
  useScrollToTop();

  useEffect(() => {
    refetch();
  }, [i18n.language, refetch]);

  const makeFilterFromCategoryId = (categoryId: string) => {
    return {
      id: categoryId
    };
  };

  return (
    <div className={classNames(styles.pageContainer)}>
      {/* <ImageWithCard
        src={'/images/landing.png'}
        className={classNames(styles.imageWithCard, styles.topImageWithCard)}
      >
        <section className={styles.imageWithCardSection}>
          <h1>{t('index.main_header')}</h1>
          <Link className={styles.link} to={'/content'}>
            {t('index.see_all_button')}
          </Link>
        </section>
      </ImageWithCard>

      <div className={styles.korosContainer}>
        <Koros className={styles.koros} />
      </div> */}
      <HeroBanner>
        <h1>{t('index.main_header')}</h1>
        <Link className={styles.link} to={'/content'}>
          {t('index.see_all_button')}
        </Link>
      </HeroBanner>
      <section className={styles.section}>
        <h2>{t('index.section1_header')}</h2>
        <p>{t('index.section1_paragraph')}</p>
        <CategoryNavigation
          translated={true}
          categories={state.availableCategories.map(makeFilterFromCategoryId)}
          onClick={(categoryId: string) => {
            actions.addCategoryFilter(makeFilterFromCategoryId(categoryId));
            history.push('/content');
          }}
        />
      </section>

      <section className={styles.section}>
        <h2>{t('index.section3_header')}</h2>
        {data && (
          <ListView
            onClick={(feature: Feature) => {
              actions.selectFeature(feature);
              history.push('/content');
            }}
            features={featuresLens.get(data)}
          />
        )}
        <Link
          className={styles.link}
          to={'/content'}
          onClick={() => {
            actions.addCategoryFilter(
              makeFilterFromCategoryId('ahti:category:restaurant')
            );
          }}
        >
          {t('index.section3_button')}
        </Link>
      </section>

      <PromotionCard
        imageSrc={'/images/new_in_ahti.jpg'}
        header={t('index.section5_header')}
        text={t('index.section5_paragraph')}
        link={'/new'}
        linkText={t('index.section5_link')}
        className={styles.imageWithCardSection}
      />
    </div>
  );
};

export default IndexPage;
