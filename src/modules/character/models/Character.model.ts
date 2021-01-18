export interface CharacterModel {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  isFavorite?: boolean;
}

export interface CharacterDataContainerModel {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterModel[];
}

export interface CharacterDataWrapperModel {
  data: CharacterDataContainerModel;
}
