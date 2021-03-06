export interface ComicDate {
  date: string;
}

export interface ComicModel {
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  dates: ComicDate[];
}

export interface ComicDataContainerModel {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicModel[];
}

export interface ComicDataWrapperModel {
  data: ComicDataContainerModel;
}
