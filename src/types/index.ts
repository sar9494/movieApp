export type MovieType = {
  title: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  overview: string;
  genres: Array<{ id: number; name: string }>;
  vote_count: number;
  id: string | string[] | undefined;
  genre_ids: number[];
};
