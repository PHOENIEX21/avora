import Image from 'next/image';
export default function Brand({compact=false}:{compact?:boolean}){
 return <span className="avora-brand"><Image src="/avora-mark.svg" width={compact?27:31} height={compact?31:35} alt="" priority/><span>AVORA</span></span>
}
