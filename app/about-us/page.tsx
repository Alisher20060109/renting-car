import FeatureSection from "@/components/AbouFeture"
import Aboutussiper from "@/components/Aboutushome"
import AboutFeatures from "@/components/AboutFeatures"
import StatsSection from "@/components/Aboutstats"
import VideoSwiper from "@/components/Aboutvadoe"
import AppDownloadAndReviews from "@/components/AboutTel"
import CarCTA from "@/components/AboutLoak"
import TopCarRent from "@/components/AboutTOP"
import DownloadAppBanner from "@/components/AboutTELcat"


const AboutUs = () => {
  return (
    <div>
      <Aboutussiper />
      <AboutFeatures />
      <VideoSwiper />
      <StatsSection />
      <FeatureSection />
      <DownloadAppBanner />
      <AppDownloadAndReviews />
      <TopCarRent />
      <CarCTA />
    </div>
  )
}

export default AboutUs

