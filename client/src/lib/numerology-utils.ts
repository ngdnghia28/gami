// Vietnamese Numerology calculation utilities

const VIETNAMESE_ALPHABET_VALUES: { [key: string]: number } = {
  'A': 1, 'Á': 1, 'À': 1, 'Ả': 1, 'Ã': 1, 'Ạ': 1,
  'Ă': 1, 'Ắ': 1, 'Ằ': 1, 'Ẳ': 1, 'Ẵ': 1, 'Ặ': 1,
  'Â': 1, 'Ấ': 1, 'Ầ': 1, 'Ẩ': 1, 'Ẫ': 1, 'Ậ': 1,
  'B': 2, 'C': 3, 'D': 4, 'Đ': 4,
  'E': 5, 'É': 5, 'È': 5, 'Ẻ': 5, 'Ẽ': 5, 'Ẹ': 5,
  'Ê': 5, 'Ế': 5, 'Ề': 5, 'Ể': 5, 'Ễ': 5, 'Ệ': 5,
  'F': 6, 'G': 7, 'H': 8,
  'I': 9, 'Í': 9, 'Ì': 9, 'Ỉ': 9, 'Ĩ': 9, 'Ị': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5,
  'O': 6, 'Ó': 6, 'Ò': 6, 'Ỏ': 6, 'Õ': 6, 'Ọ': 6,
  'Ô': 6, 'Ố': 6, 'Ồ': 6, 'Ổ': 6, 'Ỗ': 6, 'Ộ': 6,
  'Ơ': 6, 'Ớ': 6, 'Ờ': 6, 'Ở': 6, 'Ỡ': 6, 'Ợ': 6,
  'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2,
  'U': 3, 'Ú': 3, 'Ù': 3, 'Ủ': 3, 'Ũ': 3, 'Ụ': 3,
  'Ư': 3, 'Ứ': 3, 'Ừ': 3, 'Ử': 3, 'Ữ': 3, 'Ự': 3,
  'V': 4, 'W': 5, 'X': 6,
  'Y': 7, 'Ý': 7, 'Ỳ': 7, 'Ỷ': 7, 'Ỹ': 7, 'Ỵ': 7,
  'Z': 8
};

const LIFE_PATH_MEANINGS: { [key: number]: string } = {
  1: "Người lãnh đạo tự nhiên, độc lập và sáng tạo. Bạn có khả năng khởi xướng và dẫn dắt người khác.",
  2: "Người hợp tác, nhạy cảm và có khả năng ngoại giao. Bạn thích làm việc nhóm và tạo sự hòa hợp.",
  3: "Người sáng tạo, giao tiếp tốt và có khiếu nghệ thuật. Bạn có khả năng truyền cảm hứng cho người khác.",
  4: "Người thực tế, có kỷ luật và đáng tin cậy. Bạn thích sự ổn định và làm việc có hệ thống.",
  5: "Người yêu tự do, phiêu lưu và thích khám phá. Bạn cần sự đa dạng và thay đổi trong cuộc sống.",
  6: "Người có trách nhiệm, yêu thương gia đình và thích chăm sóc người khác. Bạn là người đáng tin cậy.",
  7: "Người tìm kiếm sự thật, có trực giác mạnh và thích nghiên cứu. Bạn có khả năng phân tích sâu sắc.",
  8: "Người có tham vọng, thực tế và có khả năng quản lý tài chính. Bạn hướng đến thành công vật chất.",
  9: "Người có lòng nhân ái, rộng lượng và muốn giúp đỡ nhân loại. Bạn có tầm nhìn toàn cầu.",
  11: "Số chủ đạo - Người có trực giác mạnh, nhạy cảm tâm linh và có khả năng truyền cảm hứng đặc biệt.",
  22: "Số chủ đạo - Người có khả năng biến ước mơ thành hiện thực, xây dựng những điều vĩ đại cho nhân loại.",
  33: "Số chủ đạo - Người thầy tâm linh, có khả năng chữa lành và nâng cao ý thức của người khác."
};

