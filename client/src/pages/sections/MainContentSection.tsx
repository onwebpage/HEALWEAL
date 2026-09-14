import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const brandLogos = [
  {
    src: "/figmaAssets/8cad6752-a892-44c2-95d3-45f9c155cf7c-1.png",
    alt: "Brand 1",
  },
  {
    src: "/figmaAssets/de5f8bb3-d05d-4fc2-a1de-ae0222c0be80-1.png",
    alt: "Brand 2",
  },
  {
    src: "/figmaAssets/b2d0b365-23eb-49d8-9b70-ed1aa4c5a7d0-1.png",
    alt: "Brand 3",
  },
  {
    src: "/figmaAssets/f6d920e5-6f2e-400d-a641-1ba5b3a72c51-1.png",
    alt: "Brand 4",
  },
  {
    src: "/figmaAssets/44d5de91-693a-4872-ac17-3ad5ce74ffcb-1.png",
    alt: "Brand 5",
  },
];

const timelineTop = [
  {
    logo: "/figmaAssets/de5f8bb3-d05d-4fc2-a1de-ae0222c0be80-1-1.png",
    date: "August 2021",
    width: "w-[249px]",
  },
  {
    logo: "/figmaAssets/b2d0b365-23eb-49d8-9b70-ed1aa4c5a7d0-1-1.png",
    date: "August 2023",
    width: "w-[243.16px]",
  },
  {
    logo: "/figmaAssets/8cad6752-a892-44c2-95d3-45f9c155cf7c-1-1.png",
    date: "August 2025",
    width: "w-[238.15px]",
  },
];

const timelineBottom = [
  {
    logo: "/figmaAssets/44d5de91-693a-4872-ac17-3ad5ce74ffcb-1-1.png",
    date: "August 2022",
    width: "w-[243.16px]",
  },
  {
    logo: "/figmaAssets/f6d920e5-6f2e-400d-a641-1ba5b3a72c51-1-1.png",
    date: "August 2024",
    width: "w-[243.16px]",
  },
];

const values = [
  "Integrity",
  "Honesty",
  "Transparency",
  "Respect",
  "Responsibility",
  "Courage",
];

const leadershipTeam = [
  {
    name: "Mr. Harshad Chavandke",
    role: "Founder & CEO",
    description:
      "Driving the vision to build a healthier, wealthier, and smarter world.",
    image:
      "/figmaAssets/cute-smiling-young-man-with-bristle-looking-satisfied-1.png",
  },
  {
    name: "Mr. Tarun Ahir",
    role: "COO",
    description: "Ensuring seamless operations and organizational growth",
    image: "/figmaAssets/portrait-white-man-isolated-4.png",
  },
  {
    name: "Mr. Shlok Ranjan",
    role: "CTO",
    description: "Leading innovation and technology strategy.",
    image:
      "/figmaAssets/cute-smiling-young-man-with-bristle-looking-satisfied-1-1.png",
  },
  {
    name: "Ms. Nikita Chavandke",
    role: "CIO",
    description: "Shaping investment strategies for long-term value",
    image: "/figmaAssets/expressive-pretty-woman-posing-2.png",
  },
  {
    name: "Ms. Bhavna Mandani",
    role: "CFO",
    description: "Managing financial health and sustainable growth.",
    image:
      "/figmaAssets/lovely-satisfied-freckled-female-with-crisp-hair-has-gentle-smil.png",
  },
  {
    name: "Mr. Nandkumar Chavandke",
    role: "CLO",
    description: "Overseeing governance, compliance, and legal frameworks.",
    image: "/figmaAssets/handsome-young-man-with-new-stylish-haircut-2.png",
  },
  {
    name: "Lorem IPsum",
    role: "CPO",
    description: "Building a strong culture and empowering people.",
    image:
      "/figmaAssets/cute-smiling-young-man-with-bristle-looking-satisfied-1-2.png",
  },
  {
    name: "Ms. Komal Langote",
    role: "CAO",
    description: "Providing strategic insights and advisory leadership.",
    image:
      "/figmaAssets/cute-smiling-young-man-with-bristle-looking-satisfied-1-3.png",
  },
];

const brandCards = [
  {
    logo: "/figmaAssets/de5f8bb3-d05d-4fc2-a1de-ae0222c0be80-1-2.png",
    description:
      "All-in-one Healthtech company - To create a world of healthy individuals.",
  },
  {
    logo: "/figmaAssets/44d5de91-693a-4872-ac17-3ad5ce74ffcb-1-2.png",
    description:
      "All-in-one Wealthtech company - To create a world of wealthy individuals.",
  },
  {
    logo: "/figmaAssets/b2d0b365-23eb-49d8-9b70-ed1aa4c5a7d0-1-2.png",
    description:
      "All-in-one Startup company - To create a world of exceptional founders.",
  },
  {
    logo: "/figmaAssets/f6d920e5-6f2e-400d-a641-1ba5b3a72c51-1-2.png",
    description:
      "All-in-one Intelliscious company - To create a world of Intelliscious individuals.",
  },
  {
    logo: "/figmaAssets/8cad6752-a892-44c2-95d3-45f9c155cf7c-1-2.png",
    description: "All-in-one Talks series -\nConnecting people.",
  },
];

const whyChooseFeatures = [
  {
    icon: "/figmaAssets/fi-9968832.svg",
    title: "Growth Opportunities",
    active: true,
  },
  {
    icon: "/figmaAssets/fi-1342014.svg",
    title: "Innovative \nCulture",
    active: false,
  },
  {
    icon: "/figmaAssets/fi-10445511.svg",
    title: "Inclusive Workplace",
    active: false,
  },
  {
    icon: "/figmaAssets/fi-7837411.svg",
    title: "Purpose-Driven Work",
    active: false,
  },
];

