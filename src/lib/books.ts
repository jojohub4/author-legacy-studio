import shadowsCover from "@/assets/book-shadows.jpg";
import godsCover from "@/assets/book-gods.jpg";
import confessionsCover from "@/assets/book-confessions.jpg";

export type Book = {
  slug: string;
  title: string;
  cover: string;
  year: number;
  releaseDate: string;
  genre: string;
  themes: string[];
  pages: number;
  readingTime: string;
  isbn: string;
  publisher: string;
  synopsis: string;
  longDescription: string;
  formats: string[];
  links: { label: string; url: string }[];
  featured?: boolean;
};

export const BOOKS: Book[] = [
  {
    slug: "confessions-from-the-cells",
    title: "Confessions From the Cells",
    cover: confessionsCover,
    year: 2026,
    releaseDate: "February 5, 2026",
    genre: "Christian Fiction",
    themes: ["Redemption", "Faith", "Guilt", "Justice", "Hope"],
    pages: 198,
    readingTime: "About 1 hour",
    isbn: "9798233828065",
    publisher: "Antony Kagucia",
    synopsis:
      "Father Gabriel serves as chaplain in a maximum-security prison, hearing confessions from men society has forgotten while confronting his own past failure.",
    longDescription:
      "Father Gabriel serves as chaplain in a maximum-security prison, hearing confessions from men society has forgotten while confronting his own past failure. Amid violence, despair, and fragile hope behind bars, he learns redemption begins when guilt is faced honestly and every life, even the condemned, is truly heard.",
    formats: ["EPUB", "Digital"],
    links: [
      { label: "Read on Everand", url: "https://www.everand.com/book/993136128/Confessions-From-the-Cells" },
      { label: "Preview", url: "https://www.everand.com/read/993136128/Confessions-From-the-Cells" },
    ],
    featured: true,
  },
  {
    slug: "gods-or-satans",
    title: "God's or Satan's",
    cover: godsCover,
    year: 2025,
    releaseDate: "September 5, 2025",
    genre: "Religion & Spirituality · Essays",
    themes: ["Integrity", "Choice", "Faith", "Philosophy", "Purpose"],
    pages: 137,
    readingTime: "About 1 hour",
    isbn: "9798232696535",
    publisher: "Antony Kagucia",
    synopsis:
      "A timely exploration of daily struggles — integrity, relationships, work, and power — through spirituality, philosophy, and psychology.",
    longDescription:
      "Life is shaped by choices, each revealing allegiance to God or Satan. This book explores daily struggles — integrity, relationships, work, and power — through spirituality, philosophy, psychology, and real-life examples. With clarity and challenge, it calls readers to live with purpose and courage, asking the timeless question: Whose are you?",
    formats: ["EPUB", "Digital"],
    links: [
      { label: "Read on Everand", url: "https://www.everand.com/book/911917454/God-s-or-Satan-s" },
      { label: "Buy on Angus & Robertson", url: "https://www.angusrobertson.com.au/ebooks/gods-or-satans-antony-wainaina-kagucia/p/9798232696535" },
      { label: "Preview", url: "https://www.everand.com/read/911917454/God-s-or-Satan-s" },
    ],
  },
  {
    slug: "shadows-of-wealth",
    title: "Shadows Of Wealth",
    cover: shadowsCover,
    year: 2025,
    releaseDate: "August 11, 2025",
    genre: "Literary Fiction · Family Saga",
    themes: ["Inheritance", "Betrayal", "Power", "Family", "Legacy"],
    pages: 142,
    readingTime: "About 2 hours",
    isbn: "9798231459841",
    publisher: "Antony Kagucia",
    synopsis:
      "A powerful Kenyan businessman dies and leaves his son a locked briefcase, cryptic coordinates to Gdańsk, and a hidden empire stretching across continents.",
    longDescription:
      "When Patrick Mwangi, a powerful and enigmatic Kenyan businessman, dies unexpectedly, his only son, Philip, inherits more than just property — he inherits a labyrinth of secrets. Among his father's meticulously guarded possessions lies a locked briefcase, a set of mysterious coordinates pointing to Gdańsk, Poland, and the cryptic name of a long-dead priest in rural Kitui. As Philip begins to follow the clues, he discovers a hidden empire stretching across continents — land titles in Africa, offshore companies in tax havens, and coded documents that suggest a fortune built on alliances few dared to speak of. From Nairobi's affluent Karen estates to dusty parish archives, from whispered family warnings to international trails of gold coins and shadowy villas, Philip must navigate a world where wealth is both shield and weapon. In Shadows of Wealth, loyalty and betrayal walk hand in hand, and truth has a price only the brave are willing to pay.",
    formats: ["EPUB", "Digital"],
    links: [
      { label: "Read on Everand", url: "https://www.everand.com/book/900707514/Shadows-Of-Wealth" },
      { label: "Preview", url: "https://www.everand.com/read/900707514/Shadows-Of-Wealth" },
    ],
  },
];

export const getBook = (slug: string) => BOOKS.find((b) => b.slug === slug);
export const featuredBook = () => BOOKS.find((b) => b.featured) ?? BOOKS[0];
