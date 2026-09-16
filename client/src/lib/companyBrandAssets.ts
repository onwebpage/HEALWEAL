import hapdaxLogo from "../../../new_assets/Hapdax_new_logo.jpeg";
import hapdaxIcon from "../../../new_assets/Hapdax_web_icon.jpeg";
import hbsLogo from "../../../new_assets/HBS_New_logo.jpeg";
import hbsIcon from "../../../new_assets/Hbs_new_web_icon.jpeg";
import kepweLogo from "../../../new_assets/Kepwe_new_logo.jpeg";
import kepweIcon from "../../../new_assets/Kepwe_new_icon.jpeg";
import thinkaticLogo from "../../../new_assets/thinkatic_new_logo.jpeg";
import thinkaticIcon from "../../../new_assets/Thinkatic_icon_website.jpeg";
import zelevosLogo from "../../../new_assets/zelevos_new_logo.jpeg";
import zelevosIcon from "../../../new_assets/Zelevos_icon_web.jpeg";

export const companyBrandAssets = {
  hapdax: { logo: hapdaxLogo, icon: hapdaxIcon, logoClass: "h-full w-full object-contain scale-[2.4]" },
  kepwe: { logo: kepweLogo, icon: kepweIcon, logoClass: "h-full w-full object-contain scale-[2.4]" },
  zelevos: { logo: zelevosLogo, icon: zelevosIcon, logoClass: "h-full w-full object-contain scale-[2.4]" },
  thinkatic: { logo: thinkaticLogo, icon: thinkaticIcon, logoClass: "h-full w-full object-contain scale-[2.4]" },
  hbs: { logo: hbsLogo, icon: hbsIcon, logoClass: "h-full w-full object-contain scale-[0.85]" },
} as const;