const EXPRESSION_NUMBER_MEANINGS: { [key: number]: string } = {
  1: "Bạn được sinh ra để lãnh đạo và tạo ra những điều mới mẻ. Khả năng khởi nghiệp và độc lập rất cao.",
  2: "Bạn có thiên hướng hợp tác và tạo sự cân bằng. Giỏi trong việc làm trung gian và ngoại giao.",
  3: "Bạn có tài năng giao tiếp và sáng tạo. Thích thể hiện bản thân qua nghệ thuật và lời nói.",
  4: "Bạn có khả năng tổ chức và xây dựng. Thích làm việc có kế hoạch và hệ thống rõ ràng.",
  5: "Bạn thích khám phá và trải nghiệm. Có khả năng thích nghi tốt với sự thay đổi.",
  6: "Bạn có tính cách chăm sóc và bảo vệ. Thích tạo ra môi trường hòa hợp cho mọi người.",
  7: "Bạn có khuynh hướng nghiên cứu và tìm hiểu. Thích suy ngẫm và phân tích sâu sắc.",
  8: "Bạn có năng lực kinh doanh và quản lý. Hướng đến thành công và địa vị trong xã hội.",
  9: "Bạn có lòng bác ái và muốn phục vụ nhân loại. Thích giúp đỡ và chia sẻ với người khác."
};

const PERSONALITY_NUMBER_MEANINGS: { [key: number]: string } = {
  1: "Người khác nhìn bạn như một người lãnh đạo, tự tin và quyết đoán.",
  2: "Người khác cảm thấy bạn dễ gần, hòa đồng và đáng tin cậy.",
  3: "Người khác thấy bạn vui vẻ, sáng tạo và có khả năng giao tiếp tốt.",
  4: "Người khác nhận thấy bạn đáng tin cậy, thực tế và có kỷ luật.",
  5: "Người khác cảm thấy bạn thú vị, tự do và đầy năng lượng.",
  6: "Người khác nhìn bạn như một người ấm áp, quan tâm và có trách nhiệm.",
  7: "Người khác thấy bạn bí ẩn, thông thái và có chiều sâu tư duy.",
  8: "Người khác nhận thấy bạn thành đạt, có thẩm quyền và đáng kính trọng.",
  9: "Người khác cảm thấy bạn từ bi, rộng lượng và có tâm hồn đẹp."
};

export interface BirthInfo {
  day: number;
  month: number;
  year: number;
  fullName: string;
}

export interface NumerologyResult {
  lifePathNumber: number;
  expressionNumber: number;
  personalityNumber: number;
  birthdayNumber: number;
  lifePathMeaning: string;
  expressionMeaning: string;
  personalityMeaning: string;
  luckyNumbers: number[];
  challenges: string[];
  opportunities: string[];
  compatibleNumbers: number[];
}

export function calculateNumerology(birthInfo: BirthInfo): NumerologyResult {
  const { day, month, year, fullName } = birthInfo;

  // Calculate Life Path Number
  const lifePathNumber = calculateLifePathNumber(day, month, year);
  
  // Calculate Expression Number (from full name)
  const expressionNumber = calculateExpressionNumber(fullName);
  
  // Calculate Personality Number (from consonants in name)
  const personalityNumber = calculatePersonalityNumber(fullName);
  
  // Birthday Number is just the birth day reduced
  const birthdayNumber = reduceToSingleDigit(day);

  return {
    lifePathNumber,
    expressionNumber,
    personalityNumber,
    birthdayNumber,
    lifePathMeaning: LIFE_PATH_MEANINGS[lifePathNumber] || "Số đặc biệt với ý nghĩa sâu sắc riêng.",
    expressionMeaning: EXPRESSION_NUMBER_MEANINGS[expressionNumber] || "Bạn có những tài năng độc đáo cần được khám phá.",
    personalityMeaning: PERSONALITY_NUMBER_MEANINGS[personalityNumber] || "Bạn để lại ấn tượng đặc biệt với người khác.",
    luckyNumbers: getLuckyNumbers(lifePathNumber, expressionNumber, personalityNumber),
    challenges: getChallenges(lifePathNumber),
    opportunities: getOpportunities(lifePathNumber),
    compatibleNumbers: getCompatibleNumbers(lifePathNumber)
  };
}

function calculateLifePathNumber(day: number, month: number, year: number): number {
  const total = day + month + year;
  return reduceToMasterNumber(total);
}

function calculateExpressionNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/g, '');
  let total = 0;
  
  for (let char of cleanName) {
    total += VIETNAMESE_ALPHABET_VALUES[char] || 0;
  }
  
  return reduceToSingleDigit(total);
}

function calculatePersonalityNumber(fullName: string): number {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ]/g, '');
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZĐ';
  let total = 0;
  
  for (let char of cleanName) {
    if (consonants.includes(char.charAt(0))) {
      total += VIETNAMESE_ALPHABET_VALUES[char] || 0;
    }
  }
  
  return reduceToSingleDigit(total);
}

