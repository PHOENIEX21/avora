'use client';
import {useState} from 'react';
import StudyRoomComposer from '@/components/StudyRoomComposer';
export default function StudyReplyAction({roomId,postId}:{roomId:string;postId:string}){
 const [open,setOpen]=useState(false);
 return <div className="community-reply-action"><button type="button" className="community-reply-toggle" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?'Cancel reply':'↩ Reply'}</button>{open&&<StudyRoomComposer roomId={roomId} parentPostId={postId} compact/>}</div>;
}
