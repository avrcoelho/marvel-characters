export interface CharacterModel {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  comics: {
    returned: number;
  };
  description: string;
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