function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = Math.floor(num / 10) + (num % 10);
  }
  return num;
}

function reduceToMasterNumber(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = Math.floor(num / 10) + (num % 10);
  }
  return num;
}

function getLuckyNumbers(lifePathNumber: number, expressionNumber: number, personalityNumber: number): number[] {
  const baseNumbers = [lifePathNumber, expressionNumber, personalityNumber];
  const luckyNumbers = [...baseNumbers];
  
  // Add some derived lucky numbers
  luckyNumbers.push((lifePathNumber + expressionNumber) % 9 + 1);
  luckyNumbers.push((expressionNumber + personalityNumber) % 9 + 1);
  luckyNumbers.push((lifePathNumber + personalityNumber) % 9 + 1);
  
  // Remove duplicates and sort
  return [...new Set(luckyNumbers)].sort((a, b) => a - b);
}

function getChallenges(lifePathNumber: number): string[] {
  const challengeMap: { [key: number]: string[] } = {
    1: ["Có thể trở nên quá độc đoán", "Cần học cách hợp tác với người khác"],
    2: ["Đôi khi quá nhạy cảm", "Cần tự tin hơn trong quyết định"],
    3: ["Có thể bị phân tán", "Cần tập trung vào mục tiêu chính"],
    4: ["Có thể quá cứng nhắc", "Cần mở lòng với sự thay đổi"],
    5: ["Có thể thiếu kiên nhẫn", "Cần học cách cam kết lâu dài"],
    6: ["Có thể quá lo lắng cho người khác", "Cần chăm sóc bản thân"],
    7: ["Có thể quá cô độc", "Cần chia sẻ kiến thức với người khác"],
    8: ["Có thể quá tập trung vào vật chất", "Cần cân bằng cuộc sống"],
    9: ["Có thể quá lý tưởng", "Cần thực tế hơn trong hành động"],
    11: ["Áp lực từ trực giác mạnh", "Cần học cách kiểm soát năng lượng"],
    22: ["Áp lực từ kỳ vọng cao", "Cần kiên nhẫn với quá trình phát triển"],
    33: ["Gánh nặng trách nhiệm tâm linh", "Cần học cách bảo vệ năng lượng"]
  };
  
  return challengeMap[lifePathNumber] || ["Thử thách độc đáo cần khám phá"];
}

function getOpportunities(lifePathNumber: number): string[] {
  const opportunityMap: { [key: number]: string[] } = {
    1: ["Khởi nghiệp và lãnh đạo", "Tạo ra những ý tưởng mới"],
    2: ["Làm việc trong lĩnh vực tư vấn", "Xây dựng mối quan hệ"],
    3: ["Phát triển tài năng nghệ thuật", "Giao tiếp và truyền thông"],
    4: ["Xây dựng và tổ chức", "Quản lý dự án lớn"],
    5: ["Du lịch và khám phá", "Công việc đa dạng và thú vị"],
    6: ["Chăm sóc sức khỏe và giáo dục", "Tạo môi trường gia đình hạnh phúc"],
    7: ["Nghiên cứu và phân tích", "Phát triển tâm linh"],
    8: ["Kinh doanh và tài chính", "Đạt được thành công vật chất"],
    9: ["Hoạt động xã hội và từ thiện", "Giúp đỡ cộng đồng"],
    11: ["Truyền cảm hứng cho người khác", "Phát triển khả năng tâm linh"],
    22: ["Xây dựng những dự án lớn", "Tạo tác động tích cực toàn cầu"],
    33: ["Chữa lành và giáo dục", "Nâng cao ý thức nhân loại"]
  };
  
  return opportunityMap[lifePathNumber] || ["Cơ hội đặc biệt đang chờ đợi"];
}

function getCompatibleNumbers(lifePathNumber: number): number[] {
  const compatibilityMap: { [key: number]: number[] } = {
    1: [1, 5, 7],
    2: [2, 4, 6, 8],
    3: [3, 6, 9],
    4: [2, 4, 6, 8],
    5: [1, 5, 7],
    6: [2, 3, 6, 9],
    7: [1, 5, 7],
    8: [2, 4, 6, 8],
    9: [3, 6, 9],
    11: [2, 11],
    22: [4, 22],
    33: [6, 33]
  };
  
  return compatibilityMap[lifePathNumber] || [lifePathNumber];
}