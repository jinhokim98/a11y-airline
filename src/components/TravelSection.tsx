import { useState } from 'react';

import travelItem01 from '../assets/travel-item-01.png';
import travelItem02 from '../assets/travel-item-02.png';
import travelItem03 from '../assets/travel-item-03.png';
import chevronLeft from '../assets/chevron-left.svg';
import chevronRight from '../assets/chevron-right.svg';

import styles from './TravelSection.module.css';

interface TravelOption {
  departure: string;
  destination: string;
  type: string;
  price: number;
  image: string;
  link: string;
}

const travelOptions: TravelOption[] = [
  {
    departure: '서울/인천',
    destination: '두바이',
    type: '일반석 왕복',
    price: 1121600,
    image: travelItem01,
    link: 'https://koreanairkp.kaltour.com/ProductOverseas/OverseasList?TOURTYP=KALPAK&PKGBRA=KP&PKGARE=E5&REGNB1=%uC720%uB7FD&REGNB2=%uC911%uB3D9&REGTOP=1'
  },
  {
    departure: '서울/인천',
    destination: '바르셀로나',
    type: '일반석 왕복',
    price: 1515200,
    image: travelItem02,
    link: 'https://koreanairkp.kaltour.com/ProductOverseas/OverseasView?pkgpnh=KP44129'
  },
  {
    departure: '서울/인천',
    destination: '로마',
    type: '일반석 왕복',
    price: 1415800,
    image: travelItem03,
    link: 'https://koreanairkp.kaltour.com/ProductOverseas/OverseasView?pkgpnh=KP41216'
  }
];

const TravelSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTravel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % travelOptions.length);
  };

  const prevTravel = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + travelOptions.length) % travelOptions.length);
  };

  const readCarouselItem = (item: TravelOption) => {
    return `출발지 ${item.departure}, 도착지 ${item.destination}, ${
      item.type
    }, 가격은 ${item.price.toLocaleString()}원 입니다. 클릭하면 예약 페이지로 이동합니다.`;
  };

  return (
    <div className={styles.travelSection}>
      <p className="visually-hidden" role="status" aria-live="polite">{`${
        travelOptions.length
      }개의 여행상품 중 ${currentIndex + 1}번 째 상품: ${readCarouselItem(
        travelOptions[currentIndex]
      )}`}</p>

      <section className={styles.carousel}>
        {travelOptions.map((option, index) => (
          <a
            key={index}
            className={`${styles.card} ${index === currentIndex ? styles.cardActive : ''}`}
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={readCarouselItem(option)}
          >
            <img src={option.image} className={styles.cardImage} alt="" />
            <div className={styles.cardContent}>
              <p className={`${styles.cardTitle} heading-3-text`}>
                {option.departure} - {option.destination}
              </p>
              <p className={`${styles.cardType} body-text`}>{option.type}</p>
              <p className={`${styles.cardPrice} body-text`}>KRW {option.price.toLocaleString()}</p>
            </div>
          </a>
        ))}
      </section>

      <button
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        onClick={prevTravel}
        aria-label="이전 여행 상품 보기"
      >
        <img src={chevronLeft} className={styles.navButtonIcon} alt="이전" />
      </button>
      <button
        className={`${styles.navButton} ${styles.navButtonNext}`}
        onClick={nextTravel}
        aria-label="다음 여행 상품 보기"
      >
        <img src={chevronRight} className={styles.navButtonIcon} alt="다음" />
      </button>
    </div>
  );
};

export default TravelSection;