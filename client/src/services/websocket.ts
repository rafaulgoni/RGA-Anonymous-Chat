import type {ConnectionState} from "../types/chat";
export class ChatSocket{
 private ws:WebSocket|null=null; private attempts=0; private reconnect=true; private listeners=new Set<(x:any)=>void>(); private states=new Set<(x:ConnectionState)=>void>();
 constructor(private url:string){}
 connect(){if(this.ws?.readyState===WebSocket.OPEN||this.ws?.readyState===WebSocket.CONNECTING)return;this.state(this.attempts?"reconnecting":"connecting");this.ws=new WebSocket(this.url);this.ws.onopen=()=>{this.attempts=0;this.state("connected")};this.ws.onmessage=e=>{try{this.listeners.forEach(f=>f(JSON.parse(e.data)))}catch{}};this.ws.onclose=()=>{this.state("disconnected");if(this.reconnect&&this.attempts<8){this.attempts++;setTimeout(()=>this.connect(),Math.min(12000,1500*this.attempts))}}}
 send(x:object){if(this.ws?.readyState!==WebSocket.OPEN)return false;this.ws.send(JSON.stringify(x));return true}
 close(){this.reconnect=false;this.ws?.close()}
 onMessage(f:(x:any)=>void){this.listeners.add(f);return()=>this.listeners.delete(f)}
 onState(f:(x:ConnectionState)=>void){this.states.add(f);return()=>this.states.delete(f)}
 private state(x:ConnectionState){this.states.forEach(f=>f(x))}
}