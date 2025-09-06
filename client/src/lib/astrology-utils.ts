// Vietnamese astrology calculation utilities

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const ZODIAC_ANIMALS = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Heo'];

const DESTINIES = [
  'Hải Trung Kim', 'Lộ Bàng Thổ', 'Đại Khê Thủy', 'Lư Trung Hỏa',
  'Đại Lâm Mộc', 'Lộ Bàng Thổ', 'Kiếm Phong Kim', 'Sơn Đầu Hỏa',
  'Bình Địa Mộc', 'Bích Thượng Thổ', 'Kim Bạch Kim', 'Phúc Đăng Hỏa'
];

const PERSONALITY_TRAITS = {
  'Tý': 'Thông minh, linh hoạt, có khả năng thích nghi tốt',
  'Sửu': 'Chăm chỉ, kiên nhẫn, có trách nhiệm',
  'Dần': 'Can đảm, quyết đoán, có khả năng lãnh đạo',
  'Mão': 'Nhạy cảm, tận tâm, có tính nghệ thuật',
  'Thìn': 'Năng động, thích tự do và phiêu lưu',
  'Tỵ': 'Thông thái, bí ẩn, có trực giác tốt',
  'Ngọ': 'Năng động, thích tự do và phiêu lưu',
  'Mùi': 'Hiền lành, sáng tạo, yêu thích nghệ thuật',
  'Thân': 'Thông minh, tò mò, thích khám phá',
  'Dậu': 'Cẩn thận, có tổ chức, thích sự hoàn hảo',
  'Tuất': 'Trung thành, đáng tin cậy, có lòng nhân ái',
  'Hợi': 'Chân thành, hào phóng, yêu thích hòa bình'
};

export interface BirthInfo {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  gender: string;
  birthPlace?: string;
}

export interface AstrologyResult {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  zodiacAnimal: string;
  destiny: string;
  age: number;
  personality: string;
}

export function calculateAstrology(birthInfo: BirthInfo): AstrologyResult {
  const { year, month, day, hour, gender } = birthInfo;
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  // Calculate Four Pillars (Tứ Trụ)
  const yearPillar = getYearPillar(year);
  const monthPillar = getMonthPillar(year, month);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(hour);

  // Get zodiac animal
  const chiIndex = (year - 4) % 12;
  const zodiacAnimal = `${CHI[chiIndex]} (${ZODIAC_ANIMALS[chiIndex]})`;

  // Get destiny (Mệnh)
  const destinyIndex = (year % 12);
  const destiny = DESTINIES[destinyIndex];

  // Get personality traits
  const personality = PERSONALITY_TRAITS[CHI[chiIndex]] || 'Có tính cách độc đáo và thú vị';

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    zodiacAnimal,
    destiny,
    age,
    personality
  };
}

function getYearPillar(year: number): string {
  const canIndex = (year - 4) % 10;
  const chiIndex = (year - 4) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

function getMonthPillar(year: number, month: number): string {
  // Simplified calculation for month pillar
  const canIndex = ((year - 4) * 12 + month - 1) % 10;
  const chiIndex = (month - 1) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

function getDayPillar(year: number, month: number, day: number): string {
  // Simplified calculation for day pillar
  const totalDays = getDaysSinceEpoch(year, month, day);
  const canIndex = totalDays % 10;
  const chiIndex = totalDays % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

function getHourPillar(hour: number): string {
  // Convert 24-hour format to traditional Chinese hour system
  const chiIndex = Math.floor((hour + 1) / 2) % 12;
  // Hour pillar can is based on day pillar, simplified here
  const canIndex = (hour / 2) % 10;
  return `${CAN[Math.floor(canIndex)]} ${CHI[chiIndex]}`;
}

function getDaysSinceEpoch(year: number, month: number, day: number): number {
  // Calculate days since a reference date for can-chi calculation
  const referenceDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const timeDiff = targetDate.getTime() - referenceDate.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}
