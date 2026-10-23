import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mendsourcing.com"),
  title: {
    default: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
    template: "%s | MeND Sourcing Solutions",
  },
  description:
    "Simplifying government contracting. Veteran-owned SDVOSB, AS9100 & ISO9001 certified, pursuing CMMC Level 2. GovPacking, GovScraper, GovTraining, and more.",
  keywords: [
    "government contracting",
    "procurement",
    "supply chain",
    "aerospace",
    "defense",
    "veteran owned",
    "SDVOSB",
    "CMMC",
    "NIST 800-171",
    "GovPacking",
    "GovScraper",
    "GovTraining",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mendsourcing.com",
    siteName: "MeND Sourcing Solutions",
    title: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
    description:
      "Simplifying government contracting. Veteran-owned SDVOSB, AS9100 & ISO9001 certified, pursuing CMMC Level 2.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeND Sourcing Solutions | Government Contracting at Peak Efficiency",
    description:
      "Simplifying government contracting. Veteran-owned SDVOSB, AS9100 & ISO9001 certified, pursuing CMMC Level 2.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon-mend.png",
    apple: "/favicon-mend.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('phc_rH3gWtLpaX8RWXBvYSYGL9gcrKvgiLGazmopRHHLNwkR',{api_host:'https://us.i.posthog.com',person_profiles:'identified_only'});window.mendIdentify=function(em){try{if(em&&window.posthog){posthog.identify(String(em).toLowerCase());posthog.capture('lead_submitted');}}catch(e){}};`,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `try{var q=new URLSearchParams(location.search);var mp=q.get('mph');if(mp&&/^[a-f0-9]{24}$/.test(mp)&&window.posthog){posthog.identify('h:'+mp);}if(!localStorage.getItem('mend_attr')){var a={utm_source:q.get('utm_source')||'',utm_medium:q.get('utm_medium')||'',utm_campaign:q.get('utm_campaign')||'',utm_content:q.get('utm_content')||'',gclid:q.get('gclid')||'',landing_page:location.pathname,referrer:document.referrer||''};if(a.utm_source||a.gclid||a.referrer||a.landing_page){localStorage.setItem('mend_attr',JSON.stringify(a));}}}catch(e){}`,
          }}
        />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