const lifeImages = [
  "/figmaAssets/rectangle-1-2.svg",
  "/figmaAssets/rectangle-2.svg",
  "/figmaAssets/rectangle-3.svg",
];

const jobCategories = [
  {
    title: "Product Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    jobs: ["Product Manager", "UIUX Designer", "Date Analyst."],
    bgColor: "bg-[#f4f4f4]",
    textColor: "text-[#333333]",
  },
  {
    title: "Engineering",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    jobs: [
      "Senior Full - Stack Developer.",
      "DevOps Engineer.",
      "Mobile App Developer.",
    ],
    bgColor: "bg-[#1b48d4]",
    textColor: "text-white",
  },
  {
    title: "Business & Sales",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    jobs: [
      "Sales Director",
      "Marketing Manager.",
      "Business Development Associate.",
    ],
    bgColor: "bg-[#f4f4f4]",
    textColor: "text-[#333333]",
  },
];

const internshipPrograms = [
  {
    title: "Graduate Development Program",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    features: [
      "12 weeks free internship.",
      "1:1 mentorship with senior staff.",
      "Real project ownership.",
    ],
    bgColor: "bg-[#f4f4f4]",
    textColor: "text-[#333333]",
  },
  {
    title: "Summer Internship program",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    features: [
      "12 weeks free internship.",
      "1:1 mentorship with senior staff.",
      "Real project ownership.",
    ],
    bgColor: "bg-[#1b48d4]",
    textColor: "text-white",
  },
  {
    title: "Skill Development Program",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
    features: [
      "12 weeks free internship.",
      "1:1 mentorship with senior staff.",
      "Real project ownership.",
    ],
    bgColor: "bg-[#f4f4f4]",
    textColor: "text-[#333333]",
  },
];

const blogPosts = [
  {
    image: "/figmaAssets/image.png",
    author: "Natali Craig",
    date: "14 Jan 2022",
    title: "How collaboration makes us better designers",
    description:
      "Collaboration can make our teams stronger, and our individual designs better.",
    tags: [
      { label: "Design", color: "text-[#1b48d4]" },
      { label: "Research", color: "text-indigo-700" },
    ],
  },
  {
    image: "/figmaAssets/image-2.png",
    author: "Drew Cano",
    date: "13 Jan 2022",
    title: "Our top 10 Javascript frameworks to use",
    description:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
    tags: [
      { label: "Software Development", color: "text-success-700" },
      { label: "Tools", color: "text-pink-700" },
      { label: "SaaS", color: "text-ros-700" },
    ],
  },
  {
    image: "/figmaAssets/image-3.png",
    author: "Orlando Diggs",
    date: "12 Jan 2022",
    title: "Podcast: Creating a better CX Community",
    description:
      "Starting a community doesn't need to be complicated, but how do you get started?",
    tags: [
      { label: "Podcasts", color: "text-app-primary" },
      { label: "Customer Success", color: "text-blue-gray700" },
    ],
  },
];

const footerQuickLinks = [
  { label: "About", path: "/about" },
  { label: "Brands", path: "/brands" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];
const footerLegalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Use", path: "/terms-of-use" },
  { label: "Disclaimer", path: "/disclaimer" },
];

