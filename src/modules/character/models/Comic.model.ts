export interface ComicModel {
  id: number;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
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
