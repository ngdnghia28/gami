// Vietnamese lunar calendar utilities

const ZODIAC_ANIMALS = [
  'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 
  'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
];

const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const ZODIAC_SIGNS = [
  'Ma Kết', 'Bảo Bình', 'Song Ngư', 'Bạch Dương', 'Kim Ngưu', 'Song Tử',
  'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Bọ Cạp', 'Nhân Mã'
];

export interface CalendarDay {
  date: number;
  lunarDay: string;
  zodiacAnimal: string;
  isToday: boolean;
  isCurrentMonth: boolean;
}

export function generateCalendarDays(currentDate: Date): CalendarDay[] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Get previous month's last days
  const prevMonth = new Date(year, month - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  const days: CalendarDay[] = [];
  
  // Previous month days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = daysInPrevMonth - i;
    const lunarInfo = convertSolarToLunar(year, month, date);
    days.push({
      date,
      lunarDay: lunarInfo.lunarDay,
      zodiacAnimal: ZODIAC_ANIMALS[date % 12],
      isToday: false,
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const lunarInfo = convertSolarToLunar(year, month + 1, date);
    const isToday = today.getFullYear() === year && 
                   today.getMonth() === month && 
                   today.getDate() === date;
    
    days.push({
      date,
      lunarDay: lunarInfo.lunarDay,
      zodiacAnimal: ZODIAC_ANIMALS[(date - 1) % 12],
      isToday,
      isCurrentMonth: true
    });
  }
  
  // Next month days to fill grid
  const remainingDays = 42 - days.length; // 6 weeks * 7 days
  for (let date = 1; date <= remainingDays; date++) {
    const lunarInfo = convertSolarToLunar(year, month + 2, date);
    days.push({
      date,
      lunarDay: lunarInfo.lunarDay,
      zodiacAnimal: ZODIAC_ANIMALS[date % 12],
      isToday: false,
      isCurrentMonth: false
    });
  }
  
  return days;
}

export function convertSolarToLunar(year: number, month: number, day: number) {
  // Simplified lunar conversion - in real implementation, use proper lunar calendar algorithms
  const baseDate = new Date(year, month - 1, day);
  const dayOfYear = Math.floor((baseDate.getTime() - new Date(year, 0, 1).getTime()) / (24 * 60 * 60 * 1000));
  
  // Approximate lunar month calculation
  const lunarMonth = Math.floor(dayOfYear / 29.5) + 1;
  const lunarDay = (dayOfYear % 30) + 1;
  
  const canIndex = (year * 12 + month + day) % 10;
  const chiIndex = (year * 12 + month + day) % 12;
  
  const zodiacIndex = month % 12;
  
  return {
    lunarDay: lunarDay <= 15 ? `Mùng ${lunarDay}` : `${lunarDay}`,
    lunarMonth: `Tháng ${lunarMonth} Năm ${getYearName(year)}`,
    canChi: `${CAN[canIndex]} ${CHI[chiIndex]}`,
    zodiacSign: ZODIAC_SIGNS[zodiacIndex],
    zodiacAnimal: `${CHI[chiIndex]} (${getAnimalName(chiIndex)})`,
    season: getSeason(month),
    description: getDateDescription(month, day)
  };
}

export function getCurrentLunarInfo() {
  const today = new Date();
  const lunar = convertSolarToLunar(today.getFullYear(), today.getMonth() + 1, today.getDate());
  
  return {
    solarDate: today.toLocaleDateString('vi-VN'),
    lunarDate: lunar.lunarDay + ' ' + lunar.lunarMonth,
    canChi: lunar.canChi,
    zodiacSign: lunar.zodiacSign,
    luckyHours: 'Tý, Dần, Mão'
  };
}

function getYearName(year: number): string {
  const canIndex = (year - 4) % 10;
  const chiIndex = (year - 4) % 12;
  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

function getAnimalName(chiIndex: number): string {
  const animals = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Heo'];
  return animals[chiIndex];
}

function getSeason(month: number): string {
  if (month >= 12 || month <= 2) return 'Đông Chí';
  if (month >= 3 && month <= 5) return 'Xuân Phân';
  if (month >= 6 && month <= 8) return 'Hạ Chí';
  return 'Thu Phân';
}

function getDateDescription(month: number, day: number): string {
  const descriptions = [
    'Ngày này thuộc tuần lễ Đại Tuyết, thời tiết trở lạnh. Phù hợp cho việc cúng tế tổ tiên và làm việc nhà.',
    'Ngày đẹp cho việc khởi công xây dựng và giao dịch kinh doanh.',
    'Thích hợp cho việc cưới hỏi và tổ chức lễ hội.',
    'Ngày tốt để du lịch và gặp gỡ bạn bè.'
  ];
  return descriptions[(month + day) % descriptions.length];
}