export const MainContentSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-12 lg:gap-20 w-full">
      <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 items-center gap-8 lg:gap-[45px] pt-8 lg:pt-12">
        <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center tracking-[0] leading-tight lg:leading-[43.2px]">
          Our Brands
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6 w-full">
          {brandLogos.map((brand, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                className="w-full h-auto max-h-20 lg:max-h-[108.89px] object-contain"
                alt={brand.alt}
                src={brand.src}
              />
            </div>
          ))}
        </div>

        <Button className="h-12 lg:h-[52px] bg-[#1b48d4] gap-2 lg:gap-2.5 px-4 sm:px-6 py-2.5 rounded-[10px] hover:bg-[#1b48d4]/90">
          <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-white text-base sm:text-lg lg:text-xl tracking-[0] leading-tight lg:leading-[24.0px]">
            Explore More
          </span>
          <img
            className="w-6 lg:w-[37.33px] h-auto"
            alt="Arrow"
            src="/figmaAssets/arrow-1.svg"
          />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-12 lg:gap-[84px] px-4 sm:px-6 lg:px-8 py-8 lg:py-[45px] w-full bg-[#0529990f]">
        <div className="flex flex-col items-start gap-6 lg:gap-9 w-full max-w-7xl">
          <div className="flex flex-col items-start gap-4 lg:gap-[18px] w-full">
            <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center leading-tight lg:leading-[43.2px] w-full tracking-[0]">
              About Healweal
            </h2>

            <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] text-center tracking-[0] leading-relaxed lg:leading-[29.5px] w-full">
              Healweal Corp is India&apos;s fastest growing tech conglomerate,
              bringing together a diverse portfolio of companies that operate
              across health, wealth, startups, intelligence, and communication.
              Founded with a vision to transform lives and industries, Healweal
              is committed to innovation, impact, and integrity.
            </p>
          </div>

          <div className="grid gap-4 lg:gap-4 w-full lg:grid-cols-[1.2fr_1fr_1fr]">
            <img
              className="w-full h-auto lg:h-full object-cover rounded-lg"
              alt="Rectangle"
              src="/figmaAssets/rectangle-1-1.svg"
            />

            <div className="flex flex-col items-start justify-center gap-4">
              <Card className="w-full rounded-[18px] overflow-hidden bg-[linear-gradient(292deg,rgba(27,72,212,1)_0%,rgba(14,37,110,1)_100%)] border-0">
                <CardContent className="p-4 lg:p-[22px]">
                  <div className="flex flex-col items-start gap-2 lg:gap-[11px]">
                    <h3 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-white text-lg lg:text-[22px] leading-tight lg:leading-[26.4px] tracking-[0]">
                      Our Vision
                    </h3>
                    <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-white text-base lg:text-lg tracking-[0] leading-relaxed lg:leading-[24.1px]">
                      To build a $10 billion diversified tech conglomerate by
                      2050 that shapes the future of industries, empowers
                      entrepreneurs, and drives sustainable innovation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-white rounded-[18px] overflow-hidden border-0">
                <CardContent className="p-4 lg:p-[22px]">
                  <div className="flex flex-col items-start gap-2 lg:gap-[11px]">
                    <h3 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-lg lg:text-[22px] tracking-[0] leading-tight lg:leading-[26.4px]">
                      Our Mission
                    </h3>
                    <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base lg:text-lg leading-relaxed lg:leading-[24.1px] tracking-[0]">
                      To create a world-class ecosystem of products, solutions,
                      businesses, and investments that improve lives, empower
                      individuals, and strengthen industries
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="h-auto lg:h-[370px] bg-white rounded-[18px] overflow-hidden border-0">
              <CardContent className="p-4 lg:p-[22px] h-full">
                <div className="flex flex-col items-start gap-3 lg:gap-[17px] h-full">
                  <h3 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-lg lg:text-[22px] tracking-[0] leading-tight lg:leading-[26.4px]">
                    Our Values
                  </h3>
                  <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base lg:text-lg leading-relaxed lg:leading-[24.1px] tracking-[0]">
                    More than words, these values represent the foundation of
                    our commitment to people and purpose.
                  </p>
                  <div className="flex flex-col items-start gap-2 lg:gap-[11px]">
                    {values.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <img
                          className="w-4 lg:w-[18px] h-4 lg:h-[18px]"
                          alt="Check icon"
                          src="/figmaAssets/fi-18292400.svg"
                        />
                        <span className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-sm lg:text-lg tracking-[0] leading-tight lg:leading-[24.1px]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center gap-6 w-full max-w-7xl">
          <div className="flex w-full items-center justify-between">
            {timelineTop.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <img
                  className="w-full max-w-[249px] h-auto max-h-[108.89px] object-contain"
                  alt="Brand logo"
                  src={item.logo}
                />
                <Badge className="bg-[#1b48d4] rounded-[36px] px-2.5 py-2 h-auto hover:bg-[#1b48d4]">
                  <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[16.8px]">
                    {item.date}
                  </span>
                </Badge>
              </div>
            ))}
          </div>

          <div className="relative w-full h-[14.31px]">
            <div className="absolute top-1 left-0 w-full h-1.5 bg-[#1b48d4] rounded-[21px]" />
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-3.5 h-3.5 bg-[#1b48d4] rounded-[7.15px] absolute top-0"
                style={{ left: `${(index + 1) * 20}%` }}
              />
            ))}
          </div>

          <div className="flex w-full max-w-3xl items-center justify-between px-4">
            {timelineBottom.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <Badge className="bg-[#1b48d4] rounded-[36px] px-2.5 py-2 h-auto hover:bg-[#1b48d4]">
                  <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-white text-base tracking-[0] leading-[16.8px]">
                    {item.date}
                  </span>
                </Badge>
                <img
                  className="w-full max-w-[243px] h-auto max-h-[108.89px] object-contain"
                  alt="Brand logo"
                  src={item.logo}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:hidden grid grid-cols-2 gap-6 w-full max-w-7xl">
          {[...timelineTop, ...timelineBottom].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                className="w-full h-auto max-h-24 object-contain"
                alt="Brand logo"
                src={item.logo}
              />
              <Badge className="bg-[#1b48d4] rounded-[36px] px-2.5 py-2 h-auto hover:bg-[#1b48d4]">
                <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-white text-sm tracking-[0] leading-tight">
                  {item.date}
                </span>
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-[46px] px-4 sm:px-6 lg:px-8 py-8 lg:py-[45px] w-full">
        <div className="flex flex-col items-start gap-3 w-full max-w-7xl">
          <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center tracking-[0] leading-tight lg:leading-[43.2px] w-full">
            Leadership &amp; Management
          </h2>
          <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] text-center tracking-[0] leading-relaxed lg:leading-[29.5px] w-full">
            Guided by visionaries, driven by expertise.
          </p>
        </div>

        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[27.63px]">
            {leadershipTeam.map((member, index) => (
              <Card
                key={index}
                className="w-full aspect-[3/4] border-0 bg-transparent shadow-none"
              >
                <CardContent className="p-0 relative h-full">
                  <div className="w-full h-full">
                    <img
                      className="w-full h-full rounded-[10.36px] object-cover"
                      alt={member.name}
                      src={member.image}
                    />
                  </div>
                  <div className="flex flex-col w-[calc(100%_-_28px)] items-start justify-center gap-2 lg:gap-[13.82px] px-4 lg:px-[20.72px] py-2 lg:py-[13.82px] absolute left-3.5 bottom-3.5 bg-[#f8f8f8] rounded-[10.36px]">
                    <div className="flex flex-col items-start gap-1 lg:gap-[6.91px] w-full">
                      <div className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#19191b] text-sm lg:text-[15.5px] leading-tight lg:leading-[24.2px] flex items-center justify-center w-full tracking-[0]">
                        {member.name}
                      </div>
                      <div className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#1b48d4] text-xs lg:text-[12.1px] leading-tight lg:leading-[21.6px] flex items-center justify-center w-full tracking-[0]">
                        {member.role}
                      </div>
                    </div>
                    <p className="flex items-center justify-center w-full [font-family:'Gilroy-Regular-Regular',Helvetica] font-normal text-[#787a82] text-xs lg:text-[12.1px] tracking-[0] leading-tight lg:leading-[14.5px]">
                      {member.description}
                    </p>
                    <img
                      className="w-full"
                      alt="Social links"
                      src="/figmaAssets/frame-1000004258.svg"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-[46px] px-4 sm:px-6 lg:px-8 py-8 lg:py-[45px] w-full bg-[#f0f2f9]">
        <div className="flex flex-col items-start gap-3 w-full max-w-7xl">
          <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center tracking-[0] leading-tight lg:leading-[43.2px] w-full">
            Our Brands
          </h2>
          <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] text-center tracking-[0] leading-relaxed lg:leading-[29.5px] w-full">
            A showcase of subsidiaries shaping health, wealth, innovation, and
            knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-0 py-3.5 w-full max-w-7xl">
          {brandCards.map((brand, index) => (
            <Card
              key={index}
              className="h-auto min-h-[200px] lg:h-[249.61px] bg-white rounded-xl border-0"
            >
              <CardContent className="flex flex-col items-center justify-center gap-4 lg:gap-[25px] px-4 lg:px-[18px] py-3 h-full">
                <img
                  className="flex-1 w-full h-20 lg:h-auto object-contain"
                  alt="Brand logo"
                  src={brand.logo}
                />
                <div className="flex flex-col items-start gap-4 lg:gap-6 w-full">
                  <p className="text-center leading-[22.4px] [font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#4b5563] text-base tracking-[0] w-full whitespace-pre-line">
                    {brand.description}
                  </p>
                </div>
                <Button
                  variant="link"
                  className="h-auto p-0 [font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4] text-base tracking-[0] leading-[19.2px]"
                >
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 lg:gap-[46px] px-4 sm:px-6 lg:px-8 py-8 lg:py-[45px] w-full">
        <div className="flex flex-col items-center gap-3 w-full max-w-7xl">
          <h2
            className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center tracking-[0] leading-tight lg:leading-[43.2px]"
          >
            Careers at Healweal
          </h2>
          <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] text-center tracking-[0] leading-relaxed lg:leading-[29.5px] w-full">
            Build your future. MaBuild your future with uBuild your future with
            us and make an impact that goes beyond the workplace—transforming
            health, wealth, and innovation for people everywhere.s and make an
            impact that transforms lives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-[30px] w-full max-w-7xl">
          <img
            className="w-full h-64 lg:h-[430px] object-cover rounded-lg"
            alt="Career image"
            src="/figmaAssets/rectangle-1.svg"
          />

          <div className="flex flex-col w-full items-start gap-6 lg:gap-[31px]">
            <div className="flex flex-col items-start gap-[18px] w-full">
              <div className="flex flex-col items-start gap-2 w-full">
                <h3 className="w-full [font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#272727] text-2xl lg:text-[32px] tracking-[0] leading-tight lg:leading-[33.6px]">
                  Why Choose Us?
                </h3>
              </div>
              <div className="flex items-center gap-2.5 px-1.5 w-full">
                <p className="flex-1 [font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] tracking-[0] leading-relaxed lg:leading-[29.5px]">
                  At Healweal, you don&apos;t just build a career—you make a
                  difference. We&apos;re a dynamic, forward-thinking team
                  passionate about transforming people&apos;s health and wealth
                  with fresh ideas and smart technology. Here, your voice
                  matters, your growth is supported, and your work helps improve
                  lives every single day. If you&apos;re driven by purpose and
                  innovation, Healweal is the place for you.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-0 py-2 lg:py-[9px] w-full bg-white rounded-[14.27px]">
              {whyChooseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-start justify-between px-3 py-4 min-h-[120px] lg:h-36 ${
                    feature.active ? "bg-[#1b48d4]" : "bg-[#f4f4f4]"
                  } rounded-2xl`}
                >
                  <img
                    className="w-8 lg:w-10 h-8 lg:h-10"
                    alt="Feature icon"
                    src={feature.icon}
                  />
                  <span
                    className={`[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-xs lg:text-sm tracking-[0] leading-tight lg:leading-[normal] whitespace-pre-line ${
                      feature.active ? "text-white" : "text-[#333333]"
                    }`}
                  >
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <img
        className="w-full max-w-7xl h-px object-cover mx-auto"
        alt="Divider"
        src="/figmaAssets/vector-5.svg"
      />

      <div className="flex flex-col items-center gap-8 lg:gap-[51px] px-4 sm:px-6 lg:px-8 py-8 lg:py-[45px] w-full">
        <div className="flex flex-col items-center gap-3 w-full max-w-7xl">
          <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center tracking-[0] leading-tight lg:leading-[43.2px]">
            Life At Healweal
          </h2>
          <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] text-center tracking-[0] leading-relaxed lg:leading-[29.5px] w-full">
            See what makes our workplace special through the eyes of our team
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-7xl">
          {lifeImages.map((image, index) => (
            <img
              key={index}
              className="w-full h-48 lg:h-[234px] object-cover rounded-lg"
              alt="Life at Healweal"
              src={image}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-[150px] px-4">
          <img
            className="w-12 h-12"
            alt="Quote left"
            src="/figmaAssets/icon.png"
          />

          <div className="flex flex-col w-full max-w-2xl items-center gap-5">
            <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#686868] text-lg sm:text-xl lg:text-2xl text-center tracking-[0] leading-relaxed lg:leading-[31.2px] w-full">
              &quot;I imagine we can change the world, one head, one face or one
              body at a time. We think outside the lines of our craft. &quot;
            </p>
            <div className="relative w-[174px] h-12">
              <div className="absolute top-1 left-16 [font-family:'Inter',Helvetica] font-bold text-[#686868] text-[13px] tracking-[0.91px] leading-[normal]">
                Geri Cusenza
              </div>
              <div className="absolute top-[27px] left-16 [font-family:'Inter',Helvetica] font-normal text-[#818181] text-xs tracking-[0] leading-[normal]">
                Founder Sabastian
              </div>
              <img
                className="left-0 w-12 h-12 object-cover absolute top-0"
                alt="Profile"
                src="/figmaAssets/ellipse-62.png"
              />
            </div>
          </div>

          <img
            className="w-12 h-12"
            alt="Quote right"
            src="/figmaAssets/icon-1.png"
          />
        </div>
      </div>

      <img
        className="w-full max-w-7xl h-px object-cover mx-auto"
        alt="Divider"
        src="/figmaAssets/vector-5.svg"
      />

      <div className="flex flex-col items-center gap-8 lg:gap-[46px] px-4 sm:px-6 lg:px-8 py-8 lg:py-[45px] w-full">
        <div className="flex flex-col items-center gap-3 w-full max-w-7xl">
          <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-2xl sm:text-3xl lg:text-4xl text-center tracking-[0] leading-tight lg:leading-[43.2px]">
            Job Openings
          </h2>
          <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-base sm:text-lg lg:text-[22px] text-center tracking-[0] leading-relaxed lg:leading-[29.5px] w-full">
            Find your perfect roles across our different brand &amp; departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-7xl">
          {jobCategories.map((category, index) => (
            <Card
              key={index}
              className={`flex flex-col items-start gap-6 lg:gap-[30.17px] p-5 lg:p-[25.14px] ${category.bgColor} rounded-[20.11px] border-0`}
            >
              <CardContent className="p-0 flex flex-col w-full items-start gap-4 lg:gap-[16.34px]">
                <h3
                  className={`font-bold text-3xl [font-family:'Gantari',Helvetica] ${category.textColor} tracking-[0] leading-[30.2px]`}
                >
                  {category.title}
                </h3>
                <p
                  className={`[font-family:'Gantari',Helvetica] font-medium ${category.textColor} text-xl tracking-[0] leading-[24.0px]`}
                >
                  {category.description}
                </p>
              </CardContent>

              <div className="flex flex-col w-[340.61px] items-start gap-[6.28px]">
                {category.jobs.map((job, jobIndex) => (
                  <div
                    key={jobIndex}
                    className="flex items-center gap-[10.06px] w-full"
                  >
                    <img
                      className="w-[22.62px] h-[22.62px]"
                      alt="Bullet"
                      src="/figmaAssets/fi-16994871.svg"
                    />
                    <span
                      className={`flex-1 [font-family:'Gantari',Helvetica] ${jobIndex === 0 ? "font-normal" : "font-medium"} ${category.textColor} ${jobIndex === 0 ? "text-[20.1px]" : "text-xl"} tracking-[0] leading-[30.2px]`}
                    >
                      {job}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full h-auto ${category.bgColor === "bg-[#1b48d4]" ? "bg-white hover:bg-white/90" : "bg-white hover:bg-white/90"} rounded-[15.08px] px-6 py-3`}
              >
                <span className="[font-family:'Gantari',Helvetica] font-semibold text-[#1b48d4] text-xl text-center tracking-[0] leading-[30.2px]">
                  View All Jobs
                </span>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <img
        className="w-full max-w-7xl h-px object-cover mx-auto"
        alt="Divider"
        src="/figmaAssets/vector-5.svg"
      />

      <div className="flex flex-col items-center gap-[46px] px-20 py-[45px] w-full">
        <div className="flex flex-col items-center gap-3 w-full max-w-[1280px]">
          <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-4xl text-center tracking-[0] leading-[43.2px]">
            Internship &amp; Graduate Programs
          </h2>
          <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#333333] text-[22px] text-center tracking-[0] leading-[29.5px] w-full">
            Start your career journey with us through our structured development
            programs.
          </p>
        </div>

        <div className="flex w-full max-w-[1280px] items-center justify-center gap-5">
          {internshipPrograms.map((program, index) => (
            <Card
              key={index}
              className={`flex flex-col items-start gap-[30.17px] p-[25.14px] ${program.bgColor} rounded-[20.11px] border-0`}
            >
              <CardContent className="p-0 flex flex-col w-[360.72px] items-start gap-[16.34px]">
                <h3
                  className={`[font-family:'Gantari',Helvetica] font-bold ${program.textColor} text-3xl tracking-[0] leading-[30.2px]`}
                >
                  {program.title}
                </h3>
                <p
                  className={`[font-family:'Gantari',Helvetica] font-medium ${program.textColor} text-xl tracking-[0] leading-[24.0px]`}
                >
                  {program.description}
                </p>
              </CardContent>

              <div className="flex flex-col w-[340.61px] items-start gap-[6.28px]">
                {program.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center gap-[10.06px] w-full"
                  >
                    <img
                      className="w-[22.62px] h-[22.62px]"
                      alt="Bullet"
                      src="/figmaAssets/fi-16994871.svg"
                    />
                    <span
                      className={`flex-1 [font-family:'Gantari',Helvetica] ${featureIndex === 0 ? "font-normal" : "font-medium"} ${program.textColor} ${featureIndex === 0 ? "text-[20.1px]" : "text-xl"} tracking-[0] leading-[30.2px]`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-[154px] h-auto ${program.bgColor === "bg-[#1b48d4]" ? "bg-white hover:bg-white/90" : "bg-white hover:bg-white/90 border border-solid border-[#dddddd]"} rounded-[15.08px] px-6 py-3`}
              >
                <span className="[font-family:'Gantari',Helvetica] font-semibold text-[#1b48d4] text-xl text-center tracking-[0] leading-[30.2px]">
                  Apply
                </span>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <img
        className="w-full max-w-7xl h-px object-cover mx-auto"
        alt="Divider"
        src="/figmaAssets/vector-5.svg"
      />

      <div className="flex flex-col items-center gap-[46px] px-20 py-[45px] w-full">
        <div className="flex flex-col items-start gap-[18px] w-full max-w-[1280px]">
          <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#333333] text-4xl text-center tracking-[0] leading-[43.2px] w-full">
            News &amp; Media
          </h2>

          <Tabs defaultValue="press-releases" className="w-full">
            <TabsList className="flex items-center justify-center gap-11 w-full bg-transparent h-auto">
              <TabsTrigger
                value="press-releases"
                className="w-[173.6px] border-b-[1.8px] border-transparent data-[state=active]:border-[#1b48d4] rounded-none bg-transparent pb-0"
              >
                <span className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[22px] text-center tracking-[0] leading-[29.5px] data-[state=active]:text-[#1b48d4] text-[#333333]">
                  Press Releases
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="blogs"
                className="border-b-[1.8px] border-transparent data-[state=active]:border-[#1b48d4] rounded-none bg-transparent pb-0"
              >
                <span className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[22px] text-center tracking-[0] leading-[29.5px] data-[state=active]:text-[#1b48d4] text-[#333333]">
                  Blogs
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="media-coverage"
                className="w-[170px] border-b-[1.8px] border-transparent data-[state=active]:border-[#1b48d4] rounded-none bg-transparent pb-0"
              >
                <span className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[22px] text-center tracking-[0] leading-[29.5px] data-[state=active]:text-[#1b48d4] text-[#333333]">
                  Media Coverage
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="press-releases" className="mt-8">
              <div className="flex items-start justify-center gap-8 w-full">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="flex-1 border-0 shadow-none bg-transparent"
                  >
                    <CardContent className="p-0 flex flex-col items-start gap-8">
                      <div
                        className="w-full h-60 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />

                      <div className="flex flex-col items-start gap-6 w-full">
                        <div className="flex flex-col items-start gap-3 w-full">
                          <p className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4] text-sm tracking-[0] leading-5 w-full">
                            {post.author} • {post.date}
                          </p>

                          <div className="flex items-start gap-4 w-full">
                            <h3 className="flex-1 [font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#111827] text-2xl tracking-[0] leading-[28.8px]">
                              {post.title}
                            </h3>
                            <div className="flex flex-col items-start pt-1">
                              <img
                                className="w-6 h-6"
                                alt="Arrow"
                                src="/figmaAssets/arrow-up-right.svg"
                              />
                            </div>
                          </div>

                          <p className="leading-6 [font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#4b5563] text-base tracking-[0] w-full">
                            {post.description}
                          </p>
                        </div>

                        <div className="flex items-start gap-2 w-full">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              className={`${
                                tag.label === "Design" ||
                                tag.label === "Podcasts"
                                  ? "bg-gray-50"
                                  : tag.label === "Research"
                                    ? "bg-gray-50"
                                    : tag.label === "Software Development"
                                      ? "bg-success-50"
                                      : tag.label === "Tools"
                                        ? "bg-pink-50"
                                        : tag.label === "SaaS"
                                          ? "bg-ros-50"
                                          : "bg-blue-gray50"
                              } rounded-2xl px-2.5 py-0.5 h-auto hover:${
                                tag.label === "Design" ||
                                tag.label === "Podcasts"
                                  ? "bg-gray-50"
                                  : tag.label === "Research"
                                    ? "bg-gray-50"
                                    : tag.label === "Software Development"
                                      ? "bg-success-50"
                                      : tag.label === "Tools"
                                        ? "bg-pink-50"
                                        : tag.label === "SaaS"
                                          ? "bg-ros-50"
                                          : "bg-blue-gray50"
                              }`}
                            >
                              <span
                                className={`font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] ${tag.color} text-[length:var(--text-sm-medium-font-size)] text-center tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]`}
                              >
                                {tag.label}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blogs" className="mt-8">
              <div className="flex items-start justify-center gap-8 w-full">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="flex-1 border-0 shadow-none bg-transparent"
                  >
                    <CardContent className="p-0 flex flex-col items-start gap-8">
                      <div
                        className="w-full h-60 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />

                      <div className="flex flex-col items-start gap-6 w-full">
                        <div className="flex flex-col items-start gap-3 w-full">
                          <p className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4] text-sm tracking-[0] leading-5 w-full">
                            {post.author} • {post.date}
                          </p>

                          <div className="flex items-start gap-4 w-full">
                            <h3 className="flex-1 [font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#111827] text-2xl tracking-[0] leading-[28.8px]">
                              {post.title}
                            </h3>
                            <div className="flex flex-col items-start pt-1">
                              <img
                                className="w-6 h-6"
                                alt="Arrow"
                                src="/figmaAssets/arrow-up-right.svg"
                              />
                            </div>
                          </div>

                          <p className="leading-6 [font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#4b5563] text-base tracking-[0] w-full">
                            {post.description}
                          </p>
                        </div>

                        <div className="flex items-start gap-2 w-full">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              className={`${
                                tag.label === "Design" ||
                                tag.label === "Podcasts"
                                  ? "bg-gray-50"
                                  : tag.label === "Research"
                                    ? "bg-gray-50"
                                    : tag.label === "Software Development"
                                      ? "bg-success-50"
                                      : tag.label === "Tools"
                                        ? "bg-pink-50"
                                        : tag.label === "SaaS"
                                          ? "bg-ros-50"
                                          : "bg-blue-gray50"
                              } rounded-2xl px-2.5 py-0.5 h-auto hover:${
                                tag.label === "Design" ||
                                tag.label === "Podcasts"
                                  ? "bg-gray-50"
                                  : tag.label === "Research"
                                    ? "bg-gray-50"
                                    : tag.label === "Software Development"
                                      ? "bg-success-50"
                                      : tag.label === "Tools"
                                        ? "bg-pink-50"
                                        : tag.label === "SaaS"
                                          ? "bg-ros-50"
                                          : "bg-blue-gray50"
                              }`}
                            >
                              <span
                                className={`font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] ${tag.color} text-[length:var(--text-sm-medium-font-size)] text-center tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]`}
                              >
                                {tag.label}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media-coverage" className="mt-8">
              <div className="flex items-start justify-center gap-8 w-full">
                {blogPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="flex-1 border-0 shadow-none bg-transparent"
                  >
                    <CardContent className="p-0 flex flex-col items-start gap-8">
                      <div
                        className="w-full h-60 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />

                      <div className="flex flex-col items-start gap-6 w-full">
                        <div className="flex flex-col items-start gap-3 w-full">
                          <p className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#1b48d4] text-sm tracking-[0] leading-5 w-full">
                            {post.author} • {post.date}
                          </p>

                          <div className="flex items-start gap-4 w-full">
                            <h3 className="flex-1 [font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-[#111827] text-2xl tracking-[0] leading-[28.8px]">
                              {post.title}
                            </h3>
                            <div className="flex flex-col items-start pt-1">
                              <img
                                className="w-6 h-6"
                                alt="Arrow"
                                src="/figmaAssets/arrow-up-right.svg"
                              />
                            </div>
                          </div>

                          <p className="leading-6 [font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#4b5563] text-base tracking-[0] w-full">
                            {post.description}
                          </p>
                        </div>

                        <div className="flex items-start gap-2 w-full">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              className={`${
                                tag.label === "Design" ||
                                tag.label === "Podcasts"
                                  ? "bg-gray-50"
                                  : tag.label === "Research"
                                    ? "bg-gray-50"
                                    : tag.label === "Software Development"
                                      ? "bg-success-50"
                                      : tag.label === "Tools"
                                        ? "bg-pink-50"
                                        : tag.label === "SaaS"
                                          ? "bg-ros-50"
                                          : "bg-blue-gray50"
                              } rounded-2xl px-2.5 py-0.5 h-auto hover:${
                                tag.label === "Design" ||
                                tag.label === "Podcasts"
                                  ? "bg-gray-50"
                                  : tag.label === "Research"
                                    ? "bg-gray-50"
                                    : tag.label === "Software Development"
                                      ? "bg-success-50"
                                      : tag.label === "Tools"
                                        ? "bg-pink-50"
                                        : tag.label === "SaaS"
                                          ? "bg-ros-50"
                                          : "bg-blue-gray50"
                              }`}
                            >
                              <span
                                className={`font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] ${tag.color} text-[length:var(--text-sm-medium-font-size)] text-center tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]`}
                              >
                                {tag.label}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col items-start gap-8 lg:gap-11 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-8 lg:py-[38px] w-full bg-white max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col w-full items-start gap-6">
              <h2 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-[#111827] text-2xl sm:text-3xl lg:text-4xl tracking-[-0.72px] leading-tight lg:leading-[43.2px]">
                Contact Us
              </h2>
            </div>

            <form className="flex flex-col items-start gap-5 w-full">
              <div className="flex flex-col h-[322px] items-start gap-6 w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-col items-start gap-1.5 w-full">
                    <Label className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-gray-800 text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                      Name
                    </Label>
                    <Input
                      placeholder="Your name"
                      className="w-full bg-base-colorwhite rounded-lg border border-solid border-[#d2d5da] shadow-shadow-xs font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-gray-500 text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text
-md-regular-font-style)]"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-6 w-full">
                  <div className="flex-col items-start flex-1 flex">
                    <div className="flex flex-col items-start gap-1.5 w-full">
                      <Label className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-gray-800 text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                        Phone number
                      </Label>
                      <Input
                        placeholder="Your number"
                        className="w-full bg-base-colorwhite rounded-lg border border-solid border-[#d2d5da] shadow-shadow-xs font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-gray-500 text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]"
                      />
                    </div>
                  </div>

                  <div className="flex-col items-start flex-1 flex">
                    <div className="flex flex-col items-start gap-1.5 w-full">
                      <Label className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-gray-800 text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                        Email
                      </Label>
                      <Input
                        placeholder="you@company.com"
                        className="w-full bg-base-colorwhite rounded-lg border border-solid border-[#d2d5da] shadow-shadow-xs font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-gray-500 text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-[126px] items-start w-full">
                  <div className="flex flex-col h-[126px] items-start gap-1.5 w-full">
                    <Label className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-gray-800 text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                      How can we help?
                    </Label>
                    <Textarea
                      placeholder="Tell us a little about the project..."
                      className="h-[100px] w-full bg-base-colorwhite rounded-lg border border-solid border-[#d2d5da] shadow-shadow-xs font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-gray-500 text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                <Button className="w-[138px] h-[46px] bg-[#1b48d4] px-6 py-2.5 rounded-[10px] hover:bg-[#1b48d4]/90">
                  <span className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[24.0px]">
                    Submit
                  </span>
                </Button>
              </div>
            </form>
          </div>

          <Card className="flex flex-col w-full items-start px-6 lg:px-[39px] py-8 lg:py-[46px] bg-[#1b48d4] rounded-[18px] overflow-hidden border-0">
            <CardContent className="p-0 flex flex-col items-start gap-[19px] w-full">
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="w-[270px] flex flex-col items-start gap-2.5 p-2.5">
                  <h3 className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-primary-1 text-2xl leading-[28.8px] tracking-[0]">
                    Corporate Office
                  </h3>
                </div>

                <div className="w-full flex flex-col items-start gap-2.5 p-2.5">
                  <div className="flex flex-col items-start gap-6 w-full">
                    <div className="flex w-[517px] items-start gap-3">
                      <img
                        className="w-6 h-6"
                        alt="Location"
                        src="/figmaAssets/mdi-location.svg"
                      />
                      <p className="flex flex-col w-[481px] items-start gap-[5px]">
                        <span className="[font-family:'Poppins',Helvetica] font-normal text-primary-1 text-sm tracking-[0] leading-[16.8px] w-full">
                          Office No. 703, Seventh Floor, Samrat Center,
                          Magarpatta, Hadapsar, Pune – 411013
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                <div className="w-[270px] flex flex-col items-start gap-2.5 p-2.5">
                  <h3 className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-primary-1 text-2xl leading-[28.8px] tracking-[0]">
                    Registered Office
                  </h3>
                </div>

                <div className="flex flex-col items-start gap-6 px-2.5 w-full">
                  <div className="flex items-center gap-3 w-full">
                    <img
                      className="w-6 h-6"
                      alt="Location"
                      src="/figmaAssets/mdi-location.svg"
                    />
                    <p className="flex flex-col items-start gap-[5px] w-[497px]">
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-primary-1 text-sm tracking-[0] leading-[16.8px] w-full">
                        403, Fourth Floor, Span Residency, Magarpatta, Hadapsar,
                        Pune – 411013
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 w-full">
                <div className="w-[270px] flex flex-col items-start gap-2.5 p-2.5">
                  <h3 className="[font-family:'Gilroy-SemiBold-SemiBold',Helvetica] font-semibold text-primary-1 text-2xl tracking-[0] leading-[28.8px]">
                    Investor &amp; Media Contact
                  </h3>
                </div>

                <div className="flex flex-col items-start gap-6 px-2.5 w-full">
                  <div className="flex items-center gap-3 w-full">
                    <img
                      className="w-5 h-5"
                      alt="Email"
                      src="/figmaAssets/tabler-mail-filled.svg"
                    />
                    <p className="flex flex-col items-start gap-[5px] w-[497px]">
                      <span className="[font-family:'Poppins',Helvetica] font-normal text-primary-1 text-sm tracking-[0] leading-[16.8px] w-full">
                        contact@healwealcorp.com
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-start gap-7 w-full">
          <img
            className="w-full h-px object-cover"
            alt="Divider"
            src="/figmaAssets/vector-5.svg"
          />

          <footer className="flex flex-col w-full items-center gap-6 px-4 sm:px-6 lg:px-8 py-5 bg-white">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-[137px] w-full max-w-7xl">
              <div className="flex flex-col w-full items-start gap-4 lg:gap-[22px]">
                <div className="flex flex-col items-start gap-[15px]">
                  <div className="flex flex-col items-start gap-[3px]">
                    <img
                      className="w-[138.04px] h-[48.95px]"
                      alt="Logo"
                      src="/figmaAssets/image-1-1.png"
                    />
                  </div>
                  <p className="w-[448px] [font-family:'Gilroy-Medium-Medium',Helvetica] text-[#333333] text-base leading-[20.8px] font-medium tracking-[0]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </p>
                </div>

                <img
                  className="w-[148px] h-7"
                  alt="Social media"
                  src="/figmaAssets/social.png"
                />
              </div>

              <div className="grid grid-cols-2 gap-8 lg:gap-12 w-full">
                <nav className="flex flex-col items-start gap-[22px]">
                  <h4 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-gray-900 text-base tracking-[0] leading-[19.2px]">
                    Quick Links
                  </h4>
                  <ul className="flex flex-col items-start gap-3.5 list-none p-0 m-0">
                    {footerQuickLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.path}
                          className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#272727] text-base tracking-[0] leading-[19.2px] hover:text-[#1b48d4]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav className="flex flex-col items-start gap-[22px]">
                  <h4 className="[font-family:'Gilroy-Bold-Bold',Helvetica] font-bold text-gray-900 text-base tracking-[0] leading-[19.2px]">
                    Legal
                  </h4>
                  <ul className="flex flex-col items-start gap-3.5 list-none p-0 m-0">
                    {footerLegalLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.path}
                          className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#272727] text-base tracking-[0] leading-[19.2px] hover:text-[#1b48d4]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <img
              className="w-full h-px object-cover"
              alt="Line"
              src="/figmaAssets/line-204.svg"
            />

            <div className="flex items-center justify-around gap-2.5 w-full">
              <p className="[font-family:'Gilroy-Medium-Medium',Helvetica] font-medium text-[#272727] text-sm text-center tracking-[0] leading-[22px]">
                © Copyright 2025, All Rights Reserved by Healweal
              </p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
