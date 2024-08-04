"use client";

import { BlueCreateWalletButton } from "@/components/front/BlueCreateWalletButton";
import { CustomConnectButton } from "@/components/front/CustomConnectButton";
import FaqData from "@/components/front/FaqData";
import Footer from "@/components/front/Footer";
import Header from "@/components/front/Header";
import { DashedLine, SecurityIcon, WalletIcon } from "@/icon";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <Header />
      <main className="w-full min-h-full">
        {/* Hero Section */}

        <div className="px-20 flex w-full gap-24 mt-12 py-12 items-center">
          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-5xl leading-relaxed">
              Savings that helps you build wealth
            </h1>

            <p className="text-neutral-2 font-light text-justify pt-6">
              Easily diversify your crypto savings across multiple assets of
              your choice. Group assets flexibly in a safe add to it overtime,
              Track the appreciation of your crypto saves. Start saving today,
              and access your funds after your specified period for optimal
              growth.
            </p>

            {/* {!isConnected && <BlueCreateWalletButton label="Start Saving" styles='w-52 text-center py-4 px-6 mt-6 mb-14 block rounded-lg bg-primary-0 text-neutral-1 shadow-custom font-bold text-xl' />} */}

            {/* {isConnected && <Link href='/save' className='w-52 text-center py-4 px-6 mt-6 mb-14 block rounded-lg bg-primary-0 text-neutral-1 shadow-custom font-bold text-xl'>Start Saving</Link>} */}

            <Link
              href="/dashboard"
              className=" text-center py-4 px-10 mt-10 inline-block rounded-lg bg-primary-0 text-neutral-1 bg-custom text-xl font-bold"
            >
              Lunch App
            </Link>
          </div>

          <div className="w-1/2 relative ">
            <Image
              className=""
              width={542}
              height={482}
              src="/images/hero-image.png"
              alt="Hero Image"
            />

            <Image
              className="absolute top-[60%] left-[-20%]"
              width={261}
              height={85}
              src="/images/save-ding.png"
              alt="Hero Image"
            />
          </div>
        </div>

        {/* stats */}

        <div className="py-24 bg-[url('/images/stats-bg.png')] bg-center p-20 w-full font-swiss">
          <div className="w-full flex">
            <div className="w-1/3 text-center">
              <strong className="font-bold text-5xl text-white leading-relaxed">
                $145B
              </strong>
              <p className="font-light text-neutral-2 leading-relaxed pb-3">
                Total Value Locked
              </p>
            </div>

            <div className="w-1/3 text-center border-x">
              <strong className="font-bold text-5xl text-white leading-relaxed">
                235
              </strong>
              <p className="font-light text-neutral-2 leading-relaxed pb-3">
                Crypto assets Available
              </p>
            </div>

            <div className="w-1/3 text-center">
              <strong className="font-bold text-5xl text-white leading-relaxed">
                89
              </strong>
              <p className="font-light text-neutral-2 leading-relaxed pb-3">
                Countries supported
              </p>
            </div>
          </div>
        </div>

        {/* How to */}
        <div id="learn" className="px-20 flex w-full gap-24 pt-24 items-center">
          <div className="w-1/2 font-swiss">
            <h2 className="font-bold text-neutral-2 text-3xl leading-relaxed">
              Its only takes 5 minutes...
            </h2>

            <div className="flex flex-col w-full text-neutral-3 my-14">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <WalletIcon />
                  <DashedLine />
                </div>
                <div>
                  <h2 className="font-bold text-xl leading-loose mb-6">
                    Connect & Fund Your wallet
                  </h2>
                  <p>
                    Create a new wallet or connect a wallet you already own to
                    start saving in your personalised savings account and
                    likewise managing your assets in your save(s).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <WalletIcon />
                  <DashedLine />
                </div>
                <div>
                  <h2 className="font-bold text-xl leading-loose mb-6">
                    Select crypto assests
                  </h2>
                  <p>
                    Whether you are saving for the short term or looking to grow
                    your assets over a longer period, our Safe Lock feature
                    offers flexibility and security.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <WalletIcon />
                  <DashedLine />
                </div>
                <div>
                  <h2 className="font-bold text-xl leading-loose mb-6">
                    Fund Distribution
                  </h2>
                  <p>
                    Add as many assets as you do like and allocate funds to each
                    lock according to your saving goals, funds will be
                    distributed accross selected assets.
                  </p>
                </div>
              </div>
            </div>

            {/* {!isConnected && <BlueCreateWalletButton label="Launch app" styles='w-42 py-4 px-8 text-center rounded-lg bg-primary-0 text-neutral-3' />} */}

            {/* <Link href="/dashboard" className="w-42 py-4 px-8 text-center rounded-lg bg-primary-0 text-neutral-3">
            Launch app
            </Link> */}

            {/* <BlueCreateWalletButton label="Connect Wallet" styles='text-center py-4 px-20 mt-10 inline-block rounded-lg bg-primary-0 text-neutral-1 bg-custom text-xl font-medium' /> */}

            <CustomConnectButton />
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

        <div
          id="about"
          className="w-full font-swiss text-neutral-3 pt-28 px-20"
        >
          <div className="text-center w-[70%] mx-auto">
            <h2 className="font-bold text-3xl leading-relaxed">
              Why choose Digitsave
            </h2>
            <p className="leading-relaxed pt-2">
              In the evolving landscape of financial management, choosing the
              right platform is crucial for maximizing your savings and ensuring
              financial security. Digitsave leverages cutting-edge blockchain
              technology to offer a revolutionary approach to saving and
              investing, addressing the limitations of traditional savings
              platforms. Our commitment to transparency, security, efficiency,
              flexibility, and high returns makes Digitsave the ideal choice for
              anyone looking to optimize their financial strategy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 pt-20">
            <div
              className="p-14 leading-relaxed border rounded-3xl"
              style={{ backgroundColor: "rgba(43, 43, 43, 0.15)" }}
            >
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">
                Unparalleled Transparency
              </h2>
              <p>
                Security is a paramount concern in financial management, and
                Digitsave addresses this with a robust, decentralized system. By
                eliminating central points of failure, we significantly reduce
                the risk of hacks and fraud that plague traditional platforms.
                Our advanced data encryption techniques further protect personal
                and financial information, ensuring that your assets remain
                secure. With Digitsave, you can have peace of mind knowing that
                your savings are protected by state-of-the-art security
                measures.
              </p>
            </div>

            <div
              className="p-14 leading-relaxed border rounded-3xl"
              style={{ backgroundColor: "rgba(43, 43, 43, 0.15)" }}
            >
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">
                Enhanced Security
              </h2>
              <p>
                Security is a paramount concern in financial management, and
                Digitsave addresses this with a robust, decentralized system. By
                eliminating central points of failure, we significantly reduce
                the risk of hacks and fraud that plague traditional platforms.
                Our advanced data encryption techniques further protect personal
                and financial information, ensuring that your assets remain
                secure. With Digitsave, you can have peace of mind knowing that
                your savings are protected by state-of-the-art security
                measures.
              </p>
            </div>

            <div
              className="p-14 leading-relaxed border rounded-3xl"
              style={{ backgroundColor: "rgba(43, 43, 43, 0.15)" }}
            >
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">
                Superior Efficiency
              </h2>
              <p>
                Efficiency is another hallmark of Digitsave. Traditional savings
                methods often involve delayed transactions and high fees due to
                the involvement of multiple intermediaries. Digitsave
                streamlines this process through blockchain technology, enabling
                near-instantaneous transactions with minimal costs. This not
                only makes managing your finances more convenient but also
                ensures that more of your money goes towards growing your
                savings rather than being lost to fees and delays.
              </p>
            </div>

            <div
              className="p-14 leading-relaxed border rounded-3xl"
              style={{ backgroundColor: "rgba(43, 43, 43, 0.15)" }}
            >
              <SecurityIcon />
              <h2 className="font-bold text-2xl leading-relaxed py-8">
                Maximized Returns and Flexibility
              </h2>
              <p>
                Digitsave offers flexibility and higher returns that are hard to
                match. Users can choose from customizable savings plans tailored
                to their specific goals, whether they are saving for short-term
                needs or long-term aspirations like retirement. Our platform
                supports automatic savings with recurring deposits, ensuring
                consistent growth. Moreover, by integrating high-yield
                investments and offering interest on locked assets, Digitsave
                helps users maximize their returns, providing better outcomes
                compared to traditional savings accounts. The integration of
                stablecoins also helps hedge against inflation, ensuring that
                your savings retain their value over time.
              </p>
            </div>
          </div>
        </div>

        {/* More */}
        <div className="px-20 flex w-full gap-24 pt-28 items-center">
          <div className="w-1/2">
            <Image
              className="rounded-l-3xl border shadow-lg"
              width={542}
              height={482}
              src="/images/start-saving.png"
              alt="Hero Image"
            />
          </div>

          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-3xl leading-relaxed">
              Start your saving journey
            </h1>

            <p className="text-neutral-2 font-light text-justify pt-6">
              Embark on your path to financial security and growth with
              Digitsave. Our innovative platform empowers you to manage your
              savings with unparalleled transparency, security, and efficiency.
              Whether you are planning for short-term goals or long-term
              aspirations, Digitsave offers flexible, savings options tailored
              to your needs. Join us today and take the first step towards a
              smarter, more secure financial future
            </p>

            {/* {!isConnected && <BlueCreateWalletButton label="Begin your savings Journey" styles='block w-80 py-4 mt-6 px-8 text-center rounded-lg bg-primary-0 text-neutral-3' />} */}

            <Link
              href="/dashboard"
              className=" text-center py-4 px-6 mt-16 inline-block rounded-lg bg-primary-0 text-neutral-1 bg-custom text-xl font-medium"
            >
              Start your saving journey
            </Link>
          </div>
        </div>

        {/* Assets */}
        <div
          id="assets"
          className="px-20 flex w-full gap-24 pt-28 items-center"
        >
          <div className="w-1/2 font-swiss">
            <h1 className="font-bold text-neutral-2 text-3xl leading-relaxed">
              Create a save for diversified crypto assets
            </h1>

            <p className="text-neutral-2 font-light text-justify pt-6">
              With Digitsave, you can create a save that includes a diverse
              range of crypto assets, optimizing your investment strategy. Our
              platform allows you to easily add multiple cryptocurrencies to a
              single save, providing a balanced approach to managing and growing
              your portfolio. By diversifying your holdings, you can mitigate
              risks and capitalize on the potential growth of various digital
              assets, all within a secure and transparent framework. Start
              diversifying your crypto portfolio with Digitsave today and
              enhance your financial resilience..
            </p>

            {/* {!isConnected && <BlueCreateWalletButton label="Create Savings" styles='w-44 py-4 mt-6 px-4 text-center rounded-lg bg-primary-0 text-neutral-3' />} */}

            <Link
              href="/save"
              className=" text-center py-4 px-6 mt-16 inline-block rounded-lg bg-primary-0 text-neutral-1 bg-custom text-xl font-medium"
            >
              Create savings
            </Link>
          </div>
          <div className="w-1/2">
            <Image
              className="rounded-l-3xl border shadow-lg"
              width={542}
              height={482}
              src="/images/add-assets.png"
              alt="Hero Image"
            />
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="w-[70%] mx-auto pt-24 text-neutral-2 ">
          <h2 className="font-bold text-4xl text-center leading-loose py-4">
            We answered all your money questions
          </h2>
          <FaqData />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
