export interface ChatParams {
  chatid: string;
}


export declare global {
  namespace ReactNavigation {
    interface RootParamlist {
      Chat: ChatParams;
    }
  }
}