'use client';
import {useEffect,useRef} from 'react';
export default function CommunityChatStream({children}:{children:React.ReactNode}){
 const el=useRef<HTMLDivElement>(null);const initialized=useRef(false);
 useEffect(()=>{const node=el.current;if(!node)return;
 const nearBottom=node.scrollHeight-node.scrollTop-node.clientHeight<180;
 if(!initialized.current||nearBottom){node.scrollTop=node.scrollHeight}
 initialized.current=true;
 },[children]);
 return <div className="community-chat-stream" ref={el}>{children}</div>;
}
