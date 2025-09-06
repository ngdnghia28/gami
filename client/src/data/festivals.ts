export interface Festival {
  name: string;
  date: string;
  image: string;
  description: string;
}

export const festivals: Festival[] = [
  {
    name: "Tết Nguyên Đán",
    date: "Mùng 1 tháng Giêng",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Tết cổ truyền Việt Nam, ngày quan trọng nhất trong năm"
  },
  {
    name: "Tết Trung Thu",
    date: "Rằm tháng 8",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Lễ hội trung thu với bánh trung thu và đèn lồng"
  },
  {
    name: "Phật Đản",
    date: "Mùng 8 tháng 4",
    image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Lễ kỷ niệm ngày sinh của Đức Phật"
  },
  {
    name: "Tết Trung Nguyên",
    date: "Rằm tháng 7",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Lễ cúng cầu siêu cho các linh hồn"
  },
  {
    name: "Tết Đoan Ngọ",
    date: "Mùng 5 tháng 5",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Lễ hội giữa mùa hè, ăn bánh ít"
  },
  {
    name: "Tết Hàn Thực",
    date: "Mùng 3 tháng 3",
    image: "https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    description: "Lễ tảo mộ và thờ cúng tổ tiên"
  }
];
