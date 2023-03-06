import dayjs from 'dayjs';
import {getRandomArrayElement, getRandomInteger} from './common.js';
import {FILMS_EXTRA_COUNT} from '../consts.js';

function humanizeFilmDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function formatDuration(duration) {
  return `${Math.floor(duration / 60)}h ${duration % 60}m`;
}

function getRandomBool(probability = 0.5) {
  return Math.random() <= probability;
}

function generateFilmData(data) {
  const currentData = [];
  for (let i = 1; i <= getRandomInteger(); i++) {
    currentData.push(getRandomArrayElement(data));
  }
  return currentData;
}

function generateDates() {
  const MAX_GAP = 14;
  const releaseDate = dayjs('1950-01-01')
    .add(getRandomInteger(-MAX_GAP, MAX_GAP), 'year')
    .add(getRandomInteger(-MAX_GAP, MAX_GAP), 'month')
    .add(getRandomInteger(-MAX_GAP, MAX_GAP), 'day');

  const watchingDate = dayjs()
    .add(getRandomInteger(0, -MAX_GAP), 'year')
    .add(getRandomInteger(0, -MAX_GAP), 'month')
    .add(getRandomInteger(0, -MAX_GAP), 'day');

  const commentDate = dayjs()
    .add(getRandomInteger(0, 0), 'year')
    .add(getRandomInteger(0, 0), 'month')
    .add(getRandomInteger(0, -MAX_GAP), 'day');

  return {
    release: releaseDate.toISOString(),
    watching: watchingDate.toISOString(),
    comment: commentDate.toISOString(),
  };
}

const isExtra = true;

const getTopRatedFilms = (films) => Array.from(films.values())
  .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
  .slice(0, FILMS_EXTRA_COUNT);


const getMostCommentedFilms = (films) => Array.from(films.values())
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, FILMS_EXTRA_COUNT);

function getWeightForNullData(dataA, dataB) {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
}

function sortByDate(filmA, filmB) {
  const weight = getWeightForNullData(filmA.filmInfo.release.date, filmB.filmInfo.release.date);
  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
}

function sortByRating(filmA, filmB) {
  const weight = getWeightForNullData(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);
  return weight ?? filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
}

export {
  humanizeFilmDate,
  formatDuration,
  getRandomBool,
  generateFilmData,
  generateDates,
  isExtra,
  getTopRatedFilms,
  getMostCommentedFilms,
  sortByDate,
  sortByRating,
};
