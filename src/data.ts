export interface User {
  index: number;
  user: string;
  twitter: string;
  title: string;
  content: string;
  bounty: string;
  link: string;
  date: number;
}

export const cards : User[] = [
  {
      index: 0,
      user: "Jane Doe",
      twitter: "@DoeADear",
      title: "Music Beat",
      content: "Make me a reggie beat with african influence.",
      bounty: "550",
      link: "/post/0",
      date: 1654105730
  },
  {
      index: 1,
      user: "John Doe",
      twitter: "@DoeRaeMe",
      title: "Drums",
      content: "Make a me a trap beat.",
      bounty: "500",
      link: "/post/1",
      date: 1654005730
  },
  {
      index: 3,
      user: "Max Payne",
      twitter: "@Maximusic",
      title: "Sax Solo needed",
      content: "I need sax solo for my mix.",
      bounty: "400",
      link: "/post/2",
      date: 1653105730
  }
  ,
  {
      index: 4,
      user: "John Wick",
      twitter: "@JWMusic",
      title: "Into Music Wanted",
      content: "I need a marketing reel for my song.",
      bounty: "1000",
      link: "/post/3",
      date: 1644105730
  }
]


