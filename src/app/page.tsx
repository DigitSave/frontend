import FaqData from "@/components/front/FaqData";
import Footer from "@/components/front/Footer";
import Header from "@/components/front/Header";
import { DashedLine, SecurityIcon, WalletIcon } from "@/icon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full min-h-full">
        
        {/* Hero Section */}

        <div className="px-20 flex w-full gap-24 py-12 items-center">
          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-5xl leading-relaxed">Savings that helps you build wealth</h1>

            <p className="text-neutral-2 font-light text-justify py-6">Easily diversify your crypto savings across multiple assets of your choice. Group assets flexibly in a safe and to it overtime, Track the appreciation of your crypto savfes. Start saving today, and access your funds after your specified period for optimal growth.</p>

            <Link href="/dashboard" className="w-52 text-center py-4 px-6 mt-6 mb-14 block rounded-lg bg-primary-0 text-neutral-1 shadow-custom font-bold text-xl">Start Saving</Link>

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

        {/* stats */}

        <div className="py-24 bg-[url('/images/stats-bg.png')] bg-center p-20 w-full font-swiss">
          <div className="w-full flex">
            <div className="w-1/3 text-center">
              <strong className="font-bold text-5xl text-white leading-relaxed">$145B</strong>
              <p className="font-light text-neutral-2 leading-relaxed pb-3">Total Value Locked</p>
            </div>

            <div className="w-1/3 text-center border-x">
              <strong className="font-bold text-5xl text-white leading-relaxed">235</strong>
              <p className="font-light text-neutral-2 leading-relaxed pb-3">Crypto assets Available</p>
            </div>

            <div className="w-1/3 text-center">
              <strong className="font-bold text-5xl text-white leading-relaxed">89</strong>
              <p className="font-light text-neutral-2 leading-relaxed pb-3">Countries supported</p>
            </div>
          </div>
        </div>

        {/* How to */}
        <div className="px-20 flex w-full gap-24 pt-24 items-center">
          <div className="w-1/2 font-swiss">
            <h2 className="font-bold text-neutral-2 text-3xl leading-relaxed">Its only takes 5 minutes...</h2>

            <div className="flex flex-col w-full text-neutral-3 my-14">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <WalletIcon />
                  <DashedLine />
                </div> 
                <div>
                    <h2 className="font-bold text-xl leading-loose mb-6">Connect & Fund Your wallet</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <WalletIcon />
                  <DashedLine />
                </div> 
                <div>
                    <h2 className="font-bold text-xl leading-loose mb-6">Connect & Fund Your wallet</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <WalletIcon />
                  <DashedLine />
                </div> 
                <div>
                    <h2 className="font-bold text-xl leading-loose mb-6">Connect & Fund Your wallet</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard.</p>
                </div>
              </div>
            </div>

            <Link href="/dashboard" className="w-40 py-4 px-8 text-center rounded-lg bg-primary-0 text-neutral-3"> Launch app</Link>

          </div>

          <div className="w-1/2">
            <Image
              className=""
              width={542}
              height={482}
              src="/images/howto-image.png" 
              alt="Howto Image"
            />
          </div>
        </div>

        {/* About */}

        <div className="w-full font-swiss text-neutral-3 pt-24 px-20">
          <div className="text-center w-[70%] mx-auto">
            <h2 className="font-bold text-3xl leading-relaxed">Stay the course, reap the reward</h2>
            <p className="leading-relaxed pt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 pt-20">

            <div className="p-14 leading-relaxed bg-tertiary-6 border rounded-3xl">
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">Blockchain Security</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the.</p>
            </div>


            <div className="p-14 leading-relaxed bg-tertiary-6 border rounded-3xl">
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">Blockchain Security</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the.</p>
            </div>


            <div className="p-14 leading-relaxed bg-tertiary-6 border rounded-3xl">
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">Blockchain Security</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the.</p>
            </div>


            <div className="p-14 leading-relaxed bg-tertiary-6 border rounded-3xl">
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">Blockchain Security</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the.</p>
            </div>
          </div>
        </div>

        {/* More */}
        <div className="px-20 flex w-full gap-24 pt-24 items-center">
          
          <div className="w-1/2">
            <Image
              className=""
              width={542}
              height={482}
              src="/images/hero-image.png" 
              alt="Hero Image"
            />
          </div>
          
          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-3xl leading-relaxed">Savings for building wealth</h1>

            <p className="text-neutral-2 font-light text-justify py-6 mb-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the.</p>

            <Link href="/dashboard" className="w-40 py-4 mt-6 px-8 text-center rounded-lg bg-primary-0 text-neutral-3">Begin your savings Journey</Link>

          </div>

        </div>

        {/* Assets */}
        <div className="px-20 flex w-full gap-24 pt-24 items-center">
          
          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-3xl leading-relaxed">Create a save for diversified crypto assets</h1>

            <p className="text-neutral-2 font-light text-justify py-6 mb-12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the.</p>

            <Link href="/dashboard" className="w-40 py-4 mt-6 px-8 text-center rounded-lg bg-primary-0 text-neutral-3">Create Savings</Link>
          
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

        {/* FAQ */}
        <div className="w-[70%] mx-auto pt-24 text-neutral-2 ">
          <h2 className="font-bold text-4xl text-center leading-loose py-4">We answered all your money questions</h2>
          <FaqData />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
