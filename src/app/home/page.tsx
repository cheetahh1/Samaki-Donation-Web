import { Button } from "@/components/ui/button"
import { Heart, Stethoscope, GraduationCap, Activity } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


// ----------------- Hero -----------------
function Hero() {
  return (
    <section className="relative px-6 py-20 bg-gradient-to-br from-purple-100 to-pink-100">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="relative text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">
          Together, we make change happen
        </h1>
        <p className="text-lg text-purple-600 mb-8">
          Support Samaki's campaigns through fundraising, recruiting, giving.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donation_cat">
          <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3">
            Donate
          </Button>
          </Link>
          <Link href="/fundraising">
          <Button
            variant="outline"
            className="border border-purple-500 text-purple-600 hover:bg-purple-50 px-6 py-3" >
            Start Fundraising
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ----------------- Categories -----------------
function FundraisingCategories() {
  const categories = [
    { icon: <Stethoscope size={40} />, title: "Health", count: 2 },
    { icon: <GraduationCap size={40} />, title: "Education & Learning", count: 2 },
    { icon: <Activity size={40} />, title: "Well-Being", count: 2 },
  ]

  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-10">
          Fundraising Categories
        </h2>
        <Link href="/donation_cat">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {categories.map((cat, i) => (
            <div
              key={2}
              className="flex flex-col items-center bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-2xl py-10 px-6 shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{cat.icon}</div>
              <p className="text-lg font-semibold">{cat.title}</p>
              <p className="text-sm opacity-80">{cat.count} Campaign</p>
            </div>
          ))}
        </div>
        </Link>
        <Link href="/donation_cat">
        <button className="px-6 py-2 border border-purple-500 text-purple-600 text-sm rounded-full hover:bg-purple-50 transition">
          View all
        </button>
        </Link>
      </div>
    </section>
  )
}

// ----------------- About -----------------
function About() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Left column */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            About us
          </p>
          <h2 className="text-4xl font-semibold text-gray-900 mb-6 leading-tight">
            Helping people <br /> Help each other
          </h2>
          <img
            src="/About.jpg"
            alt="Group of people standing in a circle, symbolizing unity and support"
            className="w-full max-w-lg h-auto rounded-lg"
          />
          <p className="text-sm italic text-gray-500 mt-4">
            *Statistics shown are based on 2023 - 2024 GoFundMe averages*
          </p>
        </div>

        {/* Right column */}
        <div className="flex items-startflex items-center h-full">
          <div className="space-y-5 text-[17px] text-gray-700 leading-relaxed"> 
            <p>
              Since its launch in 2020, Samaki has been committed to helping people help each other.
            </p>
            <p>
              We’re an organization that believes in humanity. Just like other donation platforms,
              we’re trying to make a difference everywhere — especially in Cambodia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ----------------- Footer -----------------
function Footer() {
  return (
    <footer className="bg-white px-6 py-12 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Donate</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">How it works</a></li>
              <li><a href="#" className="hover:text-gray-900">Give Monthly</a></li>
              <li><a href="#" className="hover:text-gray-900">Supporter Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Fundraise</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">How to start fundraising</a></li>
              <li><a href="#">Fundraising Categories</a></li>
              <li><a href="#">Team Fundraising</a></li>
              <li><a href="#">Fundraising Blog</a></li>
              <li><a href="#">Charity Fundraising</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">Our mission</a></li>
              <li><a href="#">Success stories</a></li>
              <li><a href="#">Supported charities</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">About Samaki</a></li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">For Nonprofits</a></li>
              <li><a href="#">Donate Button</a></li>
              <li><a href="#">Corporate Partnerships</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © Samaki 2010 - 2024 — samaki.com
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>
              <span className="text-sm text-gray-600">From Team Samaki</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <a href="#">Legal</a>
            <a href="#">Accessibility</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Privacy Choices</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ----------------- Page -----------------
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero />
      <FundraisingCategories />
      <About />
      <Footer />
    </div>
  )
}