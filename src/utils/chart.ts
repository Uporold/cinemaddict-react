import { ChartData, ChartOptions } from "chart.js";
import dayjs from "dayjs";
import { Movie } from "../types";

export const BAR_HEIGHT = 50;

export const setData = (data: [string, number][]): ChartData => {
  return {
    labels: data.map((it) => {
      return `${it[0]}          ${it[1]}`;
    }),
    datasets: [
      {
        data: data.map((it) => {
          return it[1];
        }),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        barThickness: 24,
        minBarLength: 50,
      },
    ],
  };
};

export const setOptions = (): ChartOptions => {
  return {
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
};

export const TimePeriod = {
  ALL_TIME: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`,
};

export const getFilteredStatisticMovies = (
  movies: Movie[],
  filterType: string,
) => {
  const date = dayjs(new Date());
  return movies.filter((movie) => {
    const dueDate = movie.userDetails.watchingDate
      ? dayjs(movie.userDetails.watchingDate)
      : false;

    if (!dueDate || !movie.userDetails.isInWatched) {
      return false;
    }

    switch (filterType) {
      case TimePeriod.ALL_TIME:
        return date > dueDate;
      case TimePeriod.TODAY:
        return dueDate.diff(date, `day`) === 0;
      case TimePeriod.WEEK:
        return dueDate.diff(date, `week`) === 0;
      case TimePeriod.MONTH:
        return dueDate.diff(date, `months`) === 0;
      case TimePeriod.YEAR:
        return dueDate.diff(date, `years`) === 0;
      default:
        return false;
    }
  });
};

export const getTotalTime = (movies: Movie[]): number => {
  let totalTime = 0;
  movies.forEach((movie) => {
    totalTime += movie.filmInfo.runtime;
  });
  return totalTime;
};

export const getAllGenres = (movies: Movie[]): string[] => {
  const genres: string[] = [];
  movies.forEach((movie) => {
    genres.push(...movie.filmInfo.genre);
  });
  return genres;
};
