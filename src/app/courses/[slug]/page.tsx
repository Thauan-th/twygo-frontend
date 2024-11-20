'use client';
import { useParams, usePathname } from "next/navigation";


export default function Page() {
  const { slug } = useParams();

  return (
    <div className=''>
     courses ID
    </div>
  )
}