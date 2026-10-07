import type {Message} from "../types/chat";
const DB="rga-chat",STORE="media";
export function saveSession(s:object){localStorage.setItem("rga:session",JSON.stringify(s))}
export function getSession<T>():T|null{const x=localStorage.getItem("rga:session");try{return x?JSON.parse(x) as T:null}catch{return null}}
export function saveMessages(room:string,m:Message[]){localStorage.setItem(`rga:messages:${room}`,JSON.stringify(m.slice(-200)))}
export function getMessages(room:string):Message[]{try{return JSON.parse(localStorage.getItem(`rga:messages:${room}`)||"[]") as Message[]}catch{return[]}}
function db():Promise<IDBDatabase>{return new Promise((res,rej)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
export async function clearAllLocalData(){localStorage.clear();await new Promise<void>((res)=>{const r=indexedDB.deleteDatabase(DB);r.onsuccess=r.onerror=r.onblocked=()=>res()})}
