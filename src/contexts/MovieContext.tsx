import { useEffect, useState, createContext, ReactNode } from 'react';

import { api } from '../services/api';

type GenreResponseProps = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type MovieProps = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type MovieContextType = {
  genres: Array<GenreResponseProps>;
  movies: Array<MovieProps>;
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

type MovieContextProviderProps = {
  children: ReactNode;
}

export const MovieContext = createContext({} as MovieContextType);

export function MovieContextProvider(props: MovieContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MovieContext.Provider value={{
      genres,
      movies,
      selectedGenre,
      selectedGenreId,
      handleClickButton
    }}>
      {props.children}
    </MovieContext.Provider>
  );
}
