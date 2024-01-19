import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col gap-4 justify-center items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image
            src="/master.png"
            alt="alguna imagen"
            width={397}
            height={204}
            className="hidden md:block"
          />
      <p className="text-[24px]">Kilometraje</p>
    </div>
  );
}
