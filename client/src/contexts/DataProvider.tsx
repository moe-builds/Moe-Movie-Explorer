import { useState, type ReactNode } from "react";
import { DataContext, type Movie } from "./DataContext";

interface MyComponentProps {
  children: ReactNode;
}
export function DataProvider({ children }: MyComponentProps) {
  const MEDIA_DATABASE = [
    {
      id: "m1",
      title: "Oppenheimer",
      type: "movie",
      year: 2023,
      rating: 8.9,
      popularity: 98,
      genres: ["Drama", "Action"],
      duration: "3h 00m",
      director: "Christopher Nolan",
      cast: "Cillian Murphy, Emily Blunt, Matt Damon",
      poster:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
      overview:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
      trailer: "https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1",
    },
    {
      id: "t1",
      title: "Cyberpunk: Edgerunners",
      type: "tv",
      year: 2022,
      rating: 8.6,
      popularity: 92,
      genres: ["Anime", "Sci-Fi", "Action"],
      duration: "1 Season (10 Eps)",
      director: "Hiroyuki Imaishi",
      cast: "KENN, Aoi Yuuki, Hiroki Touchi",
      poster:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      overview:
        "A Street Kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.",
      trailer: "https://www.youtube.com/embed/JtqIas3bYhg?autoplay=1",
    },
    {
      id: "m2",
      title: "Dune: Part Two",
      type: "movie",
      year: 2024,
      rating: 8.7,
      popularity: 99,
      genres: ["Sci-Fi", "Adventure", "Action"],
      duration: "2h 46m",
      director: "Denis Villeneuve",
      cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
      poster:
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
      overview:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      trailer: "https://www.youtube.com/embed/Way9Dexny3w?autoplay=1",
    },
    {
      id: "t2",
      title: "Severance",
      type: "tv",
      year: 2022,
      rating: 8.7,
      popularity: 90,
      genres: ["Sci-Fi", "Drama"],
      duration: "2 Seasons",
      director: "Ben Stiller",
      cast: "Adam Scott, Zach Cherry, Britt Lower",
      poster:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      overview:
        "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.",
      trailer: "https://www.youtube.com/embed/xEQP4VVuyrY?autoplay=1",
    },
    {
      id: "m3",
      title: "Interstellar",
      type: "movie",
      year: 2014,
      rating: 8.7,
      popularity: 95,
      genres: ["Sci-Fi", "Drama", "Adventure"],
      duration: "2h 49m",
      director: "Christopher Nolan",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      poster:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
      overview:
        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1",
    },
    {
      id: "t3",
      title: "Arcane",
      type: "tv",
      year: 2021,
      rating: 9.0,
      popularity: 96,
      genres: ["Anime", "Action", "Sci-Fi"],
      duration: "2 Seasons",
      director: "Pascal Charrue, Arnaud Delord",
      cast: "Hailee Steinfeld, Ella Purnell, Kevin Alejandro",
      poster:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop",
      overview:
        "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.",
      trailer: "https://www.youtube.com/embed/fXmAurh072s?autoplay=1",
    },
    {
      id: "m4",
      title: "The Dark Knight",
      type: "movie",
      year: 2008,
      rating: 9.0,
      popularity: 97,
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 32m",
      director: "Christopher Nolan",
      cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
      poster:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200&auto=format&fit=crop",
      overview:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      trailer: "https://www.youtube.com/embed/EXeTwQWrcwY?autoplay=1",
    },
    {
      id: "t4",
      title: "Succession",
      type: "tv",
      year: 2018,
      rating: 8.9,
      popularity: 88,
      genres: ["Drama"],
      duration: "4 Seasons",
      director: "Jesse Armstrong",
      cast: "Brian Cox, Jeremy Strong, Sarah Snook",
      poster:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      overview:
        "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down.",
      trailer: "https://www.youtube.com/embed/OzYxJV_rmE8?autoplay=1",
    },
    {
      id: "m5",
      title: "Spider-Man: Across the Spider-Verse",
      type: "movie",
      year: 2023,
      rating: 8.7,
      popularity: 94,
      genres: ["Anime", "Action", "Adventure"],
      duration: "2h 20m",
      director: "Joaquim Dos Santos, Kemp Powers",
      cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac",
      poster:
        "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
      overview:
        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      trailer: "https://www.youtube.com/embed/cqGjhVJWtEg?autoplay=1",
    },
    {
      id: "t5",
      title: "The Last of Us",
      type: "tv",
      year: 2023,
      rating: 8.8,
      popularity: 93,
      genres: ["Drama", "Action", "Sci-Fi"],
      duration: "1 Season",
      director: "Craig Mazin, Neil Druckmann",
      cast: "Pedro Pascal, Bella Ramsey",
      poster:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
      backdrop:
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
      overview:
        "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
      trailer: "https://www.youtube.com/embed/uLtkt8BonwM?autoplay=1",
    },
  ];

  const [items, setItems] = useState<Movie[]>(MEDIA_DATABASE);

  return (
    <DataContext.Provider value={{ items, setItems }}>
      {children}
    </DataContext.Provider>
  );
}
