export type RoomType="private"|"group"; export type MessageStatus="sending"|"sent"|"delivered"|"seen"; export type MessageType="text"|"image"|"video"|"voice";
export interface Participant{id:string;name:string;online:boolean}
export interface MediaAttachment{id:string;type:"image"|"video"|"voice";mimeType:string;name:string;size:number;dataUrl:string}
export interface Message{id:string;roomId:string;senderId:string;senderName:string;type:MessageType;text?:string;attachment?:MediaAttachment;status:MessageStatus;createdAt:number}
export interface ChatRoom{id:string;type:RoomType;createdAt:number;participants:Participant[]}
export type ConnectionState="connecting"|"connected"|"disconnected"|"reconnecting";