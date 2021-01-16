export interface CharacterModel {
  id: number;
  name: string;
  thumbnail: string;
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
