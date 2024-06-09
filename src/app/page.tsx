import Header from "@/components/front/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-20 min-h-full">
        
        {/* Hero Section */}

        <div className="flex w-full gap-24 my-10 items-center">
          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-5xl leading-relaxed">Savings that helps you build wealth</h1>

            <p className="text-neutral-2 font-light text-justify my-6">Easily diversify your crypto savings across multiple assets of your choice. Group assets flexibly in a safe and to it overtime, Track the appreciation of your crypto savfes. Start saving today, and access your funds after your specified period for optimal growth.</p>

            <Link href="/dashboard" className="w-52 text-center py-4 px-6 mt-12 block rounded-lg bg-primary-0 text-neutral-1 shadow-custom font-bold text-xl">Start Saving</Link>

          </div>

          <div className="w-1/2">
            <Image
              className=""
              width={542}
              height={482}
              src="/images/hero-image.png" 
              alt="Hero Image"
            />
          </div>
        </div>

        
      </main>
    </>
  );
}
