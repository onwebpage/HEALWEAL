import { motion } from "framer-motion";
import { User } from "lucide-react";

export interface LeadershipMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  portfolio?: string;
  companyName?: string;
  companyUrl?: string;
}

export const leadershipTeam: LeadershipMember[] = [
  {
    name: "Harshad Chavandke",
    role: "Founder & Chief Executive Officer (CEO)",
    image: "/team/photo_harshad.jpg",
  },
  {
    name: "Deepak Patil",
    role: "Co-Founder & Chief Operating Officer (COO)",
    image: "/team/photo_deepak.jpg",
  },
  {
    name: "Manjunath K",
    role: "Chief Financial Officer (CFO)",
    image: "/team/photo_manjunath.jpg",
  },
  {
    name: "Nikita Chavandke",
    role: "Chief Investment Officer (CIO)",
    image: "/team/photo_nikita.jpg",
  },
  {
    name: "Komal Chavandke",
    role: "Chief People Officer (CPO)",
    image: "/team/photo_komal.jpg",
  },
  {
    name: "Rohan Samsuddin",
    role: "Chief Content Officer (CCO)",
    image: "/team/photo_rohan.jpg",
  },
  {
    name: "Navin Chakraborty",
    role: "Head & Chief Technology Officer, Kepwe",
    image: "/team/photo_navin.jpg",
    linkedin: "https://www.linkedin.com/in/navin-chakraborty-2239293b1",
    portfolio: "https://navinchakraborty.onrender.com",
    companyName: "Kepwe",
    companyUrl: "https://kepwe.in/",
  },
  {
    name: "Gurpreet Singh Ramgarhia",
    role: "Head & Chief Technology Officer, Thinkatic",
    image: "/team/photo_gurpreet.jpg",
  },
  {
    name: "Hamd Ilahi",
    role: "Chief Technology Officer (CTO)",
    image: "/team/photo_hamd.jpg",
  },
];

export const advisoryBoard: LeadershipMember[] = [
  {
    name: "Nandkumar Chavandke",
    role: "Advisory Board Member",
    image: "/team/photo_nandkumar.jpg",
  },
];

interface LeadershipSectionProps {
  showAdvisory?: boolean;
  className?: string;
}

export const LeadershipSection = ({
  showAdvisory = true,
  className = "",
}: LeadershipSectionProps) => {
  return (
    <section
      id="leadership"
      className={`w-full py-20 sm:py-24 lg:py-32 bg-white border-b border-black/[0.06] overflow-hidden ${className}`}
      data-testid="section-leadership"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
            Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 leading-tight">
            Guided by Visionaries. Driven by Discipline.
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
            Our leadership unites deep sector knowledge with engineering rigor and operational expertise.
          </p>
        </div>

        {/* Advisory Board */}
        {showAdvisory && (
          <div className="mb-12 sm:mb-14">
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-4 sm:mb-6 block">
              Advisory Board
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 max-w-[1060px]">
              {advisoryBoard.map((advisor) => (
                <div
                  key={advisor.name}
                  className="bg-white rounded-2xl border border-black/[0.08] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col w-full max-w-[245px] mx-auto sm:mx-0 h-[350px]"
                >
                  <div className="w-full h-[240px] bg-[#F4F4F5] overflow-hidden flex items-center justify-center relative flex-shrink-0">
                    {advisor.image ? (
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <User className="w-12 h-12 text-[#A1A1AA]" />
                    )}
                  </div>
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-[15px] sm:text-base text-black tracking-tight leading-snug line-clamp-1">
                        {advisor.name}
                      </h4>
                      {advisor.role ? (
                        <p className="text-xs text-[#71717A] mt-1 leading-snug line-clamp-2">
                          {advisor.role}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leadership Grid */}
        <div className={showAdvisory ? "pt-12 sm:pt-14 border-t border-black/[0.08]" : ""}>
          {showAdvisory && (
            <span className="text-xs font-bold text-black tracking-widest uppercase mb-4 sm:mb-6 block">
              Leadership Team
            </span>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 max-w-[1060px]">
            {leadershipTeam.map((member, i) => {
              const handleCardClick = () => {
                if (member.linkedin) {
                  window.open(member.linkedin, "_blank", "noopener,noreferrer");
                }
              };

              const renderRole = () => {
                if (!member.role) return <div className="h-4 mt-1" aria-hidden="true" />;
                if (member.companyName && member.companyUrl && member.role.includes(member.companyName)) {
                  const parts = member.role.split(member.companyName);
                  return (
                    <p className="text-xs text-[#71717A] mt-1 leading-snug line-clamp-2">
                      <span itemProp="jobTitle">{parts[0]}</span>
                      <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization" className="inline">
                        <a
                          href={member.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="text-[#71717A] hover:text-black hover:underline cursor-pointer transition-colors duration-150 inline font-medium"
                          title={`Visit ${member.companyName} (${member.companyUrl})`}
                          itemProp="url"
                        >
                          <span itemProp="name">{member.companyName}</span>
                        </a>
                      </span>
                      {parts.slice(1).join(member.companyName)}
                    </p>
                  );
                }
                return (
                  <p className="text-xs text-[#71717A] mt-1 leading-snug line-clamp-2" itemProp="jobTitle">
                    {member.role}
                  </p>
                );
              };

              const cardBody = (
                <div
                  itemScope
                  itemType="https://schema.org/Person"
                  onClick={handleCardClick}
                  className={`bg-white rounded-2xl border border-black/[0.08] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col w-full h-[350px] ${
                    member.linkedin ? "cursor-pointer" : ""
                  }`}
                  title={member.linkedin ? `Open ${member.name}'s LinkedIn profile` : undefined}
                >
                  {member.linkedin && <link itemProp="sameAs" href={member.linkedin} />}
                  <div className="w-full h-[240px] bg-[#F4F4F5] overflow-hidden flex items-center justify-center relative flex-shrink-0">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        itemProp="image"
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : (
                      <User className="w-12 h-12 text-[#A1A1AA]" />
                    )}
                  </div>
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-[15px] sm:text-base text-black tracking-tight leading-snug line-clamp-1">
                        {member.portfolio ? (
                          <a
                            href={member.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="text-inherit no-underline hover:text-blue-600 hover:underline cursor-pointer inline-block"
                            itemProp="name"
                            title={`Open ${member.name}'s Portfolio`}
                          >
                            {member.name}
                          </a>
                        ) : member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="text-inherit no-underline hover:text-black cursor-pointer inline-block"
                            itemProp="name"
                            title={`Open ${member.name}'s LinkedIn profile`}
                          >
                            {member.name}
                          </a>
                        ) : (
                          <span itemProp="name">{member.name}</span>
                        )}
                      </h3>
                      {renderRole()}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="w-full max-w-[245px] mx-auto sm:mx-0"
                >
                  {cardBody}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
