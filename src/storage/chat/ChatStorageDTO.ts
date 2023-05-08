export type ChatStorageDTO = {
  title: string;
  chatid: string;
  createdAt: string;
  data: MessageStorageDTO[];
}

export type MessageStorageDTO = {
  message: string;
  createdAt: string;
}