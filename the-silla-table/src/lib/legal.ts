import type { Locale } from '@/i18n/routing';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

// Sample legal copy for the MVP. Replace with reviewed PIPA (Korea) + GDPR (EU) text before launch.
const PRIVACY: Record<Locale, LegalSection[]> = {
  en: [
    {
      heading: 'What we collect',
      paragraphs: [
        'When you submit an inquiry we collect the information you provide: your name and email (required), and optionally your group size, preferred date, inquiry type and message.',
      ],
    },
    {
      heading: 'Why we collect it',
      paragraphs: [
        'We use this information solely to respond to your inquiry and to discuss experiences, meals or catering with you. We do not use it for any other purpose and we do not sell it.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'We retain inquiry data only as long as needed to handle your request — as a guide, up to one year — after which it is deleted. You may ask us to delete it sooner at any time.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You may request access to, correction of, restriction of, or deletion of your personal data, and you may object to its processing. To exercise any of these rights, email us at hello@thesillatable.com.',
      ],
    },
    {
      heading: 'Cookies & analytics',
      paragraphs: [
        'We use essential cookies required to run the site. Analytics cookies are loaded only after you consent via the cookie banner, and you can decline them.',
      ],
    },
  ],
  ko: [
    {
      heading: '수집하는 정보',
      paragraphs: [
        '문의를 남기실 때 제공해 주신 정보를 수집합니다: 이름과 이메일(필수), 그리고 선택적으로 인원, 희망 날짜, 문의 유형, 메시지.',
      ],
    },
    {
      heading: '수집하는 이유',
      paragraphs: [
        '이 정보는 오직 문의에 답변하고 체험·식사·케이터링을 상담하기 위해서만 사용합니다. 다른 목적으로 사용하거나 판매하지 않습니다.',
      ],
    },
    {
      heading: '보관 기간',
      paragraphs: [
        '문의 처리를 위해 필요한 기간(기준: 최대 1년) 동안만 보관하며, 이후 파기합니다. 언제든 더 이른 삭제를 요청하실 수 있습니다.',
      ],
    },
    {
      heading: '이용자의 권리',
      paragraphs: [
        '개인정보의 열람·정정·처리제한·삭제를 요청하고 처리에 이의를 제기할 수 있습니다. 이러한 권리를 행사하려면 hello@thesillatable.com 으로 연락해 주세요.',
      ],
    },
    {
      heading: '쿠키 및 분석',
      paragraphs: [
        '사이트 운영에 필요한 필수 쿠키를 사용합니다. 분석 쿠키는 쿠키 배너에서 동의하신 뒤에만 로드되며, 거부하실 수 있습니다.',
      ],
    },
  ],
};

const TERMS: Record<Locale, LegalSection[]> = {
  en: [
    {
      heading: 'Content & copyright',
      paragraphs: [
        'All text, images and other content on this site belong to The Silla Table unless stated otherwise. Please do not reproduce them without permission.',
      ],
    },
    {
      heading: 'Inquiries',
      paragraphs: [
        'Submitting an inquiry starts a conversation; it is not a confirmed booking. Availability, details and any pricing are confirmed by us directly in reply.',
      ],
    },
    {
      heading: 'Disclaimer',
      paragraphs: [
        'We aim to keep information accurate and up to date, but details such as opening hours, transport and seasonal conditions may change. Please verify time-sensitive details before you travel.',
      ],
    },
  ],
  ko: [
    {
      heading: '콘텐츠 및 저작권',
      paragraphs: [
        '이 사이트의 모든 텍스트·이미지 및 기타 콘텐츠는 별도 표기가 없는 한 The Silla Table에 귀속됩니다. 허가 없이 복제하지 말아 주세요.',
      ],
    },
    {
      heading: '문의',
      paragraphs: [
        '문의를 남기시는 것은 대화의 시작이며, 확정된 예약이 아닙니다. 가능 여부·세부 사항·가격은 저희가 답장으로 직접 확인해 드립니다.',
      ],
    },
    {
      heading: '면책',
      paragraphs: [
        '정보를 정확하고 최신으로 유지하려 노력하지만, 운영 시간·교통·계절 여건 등은 바뀔 수 있습니다. 여행 전 시의성 있는 정보는 다시 확인해 주세요.',
      ],
    },
  ],
};

export function getPrivacy(locale: Locale): LegalSection[] {
  return PRIVACY[locale] ?? PRIVACY.en;
}

export function getTerms(locale: Locale): LegalSection[] {
  return TERMS[locale] ?? TERMS.en;
}
